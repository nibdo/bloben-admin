import { AxiosResponse } from 'axios';
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useToast,
} from '@chakra-ui/react';
import { Context } from '../context/store';
import { GetUsersResponse } from 'bloben-interface/admin/admin';
import { ROLE } from 'bloben-interface/enums';
import AdminApi from '../api/admin.api';
import React, { useContext, useEffect, useState } from 'react';
import Separator from '../components/Separator';
import UsersView from '../components/UsersView';

const UsersPage = () => {
  const [store] = useContext(Context);

  const toast = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [users, setUsers] = useState<GetUsersResponse[]>([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const getUsers = async (): Promise<void> => {
    try {
      const response: AxiosResponse<GetUsersResponse[]> =
        await AdminApi.getUsers(store.token);

      if (response.data) {
        setUsers(response.data);
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

  const handleEnabledStatusChange = async (user: GetUsersResponse) => {
    await AdminApi.updateUser(
      user.id,
      { isEnabled: !user.isEnabled },
      store.token
    );
    await getUsers();
  };

  const handleChangeRole = async (user: GetUsersResponse, role: ROLE) => {
    await AdminApi.updateUser(
      user.id,
      { role, isEnabled: user.isEnabled },
      store.token
    );
    await getUsers();
  };

  useEffect(() => {
    getUsers();
  }, []);

  const onChange = (e: any) => {
    if (e.target.name === 'username') {
      setUsername(e.target.value);
    }
    if (e.target.name === 'password') {
      setPassword(e.target.value);
    }
  };

  const handleCreate = async (): Promise<void> => {
    try {
      await AdminApi.createUser(
        {
          username,
          password,
        },
        store.token
      );

      setIsModalOpen(false);
      getUsers();
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
    <>
      <UsersView
        users={users}
        handleEnabledStatusChange={handleEnabledStatusChange}
        handleChangeRole={handleChangeRole}
      />
      <div style={{ position: 'fixed', bottom: 50, right: 50 }}>
        <Button
          colorScheme="teal"
          variant="solid"
          onClick={() => setIsModalOpen(true)}
        >
          Create user
        </Button>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create user</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl id="username" size="2xl">
              <FormLabel size="2xl">Username</FormLabel>
              <Input name={'username'} value={username} onChange={onChange} />
            </FormControl>
            <Separator height={20} />
            <FormControl id="password" size="2xl">
              <FormLabel size="2xl">Password</FormLabel>
              <Input
                type={'password'}
                name={'password'}
                value={password}
                onChange={onChange}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button onClick={handleCreate}>Confirm</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default UsersPage;
