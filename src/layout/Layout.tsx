import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Menu from '@/components/Menu';

interface LayoutProps {
  children?: React.ReactElement
}

const Layout: React.FC<LayoutProps> = ({children}) => {
  return (
    <NavigationContainer>
      {children}
      <Menu />
    </NavigationContainer>
  )
}

export default Layout;