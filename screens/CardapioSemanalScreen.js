import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
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

export default function CardapioSemanalScreen({ navigation }) {
  const [cardapios, setCardapios] = useState([]);

  // Função para inicializar o banco de dados e inserir o cardápio semanal
  const initializeDatabase = async () => {
    const db = await getDatabaseConnection();

    db.transaction((tx) => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS cardapio (id INTEGER PRIMARY KEY AUTOINCREMENT, dia TEXT UNIQUE, descricao TEXT);',
        [],
        () => console.log('Tabela criada'),
        (tx, error) => console.log('Erro ao criar tabela', error)
      );

      // Inserir o cardápio semanal (segunda a sábado)
      const dias = [
        { dia: 'Segunda-feira', descricao: 'Arroz, Feijão, Frango grelhado, Salada' },
        { dia: 'Terça-feira', descricao: 'Macarrão, Carne moída, Legumes' },
        { dia: 'Quarta-feira', descricao: 'Feijoada, Couve, Laranja' },
        { dia: 'Quinta-feira', descricao: 'Arroz, Feijão, Peixe, Salada' },
        { dia: 'Sexta-feira', descricao: 'Lasanha, Salada' },
        { dia: 'Sábado', descricao: 'Arroz, Feijão, Carne de panela, Legumes' },
      ];

      dias.forEach((item) => {
        tx.executeSql(
          'INSERT OR IGNORE INTO cardapio (dia, descricao) VALUES (?, ?);',
          [item.dia, item.descricao],
          () => console.log(`${item.dia} inserido no cardápio ou já existente`),
          (tx, error) => console.log('Erro ao inserir cardápio:', error)
        );
      });
      // dias.forEach((item) => {
      //   tx.executeSql(
      //     'INSERT OR IGNORE INTO cardapio (dia, descricao) VALUES (?, ?);',
      //     [item.dia, item.descricao],
      //     () => console.log(`${item.dia} inserido no cardápio`),
      //     (tx, error) => console.log('Erro ao inserir cardápio:', error)
      //   );
      // });
    });

    loadCardapios(); // Carregar os dados após a inserção
  };

  // Função para carregar o cardápio semanal do banco de dados
  const loadCardapios = async () => {
    const db = await getDatabaseConnection();

    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM cardapio;',
        [],
        (tx, results) => {
          let rows = results.rows.raw(); // Obter os dados diretamente
          setCardapios(rows);
        },
        (tx, error) => console.log('Erro ao carregar cardápio:', error)
      );
    });
  };

  useEffect(() => {
    initializeDatabase();
  }, []);

  // Renderizar cada item da lista de dias
  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('CardapioDia', { dia: item.dia })}>
      <Text style={styles.text}>{item.dia}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* <Text style={styles.title}>Cardápio Semanal</Text> */}
      <FlatList
        data={cardapios}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginVertical: 20,
    color: "black"
  },
  item: {
    padding: 15,
    backgroundColor: '#f8f8f8',
    marginBottom: 10,
    borderRadius: 8,
  },
  text: {
    fontSize: 18,
    color: "black"
  },
});
