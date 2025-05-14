import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import Editar from './Editar';
import Delete from './Delete';

const Exiba = ({ usuarios, atualizarLista }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Usuários</Text>

      <FlatList
        data={usuarios}
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
              <Editar
                id={item._id}
                name={item.name}
                email={item.email}
                idade={item.idade}
                atualizarLista={atualizarLista}
              />
              <Delete id={item._id} atualizarLista={atualizarLista} />
            </View>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Nenhum usuário cadastrado</Text>
        }
      />
    </View>
  );
};

export default Exiba;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  card: {
    backgroundColor: '#f9f8b7',
    padding: 15,
    marginBottom: 15,
    borderRadius: 10,
    elevation: 2,
    borderColor: 'black',
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
    gap: 10,
    marginTop: 10,
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
    marginTop: 20,
    fontStyle: 'italic',
  },
});
