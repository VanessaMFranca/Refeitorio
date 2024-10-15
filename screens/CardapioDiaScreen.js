import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, FlatList } from 'react-native';
import SQLite from 'react-native-sqlite-storage';

// Função para abrir o banco de dados
const getDatabaseConnection = async () => {
  return SQLite.openDatabase(
    { name: 'menuDB.db', location: 'default' },
    () => console.log('Banco de dados aberto'),
    (error) => console.log('Erro ao abrir o banco de dados:', error)
  );
};

export default function CardapioDiaScreen({ navigation, route }) {
  const { dia } = route.params; // Receber o dia clicado na tela anterior
  const [descricao, setDescricao] = useState('');
  const [itensCardapio, setItensCardapio] = useState([]);

  // Função para carregar o cardápio do dia específico
  const loadCardapioDia = async () => {
    const db = await getDatabaseConnection();

    db.transaction((tx) => {
      tx.executeSql(
        'SELECT descricao FROM cardapio WHERE dia = ?;',
        [dia],
        (tx, results) => {
          if (results.rows.length > 0) {
            const descricao = results.rows.item(0).descricao;
            setDescricao(descricao);

            // Separar os itens da descrição por vírgula e atualizar a lista
            const itens = descricao.split(',').map((item) => item.trim());
            setItensCardapio(itens);
          }
        },
        (tx, error) => console.log('Erro ao carregar cardápio do dia:', error)
      );
    });
  };

  useEffect(() => {
    loadCardapioDia();
  }, []);

  // Renderizar os itens do cardápio em uma lista
  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemText}>{item}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{dia}</Text>
      
      {/* Exibe a lista de itens do cardápio, um por linha */}
      <FlatList
        data={itensCardapio}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={<Text style={styles.emptyText}>Nenhum item encontrado.</Text>}
      />

      {/* Botão para alterar o cardápio do dia */}
      <Button
        title="Alterar Cardápio do Dia"
        onPress={() => navigation.navigate('AlterarCardapioDia', { dia: dia })}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: "black",
  },
  itemContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  itemText: {
    fontSize: 18,
    color: 'black',
  },
  emptyText: {
    fontSize: 18,
    color: 'black',
    marginTop: 20,
  }
});
