import {
  Button,
  Checkbox,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { GetUsersResponse } from 'bloben-interface/admin/admin';
import React from 'react';

const renderUsers = (
  users: GetUsersResponse[],
  handleEnabledStatusChange: any,
  handleChangeRole: any
) => {
  return users?.map((user: GetUsersResponse) => {
    return (
      <Tr key={user.id}>
        <Td>{user.username}</Td>
        <Td>
          <Menu>
            <MenuButton as={Button} disabled={user.role === 'ADMIN'}>
              {user.role}
            </MenuButton>
            <MenuList>
              <MenuItem onClick={() => handleChangeRole(user, 'DEMO')}>
                {'DEMO'}
              </MenuItem>
              <MenuItem onClick={() => handleChangeRole(user, 'USER')}>
                {'USER'}
              </MenuItem>
            </MenuList>
          </Menu>
        </Td>
        <Td>
          <Checkbox
            onChange={() => handleEnabledStatusChange(user)}
            isChecked={user.isEnabled}
          />
          {user.isEnabled}
        </Td>
      </Tr>
    );
  });
};

interface UsersViewProps {
  users: GetUsersResponse[];
  handleEnabledStatusChange: any;
  handleChangeRole: any;
}
const UsersView = (props: UsersViewProps) => {
  const { users, handleEnabledStatusChange, handleChangeRole } = props;

  const renderedUsers: any = renderUsers(
    users,
    handleEnabledStatusChange,
    handleChangeRole
  );

  return (
    <Table variant="simple">
      <Thead>
        <Tr>
          <Th>username</Th>
          <Th>role</Th>
          <Th>is enabled</Th>
        </Tr>
      </Thead>
      <Tbody>{renderedUsers}</Tbody>
    </Table>
  );
};

export default UsersView;
