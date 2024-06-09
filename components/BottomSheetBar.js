import { Image, Text, View, TouchableOpacity } from 'react-native';

import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";

export default function BottomSheetBar(props) {

    const { handleSheetChanges, sheetRef, styles, CustomHandle, sheetIndex } = props
    return (
        <BottomSheet
            ref={sheetRef}
            snapPoints={["8%", "100%"]}
            onChange={handleSheetChanges}
            backgroundStyle={{
                backgroundColor: sheetIndex === 0 ? "#2B2B2B" : "black",
                borderColor: sheetIndex === 0 ? "white" : "black",
                borderWidth: 1,
                borderRadius: 80
            }}
            handleIndicatorStyle={styles.handleIndicator}
            handleComponent={CustomHandle}
        >
            <BottomSheetView
                style={{
                    padding: 50,
                    backgroundColor: sheetIndex === 0 ? "#2B2B2B" : "black",
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Text style={styles.sheetText}>This is a bottom sheet, launched by tapping the lottie or swiping up</Text>
            </BottomSheetView>
        </BottomSheet>
    );
}

