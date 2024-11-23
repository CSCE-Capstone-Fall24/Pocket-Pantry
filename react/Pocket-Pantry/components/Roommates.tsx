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

const API_URL = process.env["EXPO_PUBLIC_API_URL"];

export default function Roommates() {
  const { userData, setUserData } = useUserContext();
  const [dropdownState, setDropdownState] = useState(true);
  const [isAddRoommateModalVisible, setAddRoommateModalVisible] = useState(false);
  const [newRoommate, setNewRoommate] = useState('');

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
      setAddRoommateModalVisible(false);
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
          <TouchableOpacity onPress={refreshRoommates}>
            <Text style={styles.refreshText}>Refresh</Text>
          </TouchableOpacity>
          <Text style={styles.dropdownToggle}>{dropdownState ? '-' : '+'}</Text>
        </View>
      </TouchableOpacity>

      {/* Dropdown Content */}
      {dropdownState && (
        <View style={styles.dropdownContent}>
          {userData?.roommates && userData.roommates.length > 0 ? (
            userData.roommates.map((roommate: any, index: number) => (
              <View key={index} style={styles.roommateItem}>
                <Text style={styles.roommateName}>ID: {roommate.roommate_id}, User: {roommate.username}</Text>
                <Text style={styles.status}>
                  {roommate.is_reciprocated ? '✅ Added Back' : '❌ Not Added Back'}
                </Text>
                <TouchableOpacity
                  style={styles.removeButton}
                  onPress={() => handleRemoveRoommate(roommate.roommate_id)}
                >
                  <Text style={styles.removeButtonText}>Remove</Text>
                </TouchableOpacity>
              </View>
            ))
          ) : (
            <Text style={styles.dropdownItem}>No roommates found</Text>
          )}

          {/* Add Roommate Button */}
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => setAddRoommateModalVisible(true)}
          >
            <Text style={styles.addButtonText}>+ Add Roommate</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Add Roommate Modal */}
      <Modal
        animationType="slide"
        transparent
        visible={isAddRoommateModalVisible}
        onRequestClose={() => setAddRoommateModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add Roommate</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter roommate username or ID"
              value={newRoommate}
              onChangeText={setNewRoommate}
            />
            <View style={styles.modalButtons}>
              <Button title="Cancel" onPress={() => setAddRoommateModalVisible(false)} />
              <Button title="Add" onPress={handleAddRoommate} />
            </View>
          </View>
        </View>
      </Modal>
    </View>
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
    addButtonText: {
      color: 'white',
      fontSize: 16,
      fontWeight: '600',
    },
    modalOverlay: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
      width: '80%',
      backgroundColor: 'white',
      borderRadius: 10,
      padding: 20,
      alignItems: 'center',
    },
    modalTitle: {
      fontSize: 20,
      fontWeight: '600',
      marginBottom: 15,
    },
    input: {
      width: '100%',
      borderWidth: 1,
      borderColor: 'lightgray',
      borderRadius: 5,
      padding: 10,
      marginBottom: 15,
    },
    modalButtons: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
    },
    roommateItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 10,
        marginBottom: 5,
        backgroundColor: '#f8f9fa',
        borderRadius: 8,
      },
      roommateName: {
        fontSize: 16,
        fontWeight: '600',
      },
      status: {
        fontSize: 14,
        color: '#6c757d',
        textAlign: 'right',
        flex: 1,
        marginRight: 20
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
  });
