import { logStep } from '../../shared/utils/step-log.ts';
import type { StepAction, StepEntity } from '../models/types.ts';

export const step = async (entity: StepEntity, action: StepAction, fn: () => Promise<void>) => {
  try {
    logStep({ entity, action: `start ${action}`, type: 'info' });
    await fn();
  } catch (err: any) {
    logStep({
      entity,
      action: `error ${action} - ${err.message}`,
      type: 'error',
    });
  }
};
