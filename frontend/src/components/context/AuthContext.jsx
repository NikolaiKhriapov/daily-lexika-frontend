import {createContext, useContext, useEffect, useState} from "react";
import {login as performLogin} from "../../services/authorization.js";
import jwtDecode from "jwt-decode";

const AuthContext = createContext({});

const AuthProvider = ({children}) => {

    const [applicationUser, setApplicationUser] = useState(null);

    const setApplicationUserFromToken = () => {
        let token = localStorage.getItem("access_token");
        if (token) {
            token = jwtDecode(token);
            setApplicationUser({
                username: token.sub,
            })
        }
    }

    useEffect(() => {
        setApplicationUserFromToken();
    }, [])

    const login = async (usernameAndPassword) => {
        return new Promise((resolve, reject) => {
            performLogin(usernameAndPassword).then(response => {
                const jwtToken = response.data.data.authenticationResponse.token;
                localStorage.setItem("access_token", jwtToken);

                const decodedToken = jwtDecode(jwtToken);

                setApplicationUser({
                    username: decodedToken.sub,
                })
                resolve(response);
            }).catch(error => {
                reject(error);
            })
        })
    }

    const logout = () => {
        localStorage.removeItem("access_token");
        setApplicationUser(null);
    }

    const isApplicationUserAuthenticated = () => {
        const token = localStorage.getItem("access_token");
        if (!token) {
            return false;
        }
        const {exp: expiration} = jwtDecode(token);
        if (Date.now() > expiration * 1000) {
            logout();
            return false;
        }
        return true;
    }

    return (
        <AuthContext.Provider value={{
            applicationUser,
            login,
            logout,
            isApplicationUserAuthenticated,
            setApplicationUserFromToken
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);
export default AuthProvider;