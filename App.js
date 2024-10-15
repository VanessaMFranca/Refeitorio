// import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
// import LoginScreen from './screens/LoginScreen';
// import BemVindoScreen from './screens/BemVindoScreen';
// import CardapioSemanalScreen from './screens/CardapioSemanalScreen';
// import CardapioDiaScreen from './screens/CardapioDiaScreen';
// import ConfiguracoesScreen from './screens/ConfiguracoesScreen';
// import SobreScreen from './screens/SobreScreen';
// import SplashScreen from './screens/SplashScreen';
// import AlterarCardapioDia from './screens/AlterarCardapioDia';

// const Stack = createStackNavigator();

// export default function App() {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator initialRouteName="SplashScreen">
//         <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
//         <Stack.Screen name="BemVindo" component={BemVindoScreen} options={{ headerShown: false }}/>
//         <Stack.Screen name="CardapioSemanal" component={CardapioSemanalScreen} options={{ title: 'Cardápio Semanal' }}/>
//         <Stack.Screen name="CardapioDia" component={CardapioDiaScreen} options={{ title: 'Cardápio do dia' }} />
//         <Stack.Screen name="Configuracoes" component={ConfiguracoesScreen} options={{ title: 'Canfigurações' }} />
//         <Stack.Screen name="Sobre" component={SobreScreen} />
//         <Stack.Screen name="SplashScreen" component={SplashScreen} options={{ headerShown: false }}/>
//         <Stack.Screen name="AlterarCardapioDia" component={AlterarCardapioDia}options={{ title: 'Alterar Cardápio do dia' }} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }

import React from 'react';
import { Text, View } from 'react-native';

const App = () => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Autieruss</Text>
    </View>
  );
};

export default App;