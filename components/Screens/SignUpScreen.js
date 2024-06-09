import React, { useState } from 'react';
import { View, TextInput, StyleSheet, ScrollView, Vibration,ActivityIndicator } from 'react-native';
import PrimaryButton from '../Utilities/PrimaryButton';
import CueMathLogo from '../CueMathLogo';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SignUpScreen(props) {
    const { navigation } = props;

    const requiredFields = [
        { key: 'email', placeholder: 'Email ID', keyboardType: 'email-address' },
        { key: 'password', placeholder: 'Password', secureTextEntry: true },
        { key: 'confirmPassword', placeholder: 'Confirm Password', secureTextEntry: true },
        { key: 'name', placeholder: 'First Name' },
        { key: 'age', placeholder: 'Age', keyboardType: 'numeric' },
    ];

    const [userData, setUserData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        name: '',
        age: ''
    });

    const [isLoading, setIsLoading] = useState(false)


    const handleInputChange = (field, value) => {
        setUserData({
            ...userData,
            [field]: value,
        });
    };

    const handleSignUp = async () => {
        if (userData.password !== userData.confirmPassword) {
            alert('Passwords do not match');
            return;
        }
        if (userData.password.length < 8) {
            alert('Password must be at least 8 characters long');
            return;
        }
        try {
            setIsLoading(true)
            const userDataString = await AsyncStorage.getItem('userData');

            if (userDataString) {
                const userDataArray = JSON.parse(userDataString)

                const tempArray = []
                tempArray.push(userDataArray)
                const userExists = tempArray.some(
                    (user) => user.email === userData.email
                );
                if (userExists) {
                    setIsLoading(false)
                    alert('User already exists. Please log in.');
                    return;
                }
            }

            await AsyncStorage.setItem('userData', JSON.stringify(userData));
            setIsLoading(false)
            alert('Sign Up Successful');

            navigation.replace("Home");

            setUserData({
                email: '',
                password: '',
                confirmPassword: '',
                name: '',
                age: ''
            });
        } catch (error) {
            setIsLoading(false)
            Vibration.vibrate(500);
            console.error('Error', error);
            alert('Error signing up. Please try again.');
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <CueMathLogo />
            {
                isLoading &&  <ActivityIndicator />
            }
            <View style={styles.form}>
                {requiredFields.map(({ key, placeholder, ...props }) => (
                    <TextInput
                        key={key}
                        style={styles.input}
                        value={userData[key]}
                        onChangeText={(value) => handleInputChange(key, value)}
                        placeholder={placeholder}
                        placeholderTextColor="#808080"
                        {...props}
                    />
                ))}
            </View>
            <View style={styles.buttonContainer}>
                <PrimaryButton title="Create Account" onPress={handleSignUp} />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: 'black',
        paddingHorizontal: 30,
        paddingVertical: 110,
    },
    form: {
        marginBottom: 40,
        marginTop: 60,
    },
    input: {
        height: 60,
        borderColor: "#808080",
        borderWidth: 1,
        marginBottom: 20,
        paddingHorizontal: 10,
        color: "#808080",
        borderRadius: 10
    },
    buttonContainer: {
        flex: 1,
        justifyContent: 'flex-end',
    },
});
