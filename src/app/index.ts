import './model/env/index.ts';

import { connect } from 'puppeteer-real-browser';
import { initializeApp } from '@/pages/index.ts';
import { delay } from '@/shared/utils/delay.js';
import { REST_TIME } from '@/app/model/utils/constants.js';
import * as process from 'node:process';

export const startApp = async () => {
  const { page } = await connect({
    headless: false, // Если true, то браузер запустится без GUI
    args: ['--start-maximized'],
  });

  page.setDefaultNavigationTimeout(120_000);

  while (true) {
    await initializeApp(page);

    await delay(REST_TIME);
  }
};

startApp();
