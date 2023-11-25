import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { Image, Text, View } from 'react-native';

import calculatorIcon from './assets/calci8.png';
import communityIcon from './assets/communityicon.png';
import homeIcon from './assets/homeicon.png';
import predictionIcon from './assets/predictionicon.png';

import CalculatorPage from './components/CalculatorPage';
import CommunityPage from './components/CommunityPage';
import PredictionPage from './components/PredictionPage';
import WelcomePage from './components/WelcomePage';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const SplashScreen: React.FC = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Image source={require('./assets/splash.png')} />
      <Text>Loading...</Text>
    </View>
  );
};

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000); // Simulating a 2-second loading time
  }, []);

  if (loading) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconSource;

            if (route.name === 'Home') {
              iconSource = homeIcon;
            } else if (route.name === 'Calculator') {
              iconSource = calculatorIcon;
            } else if (route.name === 'Prediction') {
              iconSource = predictionIcon;
            } else if (route.name === 'Community') {
              iconSource = communityIcon;
            }

            return <Image source={iconSource} style={{ width: size, height: size, tintColor: color }} />;
          },
          activeTintColor: '#28a745',
          inactiveTintColor: 'gray',
          style: { backgroundColor: '#007BFF', height: 60 },
          labelStyle: { fontSize: 12 },
          tabStyle: { justifyContent: 'center' },
        })}
      >
        <Tab.Screen name="Home" component={WelcomePage} options={{ headerShown: false }} />
        <Tab.Screen name="Calculator" component={CalculatorPage} options={{ headerShown: false }} />
        <Tab.Screen name="Prediction" component={PredictionStack} options={{ headerShown: false }} />
        <Tab.Screen name="Community" component={CommunityPage} options={{ headerShown: false }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const PredictionStack: React.FC = () => (
  <Stack.Navigator>
    <Stack.Screen name="PredictionPage" component={PredictionPage} options={{ headerShown: false }} />
  </Stack.Navigator>
);

export default App;
