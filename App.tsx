import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Layout from './src/layout/Layout';
// export default function App() {
//   return (
//     <View style={styles.container}>
//       <Text>Open up App.js to start working on your app!</Text>
//       <StatusBar style="auto" />
//     </View>
//   );
// }

import React from 'react';
import HomeScreen from './src/screens/HomeScreen';

const App: React.FC = () => {
  return (
    <Layout>
      <Text>Test</Text>
    </Layout>
  );
  //return <HomeScreen />;
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
