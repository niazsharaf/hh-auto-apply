import { readFile } from 'fs/promises';
import { existsSync } from 'fs';
import type { PageWithCursor } from 'puppeteer-real-browser';
import { setCookiesOnPage } from './set-cookies.ts';
import { promiseWrapper } from '@/shared/utils/promise-wrapper.ts';

export const auth = async (page: PageWithCursor) =>
  promiseWrapper(async () => {
    const SERVICE_COOKIE = process.env.SERVICE_COOKIE || '';

    if (!SERVICE_COOKIE || !existsSync(SERVICE_COOKIE)) {
      throw new Error('Cookie file not found');
    }

    const raw = await readFile(SERVICE_COOKIE, 'utf-8');
    const cookies = JSON.parse(raw);

    if (!cookies.length) {
      throw new Error('Cookie file is empty');
    }

    await setCookiesOnPage(page, cookies);

    return 'Успешный вход в аккаунт по cookie';
  });
