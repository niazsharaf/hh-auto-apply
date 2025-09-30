import type { PageWithCursor } from 'puppeteer-real-browser';
import { MAIN_PAGE } from './constants/constants.ts';
import { auth } from './lib/auth.ts';
import { step } from '@/shared/utils/step.ts';

export const authSteps = async (page: PageWithCursor) => {
  await step('auth', 'Перехожу на Главную страницу', async () => {
    await page.goto(MAIN_PAGE, { waitUntil: 'domcontentloaded' });
  });

  await step('auth', 'Вхожу по куки', async () => {
    await auth(page);
  });
};
