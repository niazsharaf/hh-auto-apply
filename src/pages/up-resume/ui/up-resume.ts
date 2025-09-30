import type { PageWithCursor } from 'puppeteer-real-browser';
import { upResumeStep } from '@/features/up-resume/model/up-resume-step.ts';

export const initializeUpResume = async (page: PageWithCursor) => {
  return upResumeStep(page);
};
