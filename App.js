import React, { useState, useCallback } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import FirstScreen from "./components/Screens/FirstScreen";
import SignUpScreen from "./components/Screens/SignUpScreen";
import LogInScreen from "./components/Screens/LogInScreen";
import Home from "./components/Screens/Home";
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';


const Stack = createStackNavigator();

export default function App() {
    const [fontsLoaded, fontError] = useFonts({
        'athletic': require('./assets/fonts/Athletics Light.otf'),
    });

    const onLayoutRootView = useCallback(async () => {
        if (fontsLoaded || fontError) {
            await SplashScreen.hideAsync();
        }
    }, [fontsLoaded, fontError]);

    if (!fontsLoaded && !fontError) {
        return null;
    }

    return (
        <NavigationContainer
            onLayout={onLayoutRootView}
        >
            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                }}
            >
                <Stack.Screen
                    name="FirstScreen"
                    component={FirstScreen}
                    options={{ title: "Home" }}
                />
                <Stack.Screen
                    name="SignUp"
                    component={SignUpScreen}
                    options={{ title: "Sign Up" }}
                />
                <Stack.Screen
                    name="LogIn"
                    component={LogInScreen}
                    options={{ title: "Log In" }}
                />
                <Stack.Screen
                    name="Home"
                    component={Home}
                    options={{ title: "Home" }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
