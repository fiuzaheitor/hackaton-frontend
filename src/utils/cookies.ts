export const getCookie = (name: string) => {
    const cookieName = encodeURIComponent(name) + '='
    const cookieArray = document.cookie.split(';')
  
    for (let cookie of cookieArray) {
      while (cookie.charAt(0) === ' ') {
        cookie = cookie.substring(1)
      }
      if (cookie.indexOf(cookieName) === 0) {
        return decodeURIComponent(cookie.substring(cookieName.length))
      }
    }
    return null
  }