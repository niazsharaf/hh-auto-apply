import type { PageWithCursor } from 'puppeteer-real-browser';
import { step } from '@/shared/utils/step.ts';
import { VACANCIES_PAGE } from '@/features/auth/model/constants/constants.js';
import { applyVacancy } from '@/features/auto-apply/lib/apply-vacancy.js';

export const autoApplyStep = async (page: PageWithCursor) => {
  await step('auto-apply', 'Перехожу на Страницу с вакансиями', async () => {
    await page.goto(VACANCIES_PAGE, { waitUntil: 'domcontentloaded' });
  });

  await step('auto-apply', 'Нажимаю на вакансию', async () => {
    await applyVacancy(page);
  });
};
