import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import Menu from '../components/Menu';

//const Stack = createNativeStackNavigator();

interface LayoutProps {
  children: React.ReactElement
}

const Layout: React.FC<LayoutProps> = ({children}) => {
  return (
    <NavigationContainer>
      {/*<Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{title: 'Welcome'}}
        />
      </Stack.Navigator>*/}
      {children}
      <Menu />
    </NavigationContainer>
  )
}

export default Layout;