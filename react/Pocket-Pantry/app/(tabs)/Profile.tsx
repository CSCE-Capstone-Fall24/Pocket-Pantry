import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useUserContext } from '@/components/contexts/UserContext';

export default function Profile () {

  const { userData, setUserData } = useUserContext();

  return (
    <ScrollView>
      <SafeAreaView> 
        
        <Text style={styles.title}>
          {userData.user_id} {userData.email}
        </Text>
          
      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  title: {
    marginLeft: 25,
    marginVertical: 25,
    fontSize: 32,
    fontWeight: 700,
  }
});
