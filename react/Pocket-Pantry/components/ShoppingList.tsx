import React from 'react';
import { View, StyleSheet } from 'react-native';
import ShoppingItem from '@/components/ShoppingItem'; // Import ShoppingItem

type ShoppingProps = {
    id: string;
    name: string;
    unit: string;
    quantity: number;
};

type ListProps = {
    listId: string;
    userIds: string[];
    shoppingItems: ShoppingProps[];
};

const ShoppingList = (props: ListProps) => {
    return (
        <View style={styles.container}>
            {props.shoppingItems.map((item) => (
                <ShoppingItem
                    key={item.id}
                    id={item.id}
                    name={item.name}
                    unit={item.unit}
                    quantity={item.quantity}
                />
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginVertical: 10,
    },
});

export default ShoppingList;
