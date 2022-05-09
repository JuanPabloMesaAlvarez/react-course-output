import React, { useCallback, useEffect, useState } from "react";

let logoutTimer;

const AuthContext = React.createContext({
    token: '',
    isLoggedIn: false,
    login: (token, expirationTime) => { },
    logout: () => { }
});

const calculateRemainingTime = (expirationTime) => {
    const currentTime = new Date().getTime();
    const adjExpirationTime = new Date(expirationTime).getTime();

    const remainingTime = adjExpirationTime - currentTime;

    return remainingTime;
};

const retrieveStoreToken = () => {
    const storedToken = localStorage.getItem('token');
    const storedExpirationTime = localStorage.getItem('expirationTime');

    const remainingTime = calculateRemainingTime(storedExpirationTime);
    if (remainingTime <= 3600) {
        localStorage.removeItem('token');
        localStorage.removeItem('expirationTime');
        return null;
    }

    return {
        token: storedToken,
        duration: remainingTime
    }
};

export const AuthContextProvider = (props) => {
    const tokenData = retrieveStoreToken();
    let initialToken
    if (tokenData) {
        initialToken = tokenData.token;    
    }
    
    const [token, setToken] = useState(initialToken);

    const userIsLoggedIn = !!token;

    const logoutHandler = () => {
        setToken(null);
        localStorage.removeItem('token');
        localStorage.removeItem('expirationTime');

        if (logoutTimer) {
            clearTimeout(logoutTimer);
        }
    }

    const LoginHandler = (token, expirationTime) => {
        setToken(token);
        localStorage.setItem('token', token);
        const rewrittenExpirationTime = new Date(new Date().getTime() + (+expirationTime * 1000));
        localStorage.setItem('expirationTime', rewrittenExpirationTime);

        const remainingTime = calculateRemainingTime(rewrittenExpirationTime);
        logoutTimer = setTimeout(logoutHandler, remainingTime);
    };

    useEffect(() => {
        if (tokenData) {
            logoutTimer = setTimeout(logoutHandler, tokenData.duration);
            console.log(tokenData.duration);
        }
    }, [tokenData]);

    const contextValue = {
        token: token,
        isLoggedIn: userIsLoggedIn,
        login: LoginHandler,
        logout: logoutHandler
    }

    return <AuthContext.Provider value={contextValue}>{props.children}</AuthContext.Provider>
}

export default AuthContext;