export const LocalStorageEventTarget = new EventTarget();

export function setAccessTokenToLS(access: string) {
  return localStorage.setItem('access_token', access);
}

export function getAccessTokenFromLS() {
  return localStorage.getItem('access_token') || '';
}

export function removeLocalStorage() {
  // localStorage.removeItem('access_token');
  localStorage.clear(); // -> xóa tất cả localStorage
  const clearEvent = new Event('clearLS');
  LocalStorageEventTarget.dispatchEvent(clearEvent);
}

export function setProfileToLS(profile: object) {
  const profileString = JSON.stringify(profile);
  return profileString ? localStorage.setItem('profile', profileString) : null;
}

export function getProfileFromLS() {
  const profile = localStorage.getItem('profile');
  return profile ? JSON.parse(profile) : null;
}
