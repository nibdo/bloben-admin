import { Route } from 'react-router-dom';
import React from 'react';
import UsersPage from '../pages/UsersPage';

const RouterProvider = () => {
  return (
    <>
      <Route path={'/admin'} component={() => <UsersPage />} />
      {/*<Route*/}
      {/*  path={`/admin/${APP_PATH.USERS}`}*/}
      {/*  component={() => <UsersPage />}*/}
      {/*/>*/}
    </>
  );
};

export default RouterProvider;
