import { createContext, useContext, useState, useEffect } from "react";

const LoginContext = createContext();

const LoginProvider = ({children}) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [accessToken, setAccessToken] = useState(null);

    return (
        <LoginContext.Provider 
            value={{isLoggedIn, setIsLoggedIn, isAdmin, setIsAdmin, accessToken, setAccessToken}}>
            {children}
        </LoginContext.Provider>
    );
}
export const useLogin = () => useContext(LoginContext);


export default LoginProvider;