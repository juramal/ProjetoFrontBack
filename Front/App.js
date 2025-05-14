import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, SafeAreaView } from 'react-native';
import { useState, useEffect } from 'react';
import Inserir from './components/Inserir';
import Exiba from './components/Exiba';

export default function App() {
  const [usuarios, setUsuarios] = useState([]);

  const carregarUsuarios = () => {
    fetch('http://192.168.1.124:3000/')
      .then(response => response.json())
      .then(data => {
        console.log('Usuários carregados:', data);
        setUsuarios(data);
      })
      .catch(error => console.error('Erro ao buscar usuários:', error));
  };

  useEffect(() => {
    carregarUsuarios();
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Gerenciamento de Usuários</Text>

        <Inserir atualizarLista={carregarUsuarios} />
        <Exiba usuarios={usuarios} atualizarLista={carregarUsuarios} />

        <StatusBar style="auto" />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    width: '70%',
    flex: 1,
    backgroundColor: '#f5f5f5',
    
  },
  container: {
    padding: 20,
    alignItems: 'center',
   
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
});
