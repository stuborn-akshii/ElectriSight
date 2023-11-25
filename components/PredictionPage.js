import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Button, ImageBackground, StyleSheet, Text, TextInput, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const PredictionPage = () => {
  const [selectedValue, setSelectedValue] = useState('Select');
  const [numberOfBuildings, setNumberOfBuildings] = useState('');
  const [grossArea, setGrossArea] = useState('');
  const [energyRating, setEnergyRating] = useState('');
  const [calculatedValue, setCalculatedValue] = useState(null);

  const handleCalculate = () => {

    const numUnitsValue = parseFloat(numberOfBuildings);
    const grossAreaValue = parseFloat(grossArea);
    const energyRatingValue = parseFloat(energyRating);
    if (!isNaN(numUnitsValue) && !isNaN(grossAreaValue) && !isNaN(energyRatingValue)) {
      const data = {
        param1: grossAreaValue,
        param2: numUnitsValue,
        param3: energyRatingValue,
      };
    if (selectedValue === 'Office') {
      fetch('https://shatakshi.pythonanywhere.com/predict3', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      .then((response) => response.json())
      .then((result) => {
        // Handle the API response here
        const predictedEnergyConsumption = result.ensemble_prediction;
        setCalculatedValue(predictedEnergyConsumption.toFixed(2));
        console.log('Ensemble Prediction:', result.ensemble_prediction);
      })
      .catch((error) => {
        console.error('API Request Error:', error);
      });
      // Code to handle the 'Office' option
    } else if (selectedValue === 'School') {
      fetch('https://shatakshi.pythonanywhere.com/predict1', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      .then((response) => response.json())
      .then((result) => {
        // Handle the API response here
        const predictedEnergyConsumption = result.ensemble_prediction;
        setCalculatedValue(predictedEnergyConsumption.toFixed(2));
        console.log('Ensemble Prediction:', result.ensemble_prediction);
      })
      .catch((error) => {
        console.error('API Request Error:', error);
      });
      // Code to handle the 'School' option
    } else if (selectedValue === 'Cllg') {
      fetch('https://shatakshi.pythonanywhere.com/predict2', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      .then((response) => response.json())
      .then((result) => {
        // Handle the API response here
        const predictedEnergyConsumption = result.ensemble_prediction;
        setCalculatedValue(predictedEnergyConsumption.toFixed(2));
        console.log('Ensemble Prediction:', result.ensemble_prediction);
      })
      .catch((error) => {
        console.error('API Request Error:', error);
      });
      // Code to handle the 'College/University' option
    } else if (selectedValue === 'MultifamilyH') {
      fetch('https://shatakshi.pythonanywhere.com/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      .then((response) => response.json())
      .then((result) => {
        // Handle the API response here
        const predictedEnergyConsumption = result.ensemble_prediction;
        setCalculatedValue(predictedEnergyConsumption.toFixed(2));
        console.log('Ensemble Prediction:', result.ensemble_prediction);
      })
      .catch((error) => {
        console.error('API Request Error:', error);
      });// Code to handle the 'MultiFamily Housing' option
    } else if (selectedValue === 'Hotel') {
      fetch('https://shatakshi.pythonanywhere.com/predict4', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      .then((response) => response.json())
      .then((result) => {
        // Handle the API response here
        const predictedEnergyConsumption = result.ensemble_prediction;
        setCalculatedValue(predictedEnergyConsumption.toFixed(2));
        console.log('Ensemble Prediction:', result.ensemble_prediction);
      })
      .catch((error) => {
        console.error('API Request Error:', error);
      });// Code to handle the 'Hotel' option
    } else {
      alert('Please select an Property Type before predicting energy consumption.');
      return;
      // Handle any other unexpected value or provide a default action
    }
  }
    
  };
  const navigation = useNavigation(); // Initialize navigation

  const handleGoBack = () => {
    navigation.goBack(); // Navigate back
  };


  return (
<ImageBackground source={require('../assets/restpage.png')} style={styles.background}>
      <View style={styles.container}>
<Icon name="arrow-back" size={24} color="black" style={styles.backArrow} onPress={handleGoBack} />
        <Text style={styles.title}>Prediction</Text>

        <Picker
          selectedValue={selectedValue}
          style={styles.picker}
          onValueChange={(itemValue) => setSelectedValue(itemValue)}
        >
          <Picker.Item label="Property Type" value="Select" />
          <Picker.Item label="Office" value="Office" />
          <Picker.Item label="School" value="School" />
          <Picker.Item label="College/University" value="Cllg" />
          <Picker.Item label="Multi-Family Housing" value="MultifamilyH" />
          <Picker.Item label="Hotel " value="Hotel" />
        </Picker>
      <Text style={styles.label}>Enter Number of Buildings </Text>

        <TextInput
  style={styles.input}
  placeholder="No. of buildings"
  value={numberOfBuildings}
  onChangeText={text => {
    if (text.length <= 10) {
      setNumberOfBuildings(text);
    }
  }}
  keyboardType="numeric"
/>
      <Text style={styles.label}>Enter Gross Area</Text>

      <TextInput
  style={styles.input}
  placeholder="Gross Area"
  value={grossArea}
  onChangeText={text => {
    if (text.length <= 10) {
      setGrossArea(text);
    }
  }}
  keyboardType="numeric"
/>
      <Text style={styles.label}>Enter Energy Rating (1-5) </Text>
<TextInput
  style={{
    height: 40,
    width: 200,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    backgroundColor: 'transparent',
  }}
  placeholder="Energy Rating"
  value={energyRating}
  onChangeText={text => {
    if (/^[1-5]$/.test(text) || text === '') {
      setEnergyRating(text);
    }
  }}
  keyboardType="numeric"
/>

        <Button title="Calculate" onPress={handleCalculate} />

        {calculatedValue !== null && (
          <Text style={styles.calculatedValue}>Predicted Energy Consumption is : {calculatedValue} kWh</Text>
        )}
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backArrow: {
    position: 'absolute',
    top: 50,
    fontSize: 30,
    left: 10,
    fontWeight: 'bold',

    marginBottom: 50,
  },
  picker: {
  height: 50,
  width: 200,
  margin: 20,
  borderColor: 'black',
  borderWidth: 1,
  backgroundColor: 'transparent', // Set background color to transparen

  },
  input: {
    height: 40,
    width: 200,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    backgroundColor: 'transparent' // Set the background color of the TextInput
  },
  calculatedValue: {
    marginTop: 20,
    fontSize: 20,
  },
  inputContainer: {
    marginBottom: 20,
    width: '80%',
  },
  label: {
    marginBottom: 5,
    color: 'black',
    fontWeight: 'bold',
  },
  title: {
    fontSize: 24,
    bottom: 80,
    right:10,
    marginBottom: 40,
    color: 'black',
    fontWeight: 'bold',
  },
  backArrow: {
    position: 'absolute',
    top: 80,
    left: 20,
    fontSize:25,
    marginBottom: 50,
  },
});

export default PredictionPage;
