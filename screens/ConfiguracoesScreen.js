import React, { useState } from 'react';
import { View, Text, Switch, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function ConfiguracoesScreen() {
  const navigation = useNavigation();
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Função para alternar o modo claro/escuro
  const toggleSwitch = () => setIsDarkMode(previousState => !previousState);

  // Função para navegar para a tela Sobre
  const goToSobre = () => {
    navigation.navigate('Sobre');
  };

  // Função para fazer logout
  const handleLogout = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Configurações</Text>

      {/* Sobre */}
      <View style={styles.option}>
        <Button title="Sobre" onPress={goToSobre} />
      </View>

      {/* Modo Claro/Escuro */}
      <View style={styles.option}>
        <Text style={styles.text}>Modo Claro/Escuro</Text>
        <Switch
          value={isDarkMode}
          onValueChange={toggleSwitch}
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={isDarkMode ? '#f5dd4b' : '#f4f3f4'}
        />
      </View>

      {/* Logout */}
      <View style={styles.option}>
        <Button title="Logout" onPress={handleLogout} />
      </View>
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
    textAlign: 'center',
    marginBottom: 40,
    color: "black"
  },
  option: {
    marginBottom: 20,
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
    color: "black"
  },
});
