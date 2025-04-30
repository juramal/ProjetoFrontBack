import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, ScrollView, SafeAreaView, TextInput } from 'react-native';
import { useState, useEffect } from 'react';
import DadoExiba from './components/Exiba';
import { Modal, TouchableOpacity } from 'react-native';

export default function App() {
  const [campos, setCampos] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [idade, setIdade] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [mensagem, setMensagem] = useState('');

  
  useEffect(() => {
    fetch('http://10.68.153.71:3000/')
      .then(response => response.json())
      .then(data => {
        console.log('Usuários Exibidos:', data);
        setCampos(data);
      })
      .catch(error => console.error('Erro:', error));
  }, []);
  

  const addUser = () => {
    fetch('http://192.168.1.124:3000/add/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify({
        name: name,        
        email: email,
        idade: idade
      }),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Usuário adicionado:', data);
        setMensagem('Usuário adicionado com sucesso ✅');
        setModalVisible(true); // Mostra o modal
        setName('');
        setEmail('');
        setIdade('');
  
        // Oculta o modal após 3 segundos
        setTimeout(() => setModalVisible(false), 5000);
      })
      
      .catch(error => {
        console.error('Erro:', error);
        setMensagem('Erro ao adicionar usuário ❌');
        setModalVisible(true);
        setTimeout(() => setModalVisible(false), 5000);
      });
  };

  const Exibir = () => {
    fetch('http://192.168.1.124:3000/')
      .then(response => response.json())
      .then(data => {
        console.log('Usuários Exibidos:', data);
        setCampos(data);
      })
      .catch(error => console.error('Erro:', error));
  };

  const Atualizar = (id) => {
    fetch(`http://192.168.1.124:3000/update/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ name: 'xx' }),
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
    })
      .then(response => response.json())
      .then(data => console.log('Usuários Atualizados:', data))
      .catch(error => console.error('Erro:', error));
  };

  const Deletar = (id) => {
    fetch(`http://192.168.1.124:3000/delete/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
    })    
      .then(response => response.json())
      .then(data => {
        console.log('Usuário Deletado:', data);
        // Atualiza a lista após deletar
        setCampos(prevCampos => prevCampos.filter(user => user._id !== id));
        setCampos(novaLista); // Atualiza estado visivelmente
        setCampos(data);

        //
        fetch('http://192.168.1.124:3000/')
      .then(response => response.json())
      .then(data => {
        console.log('Usuários Exibidos:', data);
        setCampos(data);
      })
      .catch(error => console.error('Erro:', error));
      })
      .catch(error => console.error('Erro:', error));      
  };

  return (     
    //  Mudança: usamos SafeAreaView para proteger a interface em celulares com notch
    <SafeAreaView style={styles.safeArea}>
      {/*  Mudança: adicionamos ScrollView para rolagem em telas pequenas */}
      <ScrollView contentContainerStyle={styles.container}>     
      
        
        {/*  Mudança: adicionamos título com estilo profissional */}
        <Text style={styles.title}>Gerenciamento de Usuários</Text>

        {/*  Mudança: agrupamos os botões em um container com layout horizontal e espaçamento */}
        <View style={styles.buttonGroup}>

          {/* Formulário para adicionar novo usuário */}
        <Text style={styles.subTitle}>Novo Usuário</Text>

        <TextInput
          style={styles.input}
          placeholder="Nome"
          value={name}
          onChangeText={setName}
        />

        <TextInput
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />

        <TextInput
          style={styles.input}
          placeholder="Idade"
          keyboardType="numeric"
          value={idade}
          onChangeText={setIdade}
        />

        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalText}>{mensagem}</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text style={styles.modalClose}>Fechar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <TouchableOpacity style={styles.addButton} onPress={addUser}>
        <Text style={styles.buttonText}>Adicionar Usuário</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.showButton} onPress={Exibir}>
        <Text style={styles.buttonText}>Exibir Usuários</Text>
        </TouchableOpacity>
          
          
        </View>

        {/* Componente que lista os dados */}
        <DadoExiba campo={campos} />
        
        <StatusBar style="auto" />
      </ScrollView>
    </SafeAreaView>
  );
}

// Estilos
const styles = StyleSheet.create({
  addButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    marginBottom: 10,
  },
  
  showButton: {
    backgroundColor: '#2196F3',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
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
    marginBottom: 10,
    color: '#333',
    textAlign: 'center',
  },
  modalClose: {
    color: '#007BFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    height: 45,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  subTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 20,
    color: '#555',
    alignSelf: 'flex-start',
  },
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  container: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  buttonGroup: {
    width: '20%',
    gap: 10,    
    marginBottom: 20,
    flexDirection: 'column',
    alignItems: 'stretch',
  },
});
