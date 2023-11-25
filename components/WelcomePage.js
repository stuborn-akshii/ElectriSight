import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const WelcomePage = () => {
  const navigation = useNavigation();

  const handleGetStarted = () => {
    navigation.navigate('Calculator'); // Navigate to 'HomePage' when the button is pressed
  };

  return (
    <ImageBackground source={require('../assets/bg21.jpg')} style={styles.background}>
      <View style={styles.container}>
        <Image
          source={require('../assets/logofinal1.png')} // <-- Added this line
          style={styles.logo}
        />
        <Text style={styles.heading}>Welcome to ElectriSight</Text>
        <Text style={styles.subHeading}></Text>
        <TouchableOpacity onPress={handleGetStarted} style={styles.button}>
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
    logo: {
    width: 200,
    height: 165,
    marginBottom: 200,
    top : -10,
    left:10,
  },
  heading: {
    
    fontSize: 24,
    fontWeight: 'bold',
    top:50,
    marginBottom: 30,
  },
  subHeading: {
    fontSize: 16,
    marginBottom: 125,
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    bottom:70,
    borderRadius: 5,
    marginBottom: -55,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default WelcomePage;
