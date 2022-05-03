import { Route } from 'react-router-dom';
import LogsPage from '../pages/LogsPage';
import React from 'react';
import ServerSettingsPage from '../pages/ServerSettingsPage';
import SettingsPage from 'pages/SettingsPage';
import UsersPage from '../pages/UsersPage';

const RouterProvider = () => {
  return (
    <>
      <Route path={'/admin/logs'} component={() => <LogsPage />} />
      <Route path={'/admin/users'} component={() => <UsersPage />} />
      <Route path={'/admin/settings'} component={() => <SettingsPage />} />
      <Route
        path={'/admin/server-settings'}
        component={() => <ServerSettingsPage />}
      />
    </>
  );
};

export default RouterProvider;
