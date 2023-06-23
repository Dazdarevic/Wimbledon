import React, { useContext } from 'react';
import DrawerNavigator from './DrawerNavigator';
import { useLogin } from '../context/LoginProvider';
import NavigatorAdmin from './NavigatorAdmin';
import NavigatorEditor from './NavigatorEditor';

const UserRoleNavigator = (props) => {
    const {isAdmin} = useLogin();

    return isAdmin?  <NavigatorAdmin /> : <NavigatorEditor />;
}
export default UserRoleNavigator;