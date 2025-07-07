export const getTokenFromCookie = () => {
    const name = "accessToken=";
    const decoded = decodeURIComponent(document.cookie);
    const cookies = decoded.split("; ");

    for (let cookie of cookies) {
        if (cookie.startsWith(name)) {
            return cookie.substring(name.length);
        }
    }
    return null;
};