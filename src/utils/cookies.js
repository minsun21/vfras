
export const setCookie = (value, days = 1) => {
    const expires = new Date();
    expires.setDate(expires.getDate() + days);
    document.cookie = `${"accessToken"}=${value}; path=/; expires=${expires.toUTCString()};`;
  };
  
  export const getCookie = () => {
    const match = document.cookie.match(new RegExp(`(^| )${"accessToken"}=([^;]+)`));
    return match ? match[2] : null;
  };
  
  export const deleteCookie = () => {
    document.cookie = `${"accessToken"}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT;`;
  };