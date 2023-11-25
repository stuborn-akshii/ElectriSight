import React, { useState } from 'react';
import { ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const CalculatorPage = ({ navigation }) => {
  const [usage, setUsage] = useState('');
  const [hours, setHours] = useState('');
  const costPerKwh = 0.16; // Cost per kWh in dollars

  const calculateCost = () => {
    const energyConsumption = parseFloat(usage);
    const totalHours = parseFloat(hours);
    const totalCost = energyConsumption * totalHours * costPerKwh;
    return totalCost.toFixed(2);
  };

  return (
    <ImageBackground
      source={require('../assets/restpage.png')}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.goBackContainer}>
  <Icon name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>Appliance Energy Cost Calculator</Text>
        
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Enter Energy Consumption (kWh)</Text>
          <TextInput
  style={styles.input}
  placeholder="Enter energy consumption"
  keyboardType="numeric"
  value={usage}
  onChangeText={text => {
    if (text.length <= 10) {
      setUsage(text);
    }
  }}
/>
          <Text style={styles.label}>Enter Number of Hours</Text>

<TextInput
  style={styles.input}
  placeholder="Enter number of hours"
  keyboardType="numeric"
  value={hours}
  onChangeText={text => {
    if (text.length <= 10) {
      setHours(text);
    }
  }}
/>

        </View>
        
        <TouchableOpacity
          style={styles.button}
          onPress={() => {}}
          disabled={!usage || !hours} // Disable button if fields are empty
        >
          <Text style={styles.buttonText}>Calculate Cost</Text>
        </TouchableOpacity>

        {usage && hours && (
          <Text style={styles.result}>
            Total Cost: $ {calculateCost()}
          </Text>
        )}
      </View>
    </ImageBackground>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '',
  },
  goBackContainer: {
    position: 'absolute',
    top: 80,
    left: 5,
    width: 500, // Add width
    height: 75,
  },
  goBackText: {
    fontSize: 24,
    color: 'black',
  },
  title: {
    fontSize: 24,
    bottom: 100,
    marginBottom: 40,
    color: 'black',
    fontWeight: 'bold',
  },
  input: {
    width: '80',
    height: 40,
    borderColor: 'black',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 50,
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  result: {
    fontSize: 18,
    marginTop: 20,
  },
    backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    marginBottom: 10,
    width: '80%',
  },
  label: {
    marginBottom: 5,
    color: 'black',
    fontWeight: 'bold',
  },
});

export default CalculatorPage;
