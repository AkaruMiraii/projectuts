import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./screens/HomeScreen";
import Ionicons from "@react-native-vector-icons/ionicons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import FavoritesScreen from "./screens/FavoritesScreen";

const Stack = createNativeStackNavigator();
const Root = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const MainTab = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="home-outline" size={24} color={'#795548'} />
          ),
        }}
      />
      <Tab.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="heart-outline" size={24} color={'#795548'} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Root.Navigator initialRouteName="MainTab">
        <Root.Screen name="MainTab" component={MainTab} options={{headerShown: false}} />
        <Root.Screen
          name="Login"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
      </Root.Navigator>
    </NavigationContainer>
  );
};

export default App;