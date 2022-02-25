import { AxiosResponse } from 'axios';
import { Button } from '@chakra-ui/react';
import { CommonResponse } from 'bloben-interface/interface';
import { Context } from '../context/store';
import AdminApi from '../api/admin.api';
import React, { useContext, useState } from 'react';
import Separator from './Separator';
import SettingsPage from '../pages/SettingsPage';

const Header = () => {
  const [settingsAreOpen, setSettingsAreOpen] = useState(false);
  const [store, dispatch] = useContext(Context);

  const setContext = (type: string, payload: any) => {
    dispatch({ type, payload });
  };

  const handleLogout = async () => {
    const response: AxiosResponse<CommonResponse> = await AdminApi.logout(
      store.token
    );

    if (response.status === 200) {
      setContext('isLogged', false);
    }
  };

  const openSettings = () => {
    setSettingsAreOpen(true);
  };
  const closeSettings = () => {
    setSettingsAreOpen(false);
  };

  return (
    <div
      style={{
        height: 60,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingRight: 48,
        width: '100%',
        borderBottom: 'solid 1px gray',
      }}
    >
      <Button colorScheme="teal" variant="outline" onClick={openSettings}>
        Settings
      </Button>
      <Separator />
      <Button colorScheme="teal" variant="outline" onClick={handleLogout}>
        Logout
      </Button>
      <SettingsPage isOpen={settingsAreOpen} onClose={closeSettings} />
    </div>
  );
};

export default Header;
