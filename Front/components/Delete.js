import React, { useState } from 'react';
import { TouchableOpacity, Text, StyleSheet, Modal, View } from 'react-native';

const Delete = ({ id, atualizarLista }) => {
  const [confirmVisible, setConfirmVisible] = useState(false);
  const [feedbackVisible, setFeedbackVisible] = useState(false);
  const [mensagem, setMensagem] = useState('');

  const handleConfirmDelete = () => {
    fetch(`http://192.168.1.124:3000/delete/${id}`, {
      method: 'DELETE',
    })
      .then(res => res.json())
      .then(() => {
        setMensagem('Usuário excluído com sucesso ✅');
        atualizarLista();
      })
      .catch(() => {
        setMensagem('Erro ao excluir usuário ❌');
      })
      .finally(() => {
        setConfirmVisible(false);
        setFeedbackVisible(true);
        setTimeout(() => setFeedbackVisible(false), 3000);
      });
  };

  return (
    <>
      {/* Botão de excluir */}
      <TouchableOpacity style={styles.button} onPress={() => setConfirmVisible(true)}>
        <Text style={styles.buttonText}>Excluir</Text>
      </TouchableOpacity>

      {/* Modal de confirmação */}
      <Modal
        transparent={true}
        animationType="fade"
        visible={confirmVisible}
        onRequestClose={() => setConfirmVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Tem certeza que deseja excluir este usuário?</Text>
            <View style={styles.modalActions}>
              <TouchableOpacity style={styles.cancelButton} onPress={() => setConfirmVisible(false)}>
                <Text style={styles.modalButtonText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.confirmButton} onPress={handleConfirmDelete}>
                <Text style={styles.modalButtonText}>Sim, excluir</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Modal de feedback */}
      <Modal
        transparent={true}
        animationType="fade"
        visible={feedbackVisible}
        onRequestClose={() => setFeedbackVisible(false)}
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

export default Delete;

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#f44336',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
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
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 15,
  },
  confirmButton: {
    backgroundColor: '#d32f2f',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
  },
  cancelButton: {
    backgroundColor: '#9e9e9e',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
  },
  modalButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
