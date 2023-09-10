import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthorizationContext } from '../ContextAPI';


const ProtectedRoute = ({children}:any) => {
    const { LoggedIn } = useContext(AuthorizationContext);
    const location = useLocation();
    console.log("USER" + LoggedIn);
    if (!LoggedIn) {
      return <Navigate to="/Login" state={{ path: location.pathname }} />;
    }
    

    return children;
};

export default ProtectedRoute;
