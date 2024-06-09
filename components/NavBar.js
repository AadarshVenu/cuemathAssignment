import { Image, Text, View, TouchableOpacity } from 'react-native';

export default function NavBar({ styles, mainState, handleLogOut }) {
    return (
        <View style={styles.navContainer}>
            <View style={styles.userContainer}>
                <Image
                    source={require("../assets/Avatar.png")}
                    style={styles.avatar}
                />
                <Text style={styles.emailText}>{mainState.userData.email}</Text>
            </View>

            <TouchableOpacity onPress={handleLogOut}>
                <Text style={styles.logoutText}>Log Out</Text>
            </TouchableOpacity>
        </View>
    );
}

