import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Main from './pages/Main';
import Profile from './pages/Profile';
import Colors from '../src/constants/Colors';

const Routes = createAppContainer(
    createStackNavigator({
        Main:{
            screen: Main,
            navigationOptions:{
                title: 'Devs Floripa',
            },
        },
        Profile:{
            screen: Profile,
            navigationOptions:{
                title: 'Perfil Github'
            },
        },
    },{
        defaultNavigationOptions:{
            headerTintColor: '#FFF',
            headerBackTitleVisible: null,
            headerStyle: {
                backgroundColor:Colors.primaryColor,
            }
        },
    })
);

export default Routes;
