import { StyleSheet, Text, View,TouchableOpacity, Pressable } from "react-native";

export default function PrimaryButton(props) {
    const { title, onPress,margin } = props;
    return (
        
            <Pressable
                style={{
                    backgroundColor: "white",
                    paddingHorizontal: 45,
                    paddingVertical: 15,
                    borderRadius: 10,
                    margin: margin ? margin : 0,
                }}
                onPress={onPress}
            >
                <Text
                    style={{ color: "black", fontSize: 20, textAlign: "center" }}
                   
                >
                    {title}
                </Text>
            </Pressable>
        
    );
}

