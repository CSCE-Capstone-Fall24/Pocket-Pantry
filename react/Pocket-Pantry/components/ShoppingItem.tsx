import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

type ShoppingProps = {
    id: string;
    name: string;
    unit: string;
    quantity: number;
};

const ShoppingItem = (props: ShoppingProps) => {
    return (
        <View style={styles.container}>
            <Text>{props.name}</Text>
            <Text>
                {props.quantity} {props.unit}
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
    },
});

export default ShoppingItem;
