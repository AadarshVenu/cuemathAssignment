import React from "react";
import { StyleSheet, Text, View, Button, Vibration } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import CueMathLogo from "../CueMathLogo";
import PrimaryButton from "../Utilities/PrimaryButton";
import SecondaryButton from "../Utilities/SecondaryButton";

const Stack = createStackNavigator();

const HomePage = (props) => {
    const { navigation } = props;
    const onPressSignUp = () => {
        Vibration.vibrate(1000);
        navigation.navigate("SignUp");
    };

    const onPressLogIn = () => {
        Vibration.vibrate(1000);
        navigation.navigate("LogIn");
    };

    return (
        <View style={styles.container}>
            <CueMathLogo />

            <View style={styles.buttonContainer}>
                <PrimaryButton
                    title="Signup"
                    onPress={onPressSignUp}
                    margin={10}
                />
                <SecondaryButton
                    title="Login"
                    onPress={onPressLogIn}
                    margin={10}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "black",
        alignItems: "center",
        justifyContent: "center",
    },
    buttonContainer: {
        flexDirection: "row",
        marginTop: 20,
        justifyContent: "space-around",
        alignItems: "center",
    },
});

export default HomePage;
