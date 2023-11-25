import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

const BottomNavigationBar = () => {
  const navigation = useNavigation();

  const handleNavigate = (screenName) => {
    navigation.navigate(screenName);
  };

  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-around', backgroundColor: '#007BFF', paddingVertical: 10 }}>
      <TouchableOpacity onPress={() => handleNavigate('Home')}>
        <Text style={{ color: 'white' }}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleNavigate('Calculator')}>
        <Text style={{ color: 'white' }}>Calculator</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleNavigate('Prediction')}>
        <Text style={{ color: 'white' }}>Prediction</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleNavigate('Community')}>
        <Text style={{ color: 'white' }}>Community</Text>
      </TouchableOpacity>
    </View>
  );
};

export default BottomNavigationBar;
