// import React from 'react';
import React, { useState } from 'react';
import { View, Text, Button, Image, StyleSheet, Pressable, Dimensions } from 'react-native';

export default function BemVindoScreen({ navigation }) {

  const [currentDay, setCurrentDay] = useState('');

  // Função para obter o dia da semana atual
  const getCurrentDay = () => {
    const daysOfWeek = [
      'Domingo',
      'Segunda-feira',
      'Terça-feira',
      'Quarta-feira',
      'Quinta-feira',
      'Sexta-feira',
      'Sábado',
    ];

    const currentDate = new Date();
    const dayIndex = currentDate.getDay(); // Pega o índice do dia da semana (0 - Domingo, 1 - Segunda, etc.)
    setCurrentDay(daysOfWeek[dayIndex]);
  };

      // Chama getCurrentDay na inicialização da tela
  React.useEffect(() => {
    getCurrentDay();
  }, []);


  return (
    <View style={styles.container}>
      {/* Banner de Imagem */}
      <Pressable style={styles.settingsButton} onPress={() => navigation.navigate('Configuracoes')}>
        {/* <Icon name="cog" size={24} color="#000" /> */}
        <Text style={styles.conf}>⚙️</Text>
      </Pressable>
      <Image 
        // source={{ uri: 'https://www.example.com/banner.jpg' }} // URL da imagem do banner (você pode alterar)
        source={require('./img/banner.png')} 
        style={styles.banner}
        resizeMode="cover"
      />

      {/* Texto de Bem-Vindo */}
      <Text style={styles.welcomeText}>Bem-vindo ao Cardápio do Refeitório do IFC campus videira!</Text>
      <Text style={styles.texto}>Escolha uma opção abaixo:</Text>
      {/* Botões */}
      <View style={styles.buttonContainer}>
        {/* <Button
          title="Cardápio de Hoje"
          onPress={() => navigation.navigate('CardapioDia')}
        /> */}


        <Button
          title="Cardápio do Dia"
          onPress={() => navigation.navigate('CardapioDia', { dia: currentDay })}
        />
        
        <Button
          title="Cardápio da Semana"
          onPress={() => navigation.navigate('CardapioSemanal')}
        />
        <Button
          title="Informações do Restaurante"
          onPress={() => navigation.navigate('Sobre')}
        />
      </View>
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
  banner: {
    // width: Dimensions.get('window').width, // Largura total da tela
    width: 400,
    height: 105, // Altura fixa (pode ser ajustada conforme a imagem)
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 50,
    marginTop: 150,
    textAlign: 'center',
    color: "black"
  },
  texto: {
    fontSize: 15,
    marginBottom: 30,
    marginTop: 10,
    textAlign: 'center',
    color: "black"
  },
  buttonContainer: {
    width: '100%',
    justifyContent: 'space-between',
    height: 150, // Espaçamento entre os botões
  },
  settingsButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  conf: {
    position: 'absolute',
    top: 10,
    right: 10,
    fontSize: 30
  },
});
