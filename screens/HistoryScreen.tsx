import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

type ConversionRecord = {
  timestamp: number;
  from: string;
  to: string;
  amount: number;
  result: number;
};

const { width } = Dimensions.get('window');

export default function HistoryScreen() {
  const [history, setHistory] = useState<ConversionRecord[]>([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const historyJSON = await AsyncStorage.getItem('conversionHistory');
        if (historyJSON) {
          setHistory(JSON.parse(historyJSON));
        }
      } catch (error) {
        console.error('Erro ao carregar histórico', error);
      }
    };

    fetchHistory();
  }, []);

  const deleteItem = async (timestamp: number) => {
    try {
      const updatedHistory = history.filter((item) => item.timestamp !== timestamp);
      setHistory(updatedHistory);
      await AsyncStorage.setItem('conversionHistory', JSON.stringify(updatedHistory));
    } catch (error) {
      console.error('Erro ao apagar item do histórico', error);
    }
  };

  return (
    <LinearGradient colors={['#f5f5f5', '#FFFFFF']} style={styles.gradient}>
      {/* Botão voltar */}
      <View style={styles.topBar}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <FontAwesome5 name="arrow-left" size={20} color="#555555" />
          <Text style={styles.backText}>Voltar</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.title}>Histórico</Text>

      {history.length === 0 ? (
        <Text style={styles.empty}>Nenhuma conversão ainda.</Text>
      ) : (
        <FlatList
          data={history}
          contentContainerStyle={styles.list}
          keyExtractor={(item) => item.timestamp.toString()}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <View style={styles.cardContent}>
                <View>
                  <Text style={styles.text}>
                    💱 {item.amount} {item.from} → {item.result.toFixed(2)} {item.to}
                  </Text>
                  <Text style={styles.date}>
                    {new Date(item.timestamp).toLocaleString()}
                  </Text>
                </View>

                <TouchableOpacity onPress={() => deleteItem(item.timestamp)}>
                  <FontAwesome5 name="trash" size={20} color="#ff3b30" />
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      )}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  topBar: {
    position: 'absolute',
    top: 55,
    left: 20,
    zIndex: 10,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backText: {
    color: '#555555',
    fontSize: 16,
    marginLeft: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#555555',
    marginBottom: 30,
    alignSelf: 'center',
  },
  list: {
    paddingBottom: 30,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    width: width * 0.9,
    alignSelf: 'center',
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    fontWeight: '500',
    color: '#555555',
  },
  date: {
    marginTop: 6,
    fontSize: 12,
    color: '#777',
  },
  empty: {
    textAlign: 'center',
    color: '#555555',
    fontSize: 16,
    marginTop: 60,
  },
});
