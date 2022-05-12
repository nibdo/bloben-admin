import { AxiosResponse } from 'axios';
import {
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Text,
  useToast,
} from '@chakra-ui/react';
import { CommonResponse } from 'bloben-interface/interface';
import { Context } from '../context/store';
import React, { useContext, useEffect, useState } from 'react';
import Separator from '../components/Separator';
import ServerSettingsApi from '../api/serverSettings.api';

const ServerSettingsPage = () => {
  const toast = useToast();
  const [store] = useContext(Context);

  const [serverSettings, setServerSettings] = useState<any>({});

  const getServerSettings = async () => {
    const response = await ServerSettingsApi.get(store.token);

    if (response.status === 200) {
      setServerSettings(response.data);
    }
  };

  useEffect(() => {
    getServerSettings();
  }, []);

  const handleChange = async () => {
    try {
      const response: AxiosResponse<CommonResponse> =
        await ServerSettingsApi.patch(store.token, {
          checkNewVersion: !serverSettings.checkNewVersion,
        });

      if (response.status === 200) {
        toast({ title: response.data?.message });

        getServerSettings();
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

  const handleChangeEmailCounter = async (e: any) => {
    try {
      const response: AxiosResponse<CommonResponse> =
        await ServerSettingsApi.patch(store.token, {
          emailCounter: e.target.value,
        });

      if (response.status === 200) {
        toast({ title: response.data?.message });

        getServerSettings();
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
    <Flex direction={'column'} padding={24} maxWidth={'50%'}>
      <Separator height={24} />
      <Flex direction="column">
        <Checkbox
          isChecked={serverSettings.checkNewVersion}
          onChange={handleChange}
        >
          Check updates
        </Checkbox>
        <Separator height={8} />
        <Text>
          Your server will check site bloben.com/version.txt for notification
          about updates in regular intervals
        </Text>
      </Flex>
      <Separator height={24} />
      <FormControl id="emailCounter" size="2xl">
        <FormLabel size="2xl">Email daily limit</FormLabel>
        <Input
          size="lg"
          name={'emailCounter'}
          value={serverSettings.emailCounter}
          onChange={(e: any) => handleChangeEmailCounter(e)}
        />
      </FormControl>
    </Flex>
  );
};

export default ServerSettingsPage;
