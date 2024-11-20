import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'

type FavoritedRecipesProps = {
    FavoritedRecipes: string
}

const FavoritedRecipes = (props: FavoritedRecipesProps) => {
  return (
    <TouchableOpacity style={styles.button}>


        <View style={styles.container}>
            <Text style={styles.quantityText}>{props.FavoritedRecipes}</Text>
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

export default FavoritedRecipes