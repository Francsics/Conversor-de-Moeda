import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome5 } from '@expo/vector-icons';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const { width } = Dimensions.get('window');

export default function HomeScreen({ navigation }: Props) {
  return (
    <LinearGradient
      colors={['#f5f5f5', '#FFFFFF']}
      style={styles.gradient}
    >
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>💱 Conversor de Moedas</Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Converter')}
        >
          <FontAwesome5 name="exchange-alt" size={24} color="white" style={styles.icon} />
          <Text style={styles.buttonText}>Converter</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('History')}
        >
          <FontAwesome5 name="history" size={24} color="white" style={styles.icon} />
          <Text style={styles.buttonText}>Histórico</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#555555',
    marginBottom: 60,
    textAlign: 'center',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#555555',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 12,
    marginVertical: 12,
    width: width * 0.8,
    justifyContent: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  icon: {
    marginRight: 12,
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
  },
});
