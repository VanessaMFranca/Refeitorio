import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function SobreScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sobre</Text>
      <Text style={styles.text}>
        Este é um aplicativo para gerenciamento de cardápios de refeitório.
        Desenvolvido para facilitar o acesso ao cardápio diário e semanal, além de
        fornecer configurações personalizáveis.
      </Text>
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
    color: "black"
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
    color: "black"
  },
});
