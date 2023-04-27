import React, { useContext } from 'react';
import { AuthContext } from '../components/provider/AuthProvider';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({children}) => {
    const {user, loading} = useContext(AuthContext);
    const location = useLocation();
    if(user){
        return children;
    }
    if(loading){
        return <progress className="progress w-56"></progress>
    }

    return <Navigate to='/login' state={{ from: location }}></Navigate>
};

export default PrivateRoute;