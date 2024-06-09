import React, { useRef, useEffect } from "react";
import { View, StyleSheet, TouchableOpacity, Text, Pressable } from "react-native";
import LottieView from "lottie-react-native";

const MyLottieAnimation = (props) => {

    const { source, onPress, index, playAnimation } = props;

    const animationRef = useRef(null);

    useEffect(() => {
        // console.log("playAnimation",playAnimation)
        if ( index === 1) {
            const playAnimationToBeAdded = playAnimation == 66 ? 34 : 33
            animationRef.current.play(playAnimation, playAnimation + playAnimationToBeAdded);
        }
    }, [playAnimation]);

    return (
        <>
            <Pressable onPress={() => onPress(index)} style={styles.animationContainer}>
                <LottieView
                    source={source}
                    autoPlay={index !== 1}
                    loop={index !== 1}
                    // autoPlay={true}
                    // loop={true}
                    style={styles.lottie}
                    ref={animationRef}
                />
            </Pressable>

        </>
    );
};

const styles = StyleSheet.create({
    animationContainer: {
        alignItems: "center",
    },
    lottie: {
        width: 400,
        height: 400,
    },
    lottieText: {
        color: "white",
        fontSize: 15,
        marginTop: 10,
        textAlign: "center",
    },
});

export default MyLottieAnimation;
