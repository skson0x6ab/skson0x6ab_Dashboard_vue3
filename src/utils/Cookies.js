export const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  return null;
};

export const setCookie = (name, value, hours = 1) => {
  const d = new Date();
  d.setTime(d.getTime() + (hours * 60 * 60 * 1000));  // 기본적으로 1일로 설정
  const expires = "expires=" + d.toUTCString();
  document.cookie = `${name}=${value}; ${expires}; path=/`;
};