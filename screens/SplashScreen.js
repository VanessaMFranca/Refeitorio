import React, { useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function SplashScreen() {
  const navigation = useNavigation();

  // Simula um tempo de carregamento e navega para a tela de Bem-vindo
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Login'); // Replace para que não seja possível voltar à SplashScreen
    }, 3000); // 3 segundos de splash

    // Limpa o timer quando o componente for desmontado
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image
        source={require('./img/logo.jpg')} // Substitua pelo caminho correto da sua imagem
        style={styles.logo}
        resizeMode="contain" // Ajusta a imagem para se adequar ao contêiner
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff', // Cor de fundo da SplashScreen
  },
  logo: {
    width: 200, // Tamanho da imagem
    height: 200,
  },
});
