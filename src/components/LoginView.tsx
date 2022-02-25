import {
  Button,
  Center,
  Container,
  FormControl,
  FormLabel,
  Input,
} from '@chakra-ui/react';
import { Heading } from '@chakra-ui/react';
import React from 'react';
import Separator from './Separator';

interface LoginViewProps {
  username: string;
  password: string;
  serverUrl: string;
  onChange: any;
  handleLogin: any;
}
const LoginView = (props: LoginViewProps) => {
  const { username, password, onChange, serverUrl, handleLogin } = props;

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: '100%',
      }}
    >
      <Container width={400}>
        <Heading as="h2" size="2xl">
          Admin Login
        </Heading>
        <Separator />
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
        <Separator height={40} />
        <FormControl id="serverUrl" size="2xl">
          <FormLabel size="2xl">Url</FormLabel>
          <Input
            type={'serverUrl'}
            name={'serverUrl'}
            value={serverUrl}
            onChange={onChange}
          />
        </FormControl>
        <Separator height={40} />
        <Center>
          <Button onClick={handleLogin} colorScheme="teal" size="md">
            Login
          </Button>
        </Center>
      </Container>
    </div>
  );
};

export default LoginView;
