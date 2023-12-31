import {useState, useCallback, useEffect} from "react"
let logoutTimer
export default function useAuth() {
    const [userId, setUserId] = useState();
  const [tokenExpirationDate, setTokenExpirationDate] = useState();
  const [token, setToken] = useState();

  const login = useCallback((uid, token, expirationDate) => {
    setUserId(uid);
    setToken(token);
    const tokenExpirationDate =
      expirationDate || new Date(new Date().getTime() + 1000*60*60);
    setTokenExpirationDate(tokenExpirationDate);
    localStorage.setItem(
      "userData",
      JSON.stringify({
        userId: uid,
        token: token,
        expiration: tokenExpirationDate.toISOString(),
      })
    );
  }, []);
  const logout = useCallback(() => {
    setToken(null);
    setTokenExpirationDate(null)
    setUserId(null);
    //Removing user data on logging out thus not relogging it on refresh
    localStorage.removeItem("userData");
  }, []);

  useEffect(() => {
    if (token && tokenExpirationDate) {
      const remainingTime = tokenExpirationDate.getTime() - new Date().getTime()
      logoutTimer = setTimeout(logout, remainingTime);
    }else{
      //Clearing logout Timer whenever user logs out manually.
      clearTimeout(logoutTimer)
    }
  }, [token, tokenExpirationDate, logout]);

  useEffect(() => {
    //Since the below function returns a string to us, we need to convert it to JSON, just as we converted it to string before
    const storedData = JSON.parse(localStorage.getItem("userData"));
    if (
      storedData &&
      storedData.token &&
      new Date(storedData.expiration) > new Date()
    ) {
      login(
        storedData.userId,
        storedData.token,
        new Date(storedData.expiration)
      );
    }
  }, [login]);

  return {login, logout, userId, token}
}