import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import PantryItem from '@/components/PantryItem';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function Pantry () {
  return (
    <ScrollView>
      <SafeAreaView>

        <View style={styles.header}>
          <Text style={styles.title}>Pantry</Text>
          <TouchableOpacity style={styles.addButton}>
            <Ionicons name="add-outline" size={40} color="white"/>
          </TouchableOpacity>
        </View>

        <Text style={styles.category}>MEAT, POULTRY & SEAFOOD</Text>
        <View style={styles.line}></View>
        <PantryItem
          name="Ingredient1"
          quantity={14}
          unit="lbs"
        />
        <View style={styles.line}></View>
        <PantryItem
          name="Ingredient2"
          quantity={10}
          unit="lbs"
        />
        <View style={styles.line}></View>
        <PantryItem
          name="Ingredient3"
          quantity={10}
          unit="lbs"
        />
        <View style={styles.line}></View>
        <PantryItem
          name="Ingredient4"
          quantity={10}
          unit="lbs"
        />

        <Text style={styles.category}>FRESH PRODUCE</Text>
        <View style={styles.line}></View>
        <PantryItem
          name="Ingredient5"
          quantity={10}
          unit="lbs"
        />
        <View style={styles.line}></View>
        <PantryItem
          name="Ingredient6"
          quantity={10}
          unit="lbs"
        />
        <View style={styles.line}></View>
        <PantryItem
          name="Ingredient7"
          quantity={10}
          unit="lbs"
        />
        <View style={styles.line}></View>
        <PantryItem
          name="Ingredient8"
          quantity={10}
          unit="lbs"
        />
         
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    marginTop: 25,
    marginLeft: 25,
    fontSize: 32,
    fontWeight: 700,
  },
  addButton: {
    marginTop: 25,
    marginRight: 25,
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ff8667',
  },
  category: {
    marginTop: 30,
    marginBottom: 10,
    marginLeft: 25,
    color: 'gray',
    fontWeight: 600,
  },
  line: {
    borderBottomWidth: 1,
    borderColor: 'lightgray',
  },
});
