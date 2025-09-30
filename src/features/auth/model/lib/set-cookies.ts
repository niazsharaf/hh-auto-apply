import type { PageWithCursor } from 'puppeteer-real-browser';

export async function setCookiesOnPage(page: PageWithCursor, cookies: any) {
  for (const cookie of cookies) {
    try {
      await page.setCookie(cookie);
    } catch (err) {
      throw new Error(`Failed to set cookie, ${(cookie.name, err)}`);
    }
  }
}
