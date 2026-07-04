import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';

const locales = routing.locales;

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  if (!locale || !locales.includes(locale as any)) {
    locale = 'en';
  }

  return {
    locale,
    timeZone: 'Africa/Addis_Ababa',
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});
