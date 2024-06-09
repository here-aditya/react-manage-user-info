import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { setRedirectUrl } from '../../redux-toolkit/auth-slice';

const PrivateRoute = ({ children }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (!user) {
      dispatch(setRedirectUrl(location.pathname));
    }
  }, [user, location.pathname, dispatch]);

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default PrivateRoute;
