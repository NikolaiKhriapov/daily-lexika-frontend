import {useEffect} from "react";
import {useAuth} from "../components/context/AuthContext.jsx";
import {useNavigate} from "react-router-dom";

const ProtectedRoute = ({children}) => {
    const {isApplicationUserAuthenticated} = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isApplicationUserAuthenticated()) {
            navigate("/login");
        }
    }, [isApplicationUserAuthenticated]);

    return isApplicationUserAuthenticated() ? children : null;
};

export default ProtectedRoute;
