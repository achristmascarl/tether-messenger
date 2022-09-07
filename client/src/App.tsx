import { registerRootComponent } from 'expo';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeView from './views/WelcomeView';
import ChatView from './views/ChatView';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Welcome" component={WelcomeView}/>
        <Stack.Screen name="Chat" component={ChatView}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

registerRootComponent(App);
