import { StyleSheet, Text } from 'react-native';
import Layout from '@/layout/Layout';
import React from 'react';
import { TodoProvider } from '@/context/TodoContext';

const App: React.FC = () => {
  return (
    <TodoProvider>
      <Layout />
    </TodoProvider>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
