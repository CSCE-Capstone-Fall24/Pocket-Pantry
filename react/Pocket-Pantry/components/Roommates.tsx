import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
  Button,
  Alert,
} from 'react-native';
import { useUserContext } from '@/components/contexts/UserContext';
import Ionicons from "@expo/vector-icons/Ionicons";

const API_URL = process.env["EXPO_PUBLIC_API_URL"];

export default function Roommates() {
  const { userData, setUserData } = useUserContext();
  const [dropdownState, setDropdownState] = useState(true);
  const [newRoommate, setNewRoommate] = useState('');

  const [isWindowVisible, setWindowVisible] = useState(false);
  const openWindow = () => setWindowVisible(true);
  const closeWindow = () => setWindowVisible(false);

  const toggleDropdown = () => {
    setDropdownState(!dropdownState);
  };

  const handleAddRoommate = async () => {
    try {
      const response = await fetch(`${API_URL}/add_roommate/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: userData?.user_id,
          roommate_id: newRoommate,
        }),
      });

      if (!response.ok) throw new Error('Failed to add roommate');

      const data = await response.json();
      setUserData((prevData: any) => ({
        ...prevData,
        roommates: data.updated_roommates,
      }));

      alert('Success, Roommate added successfully!');
      setNewRoommate('');
      closeWindow();
    } catch (error) {
      console.error(error);
      alert('Error, Could not add roommate. Please check their ID and try again.');
    }
  };

  const handleRemoveRoommate = async (roommateId: number) => {
    alert("trying to remove roommate");
    try {
      const response = await fetch(`${API_URL}/remove_roommate/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: userData?.user_id,
          roommate_id: roommateId,
        }),
      });

      // console.log(response);
      if (!response.ok) throw new Error('Failed to remove roommate');

      const updatedRoommates = await response.json();
      setUserData((prevData: any) => ({
        ...prevData,
        roommates: updatedRoommates.updated_roommates,
      }));

      alert('Success, Roommate removed successfully!');
    } catch (error) {
      console.error(error);
      alert('Error, Could not remove roommate. Please try again.');
    }
  };

  const refreshRoommates = async () => {
    try {
      const response = await fetch(`${API_URL}/get_roommates/?user_id=${userData?.user_id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) throw new Error('Failed to fetch roommates');

      const data = await response.json();
      setUserData((prevData: any) => ({
        ...prevData,
        roommates: data.roommates,
      }));

      Alert.alert('Success', 'Roommates updated!');
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Could not refresh roommates. Please try again.');
    }
  };

  return (
    <View style={styles.dropdownContainer}>
      {/* Dropdown Header */}
      <TouchableOpacity style={styles.dropdownHeader} onPress={toggleDropdown}>
        <Text style={styles.dropdownTitle}>Roommates</Text>
        <View style={styles.dropdownActions}>
          
          <Text style={styles.dropdownToggle}>{dropdownState ? '-' : '+'}</Text>
        </View>
      </TouchableOpacity>

      {/* Dropdown Content */}
      {dropdownState && (
        <View style={styles.dropdownContent}>
          {userData?.roommates && userData.roommates.length > 0 ? (
            userData.roommates.map((roommate: any, index: number) => (
              <View key={index} style={styles.roommateItem}>

                <View>
                  <Text style={styles.text}>Username: {roommate.username}</Text>
                  <Text style={styles.text}>User ID: {roommate.roommate_id}</Text>
                
                  {roommate.is_reciprocated 
                    ? (
                      <View style={styles.rowAlignment}>
                        <Text style={styles.text}>Added back </Text>
                        <Ionicons name="ellipse" size={25} color="#55ff55"/>
                      </View>           
                    ) 
                    : (
                      <View style={styles.rowAlignment}>
                        <Text style={styles.text}>Not added back </Text>
                        <Ionicons name="ellipse" size={25} color="#ff5555"/>
                      </View>           
                    )
                  }
                </View>

                <TouchableOpacity onPress={() => handleRemoveRoommate(roommate.roommate_id)}>
                  <Ionicons name="trash" size={32} color="#ff5555"/>
                </TouchableOpacity>
              </View>
            ))
          ) : (
            <Text style={styles.dropdownItem}>No roommates found</Text>
          )}

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.addRoommateButton} onPress={openWindow}>
              <Text style={styles.addRoommateButtonText}>+ Add Roommate</Text>
            </TouchableOpacity>  
            <TouchableOpacity onPress={refreshRoommates}>
              <Ionicons name="refresh" size={40} color="gray"/>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* Add roommate window */}
      <Modal
        transparent={true}
        animationType="slide"
        visible={isWindowVisible}
        onRequestClose={closeWindow}
      >
        <View style={styles.windowContainer}>
          <Text style={styles.windowTitle}>ADD ROOMMATE</Text>
          
          {/* New roommate input */}
          <TextInput
            style={styles.inputContainer}
            placeholder="Enter roommate ID"
            value={newRoommate}
            onChangeText={setNewRoommate}
          />

          {/* Cancel/save new password */}
          <View style={styles.buttonAlignment}>
            <TouchableOpacity style={styles.cancelButton} onPress={closeWindow}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.addButton} onPress={handleAddRoommate}>
              <Text style={styles.addButtonText}>Add</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  rowAlignment: {
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    fontSize: 16,
  },
  dropdownContainer: {
    marginHorizontal: 25,
  },
  dropdownHeader: {
    marginTop: 25,
    borderBottomWidth: 1,
    borderColor: 'lightgray',
    paddingBottom: 13,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dropdownTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  dropdownActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dropdownToggle: {
    fontSize: 25,
  },
  dropdownContent: {
    paddingVertical: 10,
  },
  dropdownItem: {
    fontSize: 16,
    paddingVertical: 5,
  },
  roommateItem: {
    marginTop: 15,
    borderRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "black",
    backgroundColor: "white", 
  },
  status: {
    fontSize: 14,
    color: '#6c757d',
  },
  removeButton: {
    backgroundColor: '#dc3545',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  removeButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  addRoommateButton: {
    marginRight: 15,
    height: 50,
    flex: 1,
    flexShrink: 1,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ff8667",
  },
  addRoommateButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  buttonContainer: {
    marginTop: 15,
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: "space-between",
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
  addButton: {
    height: 50,
    width: 100,
    borderRadius: 8,
    paddingVertical: 12,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ff8667",
  },
  addButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
});
