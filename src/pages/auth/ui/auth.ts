import type { PageWithCursor } from 'puppeteer-real-browser';
import { authSteps } from '@/features/auth/model/auth-step.ts';

export const initializeAuth = async (page: PageWithCursor) => {
  return authSteps(page);
};
