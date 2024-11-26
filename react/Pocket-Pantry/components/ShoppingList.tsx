import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native'
import { BlurView } from 'expo-blur';
import Ionicons from '@expo/vector-icons/Ionicons';

type ListProps = {
    listId: string;
    userIds: string[];
};

const ShoppingList = (props: ListProps) => {}