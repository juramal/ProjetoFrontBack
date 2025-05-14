import React, { useState } from 'react';
import { TouchableOpacity, Text, StyleSheet, Modal, View, TextInput } from 'react-native';

const Editar = ({ id, name, email, idade, atualizarLista }) => {
  const [editando, setEditando] = useState(false);
  const [nome, setNome] = useState(name);
  const [emailValue, setEmailValue] = useState(email);
  const [idadeValue, setIdadeValue] = useState(idade);
  const [modalVisible, setModalVisible] = useState(false);
  const [mensagem, setMensagem] = useState('');

  const iniciarEdicao = () => {
    setNome(name);
    setEmailValue(email);
    setIdadeValue(idade);
    setEditando(true);
  };

  const cancelar = () => {
    setEditando(false);
    setNome(name);
    setEmailValue(email);
    setIdadeValue(idade);
  };

  const handleUpdate = () => {
    fetch(`http://192.168.1.124:3000/update/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify({ name: nome, email: emailValue, idade: idadeValue }),
    })
      .then(res => res.json())
      .then(() => {
        setMensagem('Usuário atualizado com sucesso ✅');
        setModalVisible(true);
        atualizarLista();
        setEditando(false);
        setTimeout(() => setModalVisible(false), 3000);
      })
      .catch(() => {
        setMensagem('Erro ao atualizar usuário ❌');
        setModalVisible(true);
        setTimeout(() => setModalVisible(false), 3000);
      });
  };

  return (
    <>
      {editando ? (
        <View style={styles.form}>
          <TextInput                     
            placeholder="Nome"
            value={nome}
            onChangeText={setNome}
            style={styles.input}
          />
          <TextInput
            placeholder="Email"
            value={emailValue}
            onChangeText={setEmailValue}
            style={styles.input}
            keyboardType="email-address"
          />
          <TextInput
            placeholder="Idade"
            value={idadeValue}
            onChangeText={setIdadeValue}
            style={styles.input}
            keyboardType="numeric"
          />

          <View style={styles.actions}>
            <TouchableOpacity style={styles.cancelButton} onPress={cancelar}>
              <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.saveButton} onPress={handleUpdate}>
              <Text style={styles.buttonText}>Salvar</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <TouchableOpacity style={styles.editButton} onPress={iniciarEdicao}>
          <Text style={styles.buttonText}>Editar</Text>
        </TouchableOpacity>
      )}

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
    </>
  );
};

export default Editar;

const styles = StyleSheet.create({
  form: {
    backgroundColor: '#fffde7',
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
    width: '70%',
  },
  input: {
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 10,
    marginBottom: 8,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 8,
    marginTop: 5,
    flex: 1,
    marginLeft: 5,
  },
  cancelButton: {
    backgroundColor: '#9e9e9e',
    padding: 10,
    borderRadius: 8,
    marginTop: 5,
    flex: 1,
    marginRight: 5,
  },
  editButton: {
    backgroundColor: '#2196F3',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
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
