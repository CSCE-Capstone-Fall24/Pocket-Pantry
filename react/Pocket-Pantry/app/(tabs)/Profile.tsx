import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FavoritedRecipes from '@/components/FavoritedRecipes';
import AccountInfo from '@/components/AccountInfo';
import Notifications from '@/components/Notifications';
import About from '@/components/About';
import Feedback from '@/components/Feedback';

export default function Profile () {

  return (
    <SafeAreaView>
      
      <Text style={styles.header}>
        Profile
      </Text>
      
      <FavoritedRecipes
        FavoritedRecipes="Favorited Recipes"
      />
      <View style={styles.line}></View>
      <AccountInfo
        name="User"
        username="ThisGuy"
        userId={74781}
      />
      <View style={styles.line}></View>
      <Notifications
        notifications="Notifications"
      />
      <View style={styles.line}></View>
      <About
        about="About"
        aboutText="Pocket Pantry is a product designed for college students to help them manage..."
      />
      <View style={styles.line}></View>
      <Feedback
        feedback="Feedback"
      />
        
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    marginLeft: 25,
    marginVertical: 25,
    fontSize: 32,
    fontWeight: 700,
  },
  line: {
    borderBottomWidth: 1,
    borderColor: 'lightgray'
  }
});
