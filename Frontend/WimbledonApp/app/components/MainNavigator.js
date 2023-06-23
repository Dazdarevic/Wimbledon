import React, { useContext } from 'react';
import DrawerNavigator from './DrawerNavigator';
import { useLogin } from '../context/LoginProvider';
import UserRoleNavigator from './UserRoleNavigator';

const MainNavigator = (props) => {
    const {isLoggedIn} = useLogin();

    return isLoggedIn?  <UserRoleNavigator /> : <DrawerNavigator />;
}

export default MainNavigator;