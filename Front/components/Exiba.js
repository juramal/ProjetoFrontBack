"use client"
import React, { useState } from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Modal } from "react-native";
import { useEffect } from 'react';

const DadoExiba = ({ campo, setCampo }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [mensagem, setMensagem] = useState('');
  
  useEffect(() => {
    fetch('http://10.68.153.71:3000/')
      .then(response => response.json())
      .then(data => {
        console.log('Usuários Exibidos:', data);
        setCampo(data);
      })
      .catch(error => console.error('Erro:', error));
  }, [campo]);
    

  const handleAtualizar = (id) => {
    fetch(`http://10.68.153.71:3000/update/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify({ name: 'Novo Nome' }),
    })
      .then(res => res.json())
      .then(data => {
        console.log('Atualizado:', data);
        setMensagem('Usuário atualizado com sucesso ✅');
        setModalVisible(true);
        setTimeout(() => setModalVisible(false), 3000);
      })
      .catch(err => {
        console.error('Erro:', err);
        setMensagem('Erro ao atualizar usuário ❌');
        setModalVisible(true);
        setTimeout(() => setModalVisible(false), 3000);
      });
  };

  const handleDeletar = (id) => {
    fetch(`http://10.68.153.71:3000/delete/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    })
      .then(res => res.json())
      .then(data => {
        console.log('Deletado:', data);
        setMensagem('Usuário excluído com sucesso ✅');
        setModalVisible(true);

        // Atualiza a lista removendo o item
       

        // Fecha o modal
        setTimeout(() => {
          setModalVisible(false);
        }, 3000);
      })
      .catch(err => {
        console.error('Erro:', err);
        setMensagem('Erro ao excluir usuário ❌');
        setModalVisible(true);
        setTimeout(() => setModalVisible(false), 3000);
      });
  };

  return (
    <View style={styles.container}>
      {/* Modal de Feedback */}
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

      <FlatList
        data={campo}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.label}>ID:</Text>
            <Text style={styles.value}>{item._id}</Text>

            <Text style={styles.label}>Nome:</Text>
            <Text style={styles.value}>{item.name}</Text>

            <Text style={styles.label}>Email:</Text>
            <Text style={styles.value}>{item.email}</Text>

            <Text style={styles.label}>Idade:</Text>
            <Text style={styles.value}>{item.idade}</Text>

            <View style={styles.buttonGroup}>
              <TouchableOpacity
                style={[styles.button, styles.updateButton]}
                onPress={() => handleAtualizar(item._id)}
              >
                <Text style={styles.buttonText}>Atualizar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.button, styles.deleteButton]}
                onPress={() => handleDeletar(item._id)}
              >
                <Text style={styles.buttonText}>Excluir</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default DadoExiba;

const styles = StyleSheet.create({
  container: {
    width: '30%',
    paddingBottom: 10,
  },
  card: {
    backgroundColor: '#e0f7fa',
    padding: 15,
    marginBottom: 15,
    borderRadius: 12,
    borderColor: '#ccc',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  label: {
    fontWeight: 'bold',
    color: '#444',
  },
  value: {
    marginBottom: 5,
    color: '#333',
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
    gap: 10,
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  updateButton: {
    backgroundColor: '#2196F3',
  },
  deleteButton: {
    backgroundColor: '#f44336',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  modalText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#333',
  },
});
