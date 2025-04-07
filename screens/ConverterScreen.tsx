import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  Keyboard,
  TouchableWithoutFeedback,
  Dimensions,
  ScrollView,
  Platform,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');
const API_KEY = 'fca_live_XZzSJIJpBPlFkcSjC8A9xGFF82OUwqoLYnnkOOAN';

export default function ConverterScreen() {
  const [amount, setAmount] = useState('');
  const [fromCurrency, setFromCurrency] = useState('EUR');
  const [toCurrency, setToCurrency] = useState('USD');
  const [result, setResult] = useState<number | null>(null);
  const [currencies, setCurrencies] = useState<string[]>([]);
  const navigation = useNavigation();

  useEffect(() => {
    axios
      .get('https://api.freecurrencyapi.com/v1/currencies', {
        params: { apikey: API_KEY },
      })
      .then((res) => {
        const currencyKeys = Object.keys(res.data.data);
        setCurrencies(currencyKeys);
      })
      .catch((error) => {
        console.error(error);
        Alert.alert('Erro', 'Não foi possível carregar as moedas.');
      });
  }, []);

  const convertCurrency = async () => {
    if (!amount) {
      Alert.alert('Erro', 'Insere um valor.');
      return;
    }

    try {
      const res = await axios.get('https://api.freecurrencyapi.com/v1/latest', {
        params: {
          apikey: API_KEY,
          base_currency: fromCurrency,
          currencies: toCurrency,
        },
      });

      const rate = res.data.data[toCurrency];
      const converted = parseFloat(amount) * rate;
      setResult(converted);

      const conversionRecord = {
        timestamp: Date.now(),
        from: fromCurrency,
        to: toCurrency,
        amount: parseFloat(amount),
        result: converted,
      };

      const historyJSON = await AsyncStorage.getItem('conversionHistory');
      const history = historyJSON ? JSON.parse(historyJSON) : [];
      history.unshift(conversionRecord);
      await AsyncStorage.setItem('conversionHistory', JSON.stringify(history));
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Falha na conversão.');
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <LinearGradient colors={['#f5f5f5', '#FFFFFF']} style={styles.gradient}>
  
        {/* Botão Voltar fixo no topo */}
        <View style={styles.topBar}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <FontAwesome5 name="arrow-left" size={20} color="#555555" />
            <Text style={styles.backText}>Voltar</Text>
          </TouchableOpacity>
        </View>
  
        {/* Conteúdo centralizado com scroll */}
        <ScrollView contentContainerStyle={styles.scroll}>
          <View style={styles.card}>
            <Text style={styles.title}>Conversão de Moedas</Text>
  
            <Text style={styles.label}>Valor:</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              placeholder="Ex: 100"
              value={amount}
              onChangeText={setAmount}
            />
  
            <Text style={styles.label}>De:</Text>
            <View style={styles.pickerWrapper}>
              <Picker
                selectedValue={fromCurrency}
                onValueChange={setFromCurrency}
                style={styles.picker}
              >
                {currencies.map((currency) => (
                  <Picker.Item label={currency} value={currency} key={currency} />
                ))}
              </Picker>
            </View>
  
            <Text style={styles.label}>Para:</Text>
            <View style={styles.pickerWrapper}>
              <Picker
                selectedValue={toCurrency}
                onValueChange={setToCurrency}
                style={styles.picker}
              >
                {currencies.map((currency) => (
                  <Picker.Item label={currency} value={currency} key={currency} />
                ))}
              </Picker>
            </View>
  
            <TouchableOpacity style={styles.button} onPress={convertCurrency}>
              <Text style={styles.buttonText}>Converter</Text>
            </TouchableOpacity>
  
            {result !== null && (
              <Text style={styles.result}>
                {amount} {fromCurrency} = {result.toFixed(2)} {toCurrency}
              </Text>
            )}
          </View>
        </ScrollView>
  
      </LinearGradient>
    </TouchableWithoutFeedback>
  );
  
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  topBar: {
    position: 'absolute',
    top: 55,
    left: 1,
    right: 20,
    zIndex: 10,
  },
  scroll: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 30,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    alignSelf: 'flex-start',
    marginLeft: 20,
  },
  backText: {
    color: '#555555',
    fontSize: 16,
    marginLeft: 8,
  },
  card: {
    backgroundColor: '#fff',
    width: width * 0.9,
    borderRadius: 16,
    padding: 20,
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#555555',
    textAlign: 'center',
    marginBottom: 20,
  },
  label: {
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 4,
    color: '#444',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 10,
    backgroundColor: '#f9f9f9',
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    backgroundColor: '#f9f9f9',
    marginBottom: 10,
    overflow: 'hidden',
  },
  picker: {
    height: Platform.OS === 'ios' ? 180 : 50,
  },
  button: {
    backgroundColor: '#555555',
    paddingVertical: 14,
    borderRadius: 12,
    marginTop: 20,
    alignItems: 'center',
    elevation: 4,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  result: {
    marginTop: 30,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#555555',
  },
});
 