import type { PageWithCursor } from 'puppeteer-real-browser';
import { promiseWrapper } from '@/shared/utils/promise-wrapper.ts';

export const upResume = (page: PageWithCursor) =>
  promiseWrapper(async () => {
    const button = await page.$('[data-qa="resume-update-button resume-update-button_actions"]');

    if (!button) {
      throw new Error("Кнопка 'Поднять в поиске' не найдена — возможно прошло меньше 4 часов");
    }

    await button.click();

    return 'Резюме успешно поднято в поиске';
  });
