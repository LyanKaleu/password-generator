import React, { useState } from "react";
import { StyleSheet, Pressable, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { TextInput } from "react-native-gesture-handler";
import { View } from "react-native";

export function PasswordItem({ data, removePassword }) {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false)

    return (
        <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
            <Pressable style={styles.container}>
                <TextInput
                    style={styles.text}
                    value={data}
                    secureTextEntry={!isPasswordVisible}
                    editable={false}
                />
                <Pressable onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
                    <MaterialIcons
                        name={isPasswordVisible ? "visibility-off" : "visibility"}
                        size={24}
                        color={"white"}
                    />
                </Pressable>
            </Pressable>

            <TouchableOpacity style={styles.removeButton} onPress={removePassword}>
                <MaterialIcons
                    name='delete'
                    color={"#FFF"}
                    size={24}
                />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: "#0E0E0E",
        padding: 14,
        flex: 1,
        marginBottom: 14,
        borderRadius: 8,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    text:{
        color: "#FFF",
        flex: 1,
        marginRight: 10,
        fontSize: 16,
    },
    removeButton: {
        backgroundColor: 'red',
        padding: 14,
        borderRadius: 8,
        marginLeft: 10,
        marginBottom: 14,
        alignItems: 'center'
    }
})