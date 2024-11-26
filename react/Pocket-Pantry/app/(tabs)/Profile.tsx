import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal, TextInput, Button, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useUserContext } from '@/components/contexts/UserContext';
import Roommates from '@/components/Roommates';
import FavoritedRecipes from '@/components/FavoriteRecipes';
import Ionicons from '@expo/vector-icons/Ionicons';

const API_URL = process.env["EXPO_PUBLIC_API_URL"];

export default function Profile() {
  const { userData, setUserData } = useUserContext();

  const [isWindowVisible, setWindowVisible] = useState(false);
  const openWindow = () => setWindowVisible(true);
  const closeWindow = () => setWindowVisible(false);

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [dropdownState, setDropdownState] = useState({
    roommates: false,
    favoriteRecipes: false,
    cookedRecipes: false,
  });

  const handlePasswordChange = async () => {
    if (!currentPassword || !newPassword) {
      Alert.alert('Error', 'Both fields are required.');
      return;
    }
  
    try {
      const response = await fetch(`${API_URL}/reset_pass`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: userData?.user_id,
          old_pass: currentPassword,
          new_pass: newPassword,
        }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        // throw new Error(errorData.detail || 'Failed to reset password');
        alert("Incorrect password!")
      }
  
      const result = await response.json();
      alert('Success, ' + result.message);
      closeWindow();
      setCurrentPassword('');
      setNewPassword('');
    } catch (error: any) {
      console.error(error);
      Alert.alert('Error', error.message || 'Could not reset password.');
    }
  };
  
  return (
    <View style={styles.container}> 
      <Text style={styles.title}>Profile</Text>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

        {/* Username/ID */}
        <View style={styles.userContainer}>
          <Text style={styles.userText}>Username: {userData?.username || 'N/A'}   </Text>
          <Text style={styles.userText}>User ID: {userData?.user_id || 'N/A'}</Text>
        </View>

        <TouchableOpacity style={styles.changePasswordButton} onPress={openWindow}>
          <Text style={styles.changePasswordButtonText}>Change Password</Text>
        </TouchableOpacity>  

        <Roommates/>

        <FavoritedRecipes/>

        <Modal
          transparent={true}
          animationType="slide"
          visible={isWindowVisible}
          onRequestClose={closeWindow}
        >
          <View style={styles.windowContainer}>
            <Text style={styles.windowTitle}>RESET PASSWORD</Text>
            
            {/* Current password input */}
            <TextInput
              style={styles.inputContainer}
              placeholder="Current Password"
              secureTextEntry
              value={currentPassword}
              onChangeText={setCurrentPassword}
            />

            {/* New password input */}
            <TextInput
              style={styles.inputContainer}
              placeholder="New Password"
              secureTextEntry
              value={newPassword}
              onChangeText={setNewPassword}
            />

            {/* Cancel/save new password */}
            <View style={styles.buttonAlignment}>
              <TouchableOpacity style={styles.cancelButton} onPress={closeWindow}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.saveButton} onPress={handlePasswordChange}>
                <Text style={styles.saveButtonText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </ScrollView>
   </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    marginTop: 80,
    marginLeft: 25,
    fontSize: 32,
    fontWeight: 700,
  },
  userContainer: {
    marginTop: 25,
    marginHorizontal: 25,
    height: 52,
    borderRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
    shadowColor: "black",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white", 
  },
  userText: {
    fontSize: 24,
  },
  changePasswordButton: {
    marginTop: 15,
    marginHorizontal: 25,
    height: 50,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ff8667",
  },
  changePasswordButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  windowContainer: {
    flex: 1,
    padding: 25,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  windowTitle: {
    marginBottom: 20,
    fontSize: 24,
    fontWeight: 600,
  },
  inputContainer: {
    marginBottom: 15,
    height: 50,
    width: "100%",
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "lightgray",
    paddingHorizontal: 15,
    fontSize: 16,
  },
  buttonAlignment: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  cancelButton: {
    marginRight: 35,
    height: 50,
    width: 100,
    borderWidth: 2,
    borderRadius: 8,
    borderColor: "#ff8667",
    paddingVertical: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#ff8667",
  },
  saveButton: {
    height: 50,
    width: 100,
    borderRadius: 8,
    paddingVertical: 12,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ff8667",
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
});