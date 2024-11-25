import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal, TextInput, Pressable, Alert } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from "@expo/vector-icons/Ionicons";

export default function MealPlan () {

  {/* Functions - recipe search window */}
  const [isWindowVisible, setWindowVisible] = useState(false);
  const openWindow = () => setWindowVisible(true);
  const closeWindow = () => {
    setWindowVisible(false);
  };

  return (
    <ScrollView>
      <SafeAreaView> 

        <View style={styles.header}>
          <Text style={styles.title}>Meal Plan</Text>
          <TouchableOpacity style={styles.addButton} onPress={openWindow}>
            <Ionicons name="add-outline" size={40} color="white"/>
          </TouchableOpacity>
        </View>

        {/* Recipe search window */}
        <Modal
          transparent={true}
          animationType="slide"
          visible={isWindowVisible}
          onRequestClose={closeWindow}
        >
          <View style={styles.windowContainer}>
            <View style={styles.windowHeader}>
              
              <View style={styles.searchBarContainer}>
                <TextInput
                  style={styles.searchBar}
                  placeholder="Search for recipes"
                  placeholderTextColor="gray"
                />
                <View style={styles.searchBarIcon}>
                  <Ionicons name="search" size={20} color="gray"/>
                </View>
              </View>

              <TouchableOpacity style={styles.closeButton} onPress={closeWindow}>
                <Ionicons name="close-outline" size={32} color="white"/>
              </TouchableOpacity>
            </View>

            <ScrollView>

            </ScrollView>
          </View>
        </Modal>

      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    marginTop: 30,
    marginLeft: 25,
    fontSize: 32,
    fontWeight: 700,
  },
  addButton: {
    marginTop: 25,
    marginRight: 25,
    height: 50,
    width: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ff8667",
  },
  windowContainer: {
    flex: 1,
    backgroundColor: "white",
  },
  windowHeader: {
    marginTop: 75,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  searchBarContainer: {
    marginLeft: 30,
    height: 40,
    width: "68%",
    borderRadius: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
  },
  searchBar: {
    marginHorizontal: 14,
    flex: 1,
    flexShrink: 1,
    fontSize: 16,
    backgroundColor: "#f0f0f0",
  },
  searchBarIcon: {
    marginRight: 14,
  },
  closeButton: {
    marginRight: 30,
    height: 40,
    width: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "gray",
  },
});
