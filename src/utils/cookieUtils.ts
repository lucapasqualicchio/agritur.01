// Utility functions for cookie management
export interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  preferences: boolean;
}

export const getCookie = (name: string): string | null => {
  if (typeof document === 'undefined') return null;
  
  const nameEQ = name + '=';
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
};

export const setCookie = (name: string, value: string, days: number = 365): void => {
  if (typeof document === 'undefined') return;
  
  const date = new Date();
  date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
  const expires = 'expires=' + date.toUTCString();
  document.cookie = name + '=' + value + ';' + expires + ';path=/;SameSite=Lax';
};

export const deleteCookie = (name: string): void => {
  if (typeof document === 'undefined') return;
  document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
};

export const getCookiePreferences = (): CookiePreferences => {
  const saved = getCookie('cookie_preferences');
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch {
      // Fallback to default if parsing fails
    }
  }
  
  // Default preferences (necessary cookies are always enabled)
  return {
    necessary: true,
    analytics: false,
    marketing: false,
    preferences: false
  };
};

export const saveCookiePreferences = (preferences: CookiePreferences): void => {
  setCookie('cookie_preferences', JSON.stringify(preferences));
  setCookie('cookies_accepted', 'true');
  
  // Apply preferences to actual cookie usage
  applyCookiePreferences(preferences);
};

export const applyCookiePreferences = (preferences: CookiePreferences): void => {
  // Here you would integrate with your analytics/marketing services
  // For example:
  if (preferences.analytics) {
    // Enable Google Analytics, etc.
    console.log('Analytics cookies enabled');
  } else {
    // Disable analytics
    console.log('Analytics cookies disabled');
  }
  
  if (preferences.marketing) {
    // Enable marketing cookies
    console.log('Marketing cookies enabled');
  } else {
    // Disable marketing
    console.log('Marketing cookies disabled');
  }
};

export const hasGivenConsent = (): boolean => {
  return getCookie('cookies_accepted') === 'true';
};