import React, { useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    ScrollView,
    Vibration,
    ActivityIndicator
} from "react-native";
import CueMathLogo from "../CueMathLogo";
import PrimaryButton from "../Utilities/PrimaryButton";
import AsyncStorage from "@react-native-async-storage/async-storage";

const requiredFields = [
    { key: "email", placeholder: "Email ID", keyboardType: "email-address" },
    { key: "password", placeholder: "Password", secureTextEntry: true },
];

export default function LogInScreen(props) {
    const { navigation } = props;

    const [userData, setUserData] = useState({
        email: "",
        password: "",
    });

    const [isLoading, setIsLoading] = useState(false)

    const handleInputChange = (field, value) => {
        setUserData({
            ...userData,
            [field]: value,
        });
    };

    const handleLogin = async () => {
        if (userData.email === "" || userData.password === "") {
            alert("Please fill in all fields");
            return;
        }

        try {
            setIsLoading(true)
            const userDataString = await AsyncStorage.getItem("userData");
            if (userDataString) {
                const userDataFromStorage = JSON.parse(userDataString);
                if (
                    userDataFromStorage.email === userData.email &&
                    userDataFromStorage.password === userData.password
                ) {
                    setIsLoading(false)
                    navigation.replace("Home");
                    // alert("Login Successful");
                    setUserData({ email: "", password: "" });
                } else {
                    setIsLoading(false)
                    alert("Incorrect email or password");
                }
            } else {
                setIsLoading(false)
                alert("User does not exist. Please sign up.");
            }
        } catch (error) {
            setIsLoading(false)
            console.error("Error", error);
            alert("Error logging in. Please try again.");
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <CueMathLogo />
            {
                isLoading &&  <ActivityIndicator />
            }
           
            <View style={styles.form}>
                {requiredFields.map((field) => (
                    <TextInput
                        key={field.key}
                        style={styles.input}
                        placeholder={field.placeholder}
                        keyboardType={field.keyboardType}
                        secureTextEntry={field.secureTextEntry}
                        onChangeText={(text) => handleInputChange(field.key, text)}
                        placeholderTextColor="#808080"
                    />
                ))}
            </View>
            <View style={styles.buttonContainer}>
                <PrimaryButton title="Login" onPress={handleLogin} />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: "black",
        paddingHorizontal: 30,
        paddingVertical: 110,
    },
    form: {
        marginBottom: 40,
        marginTop: 60,
        fontFamily: 'athletic',
    },
    input: {
        height: 60,
        borderColor: "#808080",
        borderWidth: 1,
        marginBottom: 20,
        paddingHorizontal: 10,
        color: "#808080",
        borderRadius: 10,
        fontFamily: 'athletic',
    },
    buttonContainer: {
        flex: 1,
        justifyContent: "flex-end",
    },
});
