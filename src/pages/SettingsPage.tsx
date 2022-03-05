import { AxiosResponse } from 'axios';
import {
  Button,
  Center,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useToast,
} from '@chakra-ui/react';
import { CommonResponse } from 'bloben-interface/interface';
import { Context } from '../context/store';
import AdminApi from '../api/admin.api';
import React, { useContext, useState } from 'react';
import Separator from '../components/Separator';

const SettingsPage = (props: any) => {
  const toast = useToast();
  const { isOpen, onClose } = props;
  const [store] = useContext(Context);

  const [oldPassword, setOldPassword] = useState('');
  const [password, setPassword] = useState('');

  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  const onChange = (e: any) => {
    if (e.target.name === 'oldPassword') {
      setOldPassword(e.target.value);
    }
    if (e.target.name === 'password') {
      setPassword(e.target.value);
    }
  };

  const handleChangePassword = async () => {
    try {
      const response: AxiosResponse<CommonResponse> =
        await AdminApi.changePassword(
          {
            oldPassword,
            password,
          },
          store.token
        );

      if (response.status === 200) {
        toast({
          title: 'Password changed',
        });
        onClose();
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
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Change password</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl id="username" size="2xl">
            <FormLabel size="2xl">Current password</FormLabel>
            <Input
              name={'oldPassword'}
              type={show ? 'text' : 'password'}
              value={oldPassword}
              onChange={onChange}
            />
          </FormControl>
          <Separator height={20} />
          <FormControl id="password" size="2xl">
            <FormLabel size="2xl">Password</FormLabel>
            <InputGroup>
              <Input
                type={show ? 'text' : 'password'}
                name={'password'}
                value={password}
                onChange={onChange}
              />
              <InputRightElement width="4.5rem">
                <Button
                  _focus={{ boxShadow: 'none' }}
                  h="1.75rem"
                  size="sm"
                  onClick={handleClick}
                >
                  {show ? 'Hide' : 'Show'}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>
          <Separator height={40} />
          <Center>
            <Button onClick={handleChangePassword} colorScheme="teal" size="md">
              Confirm
            </Button>
          </Center>
          <Separator height={16} />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default SettingsPage;
