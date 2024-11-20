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
        FavoritedRecipes="FavoritedRecipes"
      />
      <AccountInfo
        name="User"
        password="ThisGuy"
      />
      <Notifications
        notifications="notifications"
      />
      <About
        about="About"
      />
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
  }
});

