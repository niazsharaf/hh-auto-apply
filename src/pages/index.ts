import { initializeAuth } from './auth/ui/auth.ts';
import type { PageWithCursor } from 'puppeteer-real-browser';
import { initializeUpResume } from './up-resume/ui/up-resume.ts';
import { step } from '@/shared/utils/step.js';
import { initializeAutoApply } from '@/pages/auto-apply/ui/auto-apply.js';

export const initializeApp = async (page: PageWithCursor) => {
  await step('app', 'Инициализирую приложение', async () => {
    return Object.assign({}, await initializeAuth(page), await initializeUpResume(page), await initializeAutoApply(page));
  });
};
