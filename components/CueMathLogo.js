import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function CueMathLogo() {
    return (
        <View>
            <View style={styles.container}>
                <Text style={styles.textColor}>CUEMATH</Text>
                <Text style={styles.textColorGo}>Go!</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    textColor: {
        color: 'white',
        fontSize: 50,
        fontWeight: 'bold',
        fontFamily: 'athletic',
    },
    textColorGo: {
        color: '#FFBA07',
        fontSize: 50,
        marginLeft: 5,
        fontWeight: 'bold',
        fontFamily: 'athletic',
    },
});
