import React, { useEffect, useState, useRef } from "react";
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    Dimensions,
    BackHandler,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MyLottieAnimation from "../Utilities/MyLottieAnimation";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { MaterialIcons } from "@expo/vector-icons";
import Carousel from "react-native-reanimated-carousel";
import { WebView } from "react-native-webview";
import NavBar from "../NavBar";
import BottomSheetBar from "../BottomSheetBar";
import { lottieFiles, lottieTexts } from '../Utilities/Constants.js'


const { width, height } = Dimensions.get("window");



const Home = ({ navigation }) => {
    const [mainState, setMainState] = useState({
        userLoggedIn: false,
        userData: {
            name: "",
            age: "",
            email: "",
        },
        playAnimation: 0,
    });
    const [sheetIndex, setSheetIndex] = useState(0);
    const [activeIndex, setActiveIndex] = useState(0);
    const [showWebView, setShowWebView] = useState(false);

    const sheetRef = useRef(null);
    const carouselRef = useRef(null);

    useEffect(() => {
        getUserDetails();

    }, []);

    useEffect(() => {
        const backAction = () => {
            // console.log("log", mainState.userLoggedIn)
            if (mainState.userLoggedIn) {
                return true;
            } else {
                return false;
            }
        };

        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
        );

        return () => backHandler.remove();
    }, [mainState.userLoggedIn]);

    const getUserDetails = async () => {
        try {
            const userDataString = await AsyncStorage.getItem("userData");
            if (userDataString) {
                const userData = JSON.parse(userDataString);
                setMainState((prevState) => ({
                    ...prevState,
                    userLoggedIn: true,
                    userData,
                }));
            }
        } catch (error) {
            console.error("Error fetching user details:", error);
        }
    };

    const handleLogOut = async () => {
        try {
            await AsyncStorage.removeItem("userData");
            navigation.navigate("FirstScreen");
        } catch (error) {
            console.error("Error logging out:", error);
        }
    };

    const handlePress = (index) => {
        if (index === 1) {
            if (mainState?.playAnimation >= 99) {
                setMainState((prevState) => ({
                    ...prevState,
                    playAnimation: 0
                }));
                return
            }
            setMainState((prevState) => ({
                ...prevState,
                playAnimation: prevState.playAnimation + 33
            }));
        } else if (index === 0) {
            sheetRef.current?.expand();
        } else if (index === 2) {
            setShowWebView(true);
        }
    };

    const handleSheetChanges = (index) => {
        setSheetIndex(index);
    };

    const CustomHandle = () => (
        <View style={styles.customHandleContainer}>
            <MaterialIcons
                name={sheetIndex === 0 ? "keyboard-arrow-up" : "keyboard-arrow-down"}
                size={24}
                color="white"
            />
            <Text style={{ color: "white" }}>Bottom Sheet</Text>
        </View>
    );

    const renderPagination = () => (
        <>
            <View style={styles.paginationContainer}>
                {lottieFiles.map((_, index) => (
                    <View
                        key={index}
                        style={[
                            styles.paginationDot,
                            { opacity: index === activeIndex ? 1 : 0.3 },
                        ]}
                    />
                ))}
            </View>
            <View style={styles.lottieTextContainer}>

                <Text style={styles.lottieText}>
                    {lottieTexts[activeIndex]}
                </Text>

            </View>
        </>
    );

    const customHTML = `
    <!DOCTYPE html>
    <html>
    <head>
        <title>USER DETAILS</title>
        <style>
            body {
                background-color: black;
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100vh;
                margin: 0;
                color: white;
            }
            .container {
                text-align: center;
                padding : 0 10rem;
            }
            .container p {
                font-size :3rem;
                line-height:2cm;
            }
            button {
                margin-top: 20px;
                background-color : black;
                padding:40px 50px;
                border:1.5px solid white;
                font-size : 50px;
                color:white;
                border-radius:2rem;
            }
            .name_class{
                color:#FFBA07;
                font-weight:bold;
            }
            .age_class{
                color:#ED6CEF;
                font-weight:bold;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <p>This is a webview, launched by <span
            class="name_class">${mainState.userData.name}</span>. They are <span class="age_class">${mainState.userData.age} yrs</span> old.</p>
            <button onclick="goBackToHomePage()">Back to Home</button>
        </div>
        <script>
            function goBackToHomePage() {
                window.ReactNativeWebView.postMessage("goBackToHomePage");
            }
        </script>
    </body>
    </html>
`;

    const handleWebViewMessage = (event) => {
        if (event.nativeEvent.data === "goBackToHomePage") {
            navigation.navigate("Home");
            setShowWebView(false)
            setActiveIndex(0)
        }
    };


    return (
        <>
            {showWebView ? (
                <WebView
                    originWhitelist={["*"]}
                    source={{ html: customHTML }}
                    style={{ flex: 1 }}
                    onMessage={handleWebViewMessage}
                />
            ) : (
                <GestureHandlerRootView style={{ flex: 1 }}>
                    <View style={styles.container}>
                        <NavBar
                            styles={styles}
                            mainState={mainState}
                            handleLogOut={handleLogOut}
                        />

                        <View style={styles.carouselContainer}>
                            <Carousel
                                ref={carouselRef}
                                width={width}
                                height={height * 0.6}
                                data={lottieFiles}
                                renderItem={({ item, index }) => (
                                    <View style={styles.slide}>
                                        <MyLottieAnimation
                                            source={item}
                                            index={index}
                                            onPress={handlePress}
                                            playAnimation={mainState.playAnimation}
                                        />
                                    </View>
                                )}
                                onSnapToItem={(index) => setActiveIndex(index)}
                                loop={false}
                            />
                        </View>

                        {renderPagination()}
                    </View>

                    <BottomSheetBar
                        handleSheetChanges={handleSheetChanges}
                        sheetRef={sheetRef}
                        sheetIndex={sheetIndex}
                        styles={styles}
                        CustomHandle={CustomHandle}
                    />
                </GestureHandlerRootView>
            )}
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "black",
        flex: 1,
    },
    navContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginTop: 50,
    },
    userContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    avatar: {
        width: 40,
        height: 40,
    },
    emailText: {
        color: "white",
        fontSize: 15,
        marginLeft: 10,
    },
    logoutText: {
        color: "white",
        fontSize: 15,
    },
    carouselContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    slide: {
        width: width,
        justifyContent: "center",
        alignItems: "center",
    },
    paginationContainer: {
        position: "absolute",
        bottom: 400,
        width: "100%",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    paginationDot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: "#fff",
        marginHorizontal: 5,
    },
    sheetText: {
        fontSize: 28,
        color: "white",
        textAlign: "center",
    },
    handleIndicator: {
        backgroundColor: "grey",
        width: 40,
        height: 6,
        borderRadius: 3,
        alignSelf: "center",
        marginVertical: 10,
    },
    customHandleContainer: {
        alignItems: "center",
        paddingTop: 10,
    },
    lottieText: {
        color: "white",
        fontSize: 25,
        textAlign: "center",
    },
    lottieTextContainer: {
        position: "absolute",
        bottom: 300,
        width: "100%",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 50,
    },
});

export default Home;
