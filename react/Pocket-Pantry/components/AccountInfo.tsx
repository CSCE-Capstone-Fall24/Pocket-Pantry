import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'

type AccountProps = {
    name: string
    password: string
}

const AccountInfo = (props: AccountProps) => {
  return (
    <TouchableOpacity style={styles.button}>


        <View style={styles.container}>
            <Text style={styles.nameText}>{props.name}</Text>
            <Text style={styles.quantityText}>{props.password}</Text>
        </View>


    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    button: {
        paddingVertical: 10,
    },
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    nameText: {
        paddingLeft: 25,
        fontSize: 20,
        color: 'gray'
    },
    quantityText: {
        paddingRight: 25,
        fontSize: 20,
        color: 'gray'
    }
});

export default AccountInfo