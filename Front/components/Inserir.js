import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, StyleSheet } from 'react-native';

const Inserir = ({ atualizarLista }) => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [idade, setIdade] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [mensagem, setMensagem] = useState('');

  const addUser = () => {
    fetch('http://192.168.1.124:3000/add/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify({ name: nome, email, idade }),
    })
      .then(response => response.json())
      .then(() => {
        setMensagem('Usuário cadastrado com sucesso ✅');
        setModalVisible(true);
        setNome('');
        setEmail('');
        setIdade('');
        atualizarLista();
        setTimeout(() => setModalVisible(false), 3000);
      })
      .catch(() => {
        setMensagem('Erro ao cadastrar usuário ❌');
        setModalVisible(true);
        setTimeout(() => setModalVisible(false), 3000);
      });
  };

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Novo Usuário</Text>

      <TextInput
        label="Nome"
        mode="outlined"
        placeholder="Nome"
        value={nome}
        onChangeText={setNome}
        style={styles.input}
      />

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
      />

      <TextInput
        placeholder="Idade"
        value={idade}
        onChangeText={setIdade}
        style={styles.input}
        keyboardType="numeric"
      />

      <TouchableOpacity style={styles.button} onPress={addUser}>
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>

      <Modal
        transparent={true}
        animationType="fade"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>{mensagem}</Text>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Inserir;

const styles = StyleSheet.create({
    
  card: {
    width: '100%',
    backgroundColor: '#e3f2fd',
    padding: 20,
    borderRadius: 10,
    marginBottom: 30,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
    padding: 10,
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
  },
  modalText: {
    fontSize: 16,
    color: '#333',
  },
});
