import React, { Suspense } from 'react';
import { ROUTES } from './constants';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Spinner from '../components/commons/Spinner';
import HomePage from '../containers/HomePage';
import LoginPage from '../containers/LoginPage';
import RegisterPage from '../containers/RegisterPage';

// const HomePage = React.lazy(() => import('../containers/HomePage'));
// const LoginPage = React.lazy(() => import('../containers/LoginPage'));
// const RegisterPage = React.lazy(() => import('../containers/RegisterPage'));

const RootRoutes = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<Spinner size='large' />}>
        <Routes>
          <Route path={ROUTES.HOME} element={<HomePage />} />
          <Route path={ROUTES.LOGIN} element={<LoginPage />} />
          <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default RootRoutes;
