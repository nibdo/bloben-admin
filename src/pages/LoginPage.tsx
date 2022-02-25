import { AxiosResponse } from 'axios';
import { Context } from '../context/store';
import { LoginResponse } from 'bloben-interface/user/user';
import { useToast } from '@chakra-ui/react';
import AdminApi from '../api/admin.api';
import LoginView from '../components/LoginView';
import React, { useContext, useEffect, useState } from 'react';

const LoginPage = () => {
  const toast = useToast();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [serverUrl, setServerUrl] = useState('');

  const [, dispatch] = useContext(Context);

  const setContext = (type: string, payload: any) => {
    dispatch({ type, payload });
  };

  const onChange = (e: any) => {
    if (e.target.name === 'username') {
      setUsername(e.target.value);
    }
    if (e.target.name === 'password') {
      setPassword(e.target.value);
    }
    if (e.target.name === 'serverUrl') {
      setServerUrl(e.target.value);
    }
  };

  useEffect(() => {
    const apiUrl = window.localStorage.getItem('apiUrl');
    // @ts-ignore
    if (apiUrl) {
      const indexOf = apiUrl.indexOf('/api');
      // @ts-ignore
      setServerUrl(apiUrl.slice(0, indexOf));
    }
  }, []);

  const handleLogin = async (): Promise<void> => {
    try {
      const apiUrl = `${serverUrl}/api`;

      window.localStorage.setItem('apiUrl', apiUrl);

      // @ts-ignore
      window.env.apiUrl = apiUrl;

      const response: AxiosResponse<LoginResponse> = await AdminApi.login(
        apiUrl,
        {
          username,
          password,
        }
      );

      if (response.data.isLogged && !response.data.isTwoFactorEnabled) {
        // @ts-ignore
        setContext('token', response.data.token);
        setContext('isLogged', true);
      }
    } catch (e: any) {
      if (e.response?.data?.message) {
        toast({
          title: e.response?.data?.message,
          status: 'error',
        });
      }
    }
  };

  return (
    <LoginView
      username={username}
      password={password}
      serverUrl={serverUrl}
      handleLogin={handleLogin}
      onChange={onChange}
    />
  );
};

export default LoginPage;
