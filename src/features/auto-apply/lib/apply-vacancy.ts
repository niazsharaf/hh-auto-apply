import type { PageWithCursor } from 'puppeteer-real-browser';
import { step } from '@/shared/utils/step.ts';
import { delay } from '@/shared/utils/delay.ts';
import { VACANCIES_PAGE } from '@/features/auth/model/constants/constants.js';
import { join } from 'path';
import { appendFile } from 'fs/promises';
import { filterCompanies } from '@/features/auto-apply/lib/filter-companies.js';

const IGNORE_FILE = join(process.cwd(), './ignored_companies.txt');
const APPLIED_FILE = join(process.cwd(), './applied_vacancies.txt');

export const applyVacancy = async (page: PageWithCursor, limit: number = 30) => {
  const ignored = await filterCompanies(IGNORE_FILE);
  const applied = await filterCompanies(APPLIED_FILE);

  let scrollY = 0;
  let processed = 0;

  const buttonsData: { href: string; companyId: string }[] = await page.evaluate(() =>
    Array.from(document.querySelectorAll('[data-qa="vacancy-serp__vacancy_response"]')).map((btn: any) => {
      const url = (btn as HTMLAnchorElement).href;
      const params = new URLSearchParams(url.split('?')[1]);
      return {
        href: url,
        companyId: params.get('employerId') || 'unknown',
      };
    }),
  );

  const newButtons = buttonsData.filter((b) => !ignored.has(b.companyId) && !applied.has(b.companyId));

  if (!newButtons.length) return console.log('Вакансии закончились, запустите скрипт позже.');
  for (let i = 0; i < buttonsData.length; i++) {
    const { href, companyId } = buttonsData[i];

    if (ignored.has(companyId)) {
      continue;
    }
    if (applied.has(companyId)) {
      continue;
    }

    if (processed >= limit) {
      console.log(`Достигнут лимит - ${limit} откликов. Перерыв`);
      return;
    }
    await step('auto-apply', `Отклик на вакансию ${companyId}`, async () => {
      await page.evaluate((url) => {
        const btn = Array.from(document.querySelectorAll('[data-qa="vacancy-serp__vacancy_response"]')).find(
          (el) => (el as HTMLAnchorElement).href === url,
        ) as HTMLAnchorElement | undefined;

        btn?.click();
      }, href);

      await delay(1000);

      if (page.url().includes('vacancy_response?vacancyId')) {
        await appendFile(IGNORE_FILE, `${companyId} | ${page.url()}\n`);
        await page.goto(VACANCIES_PAGE, { waitUntil: 'domcontentloaded' });
        return;
      }

      const modalButtonSelector = '[data-qa="vacancy-response-submit-popup"]';
      const modalButton = await page.$(modalButtonSelector);
      if (modalButton) {
        await page.evaluate((btn) => ((btn as HTMLButtonElement).disabled = false), modalButton);
        await modalButton.click();
      }

      await appendFile(APPLIED_FILE, `${companyId} | ${href}\n`);
      applied.add(companyId);
      processed++;
    });

    scrollY += 150;
    await page.evaluate((y) => window.scrollBy(0, y), 150);
    await delay(5000);
  }
};
