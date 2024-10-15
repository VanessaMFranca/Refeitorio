import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import SQLite from 'react-native-sqlite-storage';

// Configurações do banco de dados
SQLite.enablePromise(true);

// Função para abrir o banco de dados
const getDatabaseConnection = async () => {
  return SQLite.openDatabase(
    { name: 'menuDB.db', location: 'default' },
    () => console.log('Banco de dados aberto'),
    (error) => console.log('Erro ao abrir o banco de dados:', error)
  );
};

export default function AlterarCardapioDiaScreen({ navigation, route }) {
  const { dia } = route.params; // Receber o dia clicado na tela anterior
  const [descricao, setDescricao] = useState('');

  // Função para carregar o cardápio atual do banco de dados
  const loadCardapioDia = async () => {
    const db = await getDatabaseConnection();

    db.transaction((tx) => {
      tx.executeSql(
        'SELECT descricao FROM cardapio WHERE dia = ?;',
        [dia],
        (tx, results) => {
          if (results.rows.length > 0) {
            setDescricao(results.rows.item(0).descricao); // Preencher o campo com a descrição atual
          }
        },
        (tx, error) => console.log('Erro ao carregar cardápio:', error)
      );
    });
  };

  // Função para salvar as alterações no cardápio do dia
  const saveCardapioDia = async () => {
    const db = await getDatabaseConnection();

    db.transaction((tx) => {
      tx.executeSql(
        'UPDATE cardapio SET descricao = ? WHERE dia = ?;',
        [descricao, dia],
        () => {
          console.log(`Cardápio de ${dia} atualizado!`);
          navigation.goBack(); // Voltar para a tela anterior após salvar
        },
        (tx, error) => console.log('Erro ao salvar cardápio:', error)
      );
    });
  };

  useEffect(() => {
    loadCardapioDia(); // Carregar o cardápio atual ao abrir a tela
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Alterar Cardápio - {dia}</Text>

      <TextInput
        style={styles.input}
        value={descricao}
        onChangeText={setDescricao}
        placeholder="Digite os novos itens do cardápio"
        placeholderTextColor="#000000"
        multiline
      />

      <Button title="Salvar Alterações" onPress={saveCardapioDia} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: 'black',
  },
  input: {
    height: 150,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginBottom: 20,
    textAlignVertical: 'top',
    color: 'black',
  },
});
