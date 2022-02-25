import { Button } from '@chakra-ui/react';
import React from 'react';
import Separator from './Separator';

const navigationStyle: any = {
  display: 'flex',
  flexDirection: 'column',
  width: 280,
  height: '100%',
  padding: 24,
  borderRight: 'solid 1px gray',
};

const Navigation = () => {
  // const history = useHistory();

  // const navigateTo = (path: APP_PATH) => {
  //   history.push(`/admin/${path}`);
  // };

  return (
    <div style={navigationStyle}>
      <Button
        onClick={() => {
          return;
        }}
        colorScheme="teal"
      >
        {/*<Button onClick={() => navigateTo(APP_PATH.USERS)} colorScheme="teal">*/}
        Users
      </Button>
      <Separator height={16} />
    </div>
  );
};

export default Navigation;
