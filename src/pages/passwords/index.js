import {View, Text, StyleSheet, FlatList, Animated } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import {useState, useEffect, useRef} from 'react'
import { useIsFocused } from '@react-navigation/native'
import useStorage from '../../hooks/useStorage'
import {PasswordItem} from './components/passwordItem'
import React from 'react'

export function Passwords() {
    const [listPasswords, setListPasswords] = useState([])
    const focused = useIsFocused()
    const {getItem, removeItem} = useStorage()

    const animationValues = useRef([]).current

    useEffect(() => {
        async function loadPasswords(){
            const passwords = await getItem("@pass")
            setListPasswords(passwords)

            animateItems(passwords.length)
        }

        loadPasswords()
    }, [focused])

    function animateItems(count) {
        animationValues.length = count
        animationValues.forEach((_, index) => {
            Animated.timing(animationValues[index], {
                toValue: 1,
                duration: 500,
                delay: index * 500,
                useNativeDriver: true,
            }).start()
        })
    }

    async function handleDeletePassword(item){
        const passwords = await removeItem("@pass", item)
        setListPasswords(passwords)
    }

    function renderPasswordItem({ item, index }) {
        if (!animationValues[index]) {
            animationValues[index] = new Animated.Value(0)
        }

        return (
            <Animated.View
                style={{
                    opacity: animationValues[index],
                    transform: [
                        {
                            translateY: animationValues[index].interpolate({
                                inputRange: [0, 1],
                                outputRange: [30, 0],
                            }),
                        },
                    ],
                }}
            >
                <PasswordItem
                    data={item}
                    removePassword={() => handleDeletePassword(item)}
                />
            </Animated.View>
        )
    }

    return (
        <SafeAreaView style={{flex: 1, }}>
            <View style={styles.header}>
                <Text style={styles.title}>Lyan Kaleu 🧑‍💻</Text>
                <Text style={styles.subtitle}>Minhas senhas</Text>
            </View>

            <View style={styles.content}>
                <FlatList
                style={{flex: 1, paddingTop: 14}}
                    data={listPasswords}
                    keyExtractor={ (item) => String(item)}
                    renderItem={renderPasswordItem}
                />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    header:{
        backgroundColor: "#392de9",
        paddingTop: 58,
        paddingBottom: 14,
        paddingLeft: 14,
        paddingRight: 14,
        alignItems: "center",
    },
    title:{
        fontSize: 26,
        color: "#FFF",
        fontWeight: 'bold'
    },
    subtitle:{
        fontSize: 18,
        color: "#FFF",
        fontWeight: 'bold',
        marginTop: 20,
    },
    content:{
        flex: 1,
        paddingLeft: 14,
        paddingRight: 14,
        flexDirection: 'row',
        backgroundColor: "lightblue",
    },
})