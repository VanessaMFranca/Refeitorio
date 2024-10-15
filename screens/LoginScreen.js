import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import SQLite from 'react-native-sqlite-storage';

// Configurações do banco de dados
SQLite.DEBUG(true); // Habilitar logs para depuração
SQLite.enablePromise(true); // Utilizar promessas

// Função para abrir o banco de dados
const getDatabaseConnection = async () => {
  return SQLite.openDatabase(
    { name: 'userdb.db', location: 'default' },
    () => console.log('Banco de dados aberto'),
    (error) => console.log('Erro ao abrir o banco de dados:', error)
  );
};

export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Função para criar tabela e inserir um usuário padrão
  const initializeDatabase = async () => {
    const db = await getDatabaseConnection();

    db.transaction((tx) => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS user (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT UNIQUE, password TEXT);',
        [],
        () => console.log('Tabela criada'),
        (tx, error) => console.log('Erro ao criar tabela', error)
      );
      tx.executeSql(
        'INSERT OR IGNORE INTO user (username, password) VALUES (?, ?);',
        ['A', '1'],
        () => console.log('Usuário padrão inserido'),
        (tx, error) => console.log('Erro ao inserir usuário padrão', error)
      );
    });
  };

  // Função para verificar o login
  const handleLogin = async () => {
    const db = await getDatabaseConnection();

    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM user WHERE username = ? AND password = ?;',
        [username, password],
        (tx, results) => {
          if (results.rows.length > 0) {
            navigation.navigate('BemVindo');
          } else {
            Alert.alert('Erro de login', 'Usuário ou senha incorretos');
          }
        },
        (tx, error) => console.log('Erro ao verificar login', error)
      );
    });
  };

  // Inicializar o banco de dados ao carregar a tela
  useEffect(() => {
    initializeDatabase();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        placeholder="Usuário"
        placeholderTextColor="gray"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
      />
      <TextInput
        placeholder="Senha"
        placeholderTextColor="gray"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <Button title="Entrar" onPress={handleLogin} />
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
    marginBottom: 16,
    textAlign: 'center',
    color: "black"
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingLeft: 8,
    color: "black"
  },
});
