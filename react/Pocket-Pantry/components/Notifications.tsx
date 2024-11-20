import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'

type NotificationProps = {
    notifications: string
}

const Notifications = (props: NotificationProps) => {
  return (
    <TouchableOpacity style={styles.button}>


        <View style={styles.container}>
            <Text style={styles.nameText}>{props.notifications}</Text>
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

export default Notifications