import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Modal, 
  TextInput, 
  Button, 
  Alert 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useUserContext } from '@/components/contexts/UserContext';
import Roommates from '@/components/Roommates';
import FavoritedRecipes from '@/components/FavoriteRecipes';
import Ionicons from '@expo/vector-icons/Ionicons';

const API_URL = process.env["EXPO_PUBLIC_API_URL"];

export default function Profile() {
  const { userData, setUserData } = useUserContext();

  const [isPasswordModalVisible, setPasswordModalVisible] = useState(false);
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
      setPasswordModalVisible(false);
      setCurrentPassword('');
      setNewPassword('');
    } catch (error: any) {
      console.error(error);
      Alert.alert('Error', error.message || 'Could not reset password.');
    }
  };
  


  return (
    <ScrollView>
      <SafeAreaView>
        {/* Header */}
        <View style={styles.header}>
          <Ionicons style={styles.title} name="person" color="#ff8667" />
          <Text style={styles.title}>Your Profile</Text>
        </View>

        {/* Username */}
        <View style={styles.section}>
          <Text style={styles.label}>Username <Text style={styles.value}>{userData?.username || 'N/A'}</Text></Text>
          <Text style={styles.label}>User ID <Text style={styles.value}>{userData?.user_id || 'N/A'}</Text></Text>

          <TouchableOpacity
            style={styles.resetButton}
            onPress={() => setPasswordModalVisible(true)}
          >
            <Text style={styles.buttonText}>Change Password</Text>
          </TouchableOpacity>  
        </View>

        <Roommates/>

        <FavoritedRecipes/>

        <Modal
          animationType="slide"
          transparent
          visible={isPasswordModalVisible}
          onRequestClose={() => setPasswordModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Reset Password</Text>
              
              {/* Current Password Input */}
              <TextInput
                style={styles.input}
                placeholder="Current Password"
                secureTextEntry
                value={currentPassword}
                onChangeText={setCurrentPassword}
              />

              {/* New Password Input */}
              <TextInput
                style={styles.input}
                placeholder="New Password"
                secureTextEntry
                value={newPassword}
                onChangeText={setNewPassword}
              />

              {/* Modal Buttons */}
              <View style={styles.modalButtons}>
                <Button title="Cancel" onPress={() => setPasswordModalVisible(false)} />
                <Button title="Submit" onPress={handlePasswordChange} />
              </View>
            </View>
          </View>
        </Modal>



      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  section: {
    padding: 15,
    marginHorizontal: 25,
    marginVertical: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    // borderWidth: 1,
    // borderColor: '#e0e0e0',
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.1,
    // shadowRadius: 4,
    // elevation: 2, // For Android shadow
  },
  label: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  value: {
    fontSize: 24,
    color: '#555',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  title: {
    marginTop: 25,
    marginLeft: 25,
    fontSize: 32,
    fontWeight: '700',
  },
  dropdownContainer: {
    marginBottom: 10,
    marginHorizontal: 25,
  },
  dropdownHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderColor: 'lightgray',
  },
  dropdownTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  dropdownActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  refreshText: {
    marginRight: 15,
    fontSize: 16,
    color: '#ff8667',
  },
  dropdownToggle: {
    fontSize: 18,
    fontWeight: '600',
  },
  dropdownContent: {
    paddingVertical: 10,
  },
  dropdownItem: {
    fontSize: 16,
    paddingVertical: 5,
  },
  addButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#ff8667',
    borderRadius: 5,
    alignItems: 'center',
  },  
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '85%',
    padding: 20,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 15,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  resetButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#ff8667',
    borderRadius: 5,
    alignItems: 'center',
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  }
});