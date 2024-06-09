import { StyleSheet, Text, View ,Pressable} from "react-native";

export default function SecondaryButton(props) {
    const { title, onPress, margin } = props;
    return (
        <>
         
            <Pressable
                style={{
                    backgroundColor: "black",
                    paddingHorizontal: 45,
                    paddingVertical: 15,
                    borderRadius: 10,
                    margin: margin ? margin : 0,
                    borderColor: "white",
                    borderWidth: 2,
                }}
                onPress={onPress}
            >
                <Text
                    style={{ color: "white", fontSize: 20, textAlign: "center" }}
                   
                >
                    {title}
                </Text>
            </Pressable>
        </>
    );
}

const styles = StyleSheet.create({
    textColor: {
        color: "white",
    },
});
