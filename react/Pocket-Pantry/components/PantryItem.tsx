import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'

type PantryProps = {
    name: string
    quantity: number
}

const PantryItem = (props: PantryProps) => {
  return (
    <TouchableOpacity style={styles.button}>


        <View style={styles.container}>
            <Text style={styles.nameText}>{props.name}</Text>
            <Text style={styles.quantityText}>{props.quantity}</Text>
        </View>


    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    button: {
        paddingVertical: 10
    },
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    nameText: {
        marginLeft: 20,
        fontSize: 20,
        color: 'gray'
    },
    quantityText: {
        marginRight: 20,
        fontSize: 20,
        color: 'gray'
    }
});

export default PantryItem