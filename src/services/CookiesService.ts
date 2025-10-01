
import Cookies from "universal-cookie";

const cookies = new Cookies();

class CookiesService {
    // GET
    public getCookie(key: string) {
        return cookies.get(key);
    }
    //Set
    public setCookie(key: string, value: string , options?: {
        path?: string;
        expires?: Date;
      }) {
        return cookies.set(key, value, options );
    }
    // Remove
    public removeCookie(key: string) {
        return cookies.remove(key);
    }
  
}

export default new CookiesService()