import type { PageWithCursor } from 'puppeteer-real-browser';
import { RESUME_PAGE } from './constants/constants.ts';
import { upResume } from './lib/up-resume.ts';
import { step } from '@/shared/utils/step.ts';

export const upResumeStep = async (page: PageWithCursor) => {
  await step('up-resume', 'Перехожу на страницу с резюме', async () => {
    await page.goto(RESUME_PAGE);
  });

  await step('up-resume', 'Попытка поднять резюме', async () => {
    await upResume(page);
  });
};
