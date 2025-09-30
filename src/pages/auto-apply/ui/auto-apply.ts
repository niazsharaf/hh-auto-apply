import type { PageWithCursor } from 'puppeteer-real-browser';
import { autoApplyStep } from '@/features/auto-apply/model/auto-apply-step.js';

export const initializeAutoApply = async (page: PageWithCursor) => {
  return autoApplyStep(page);
};
