import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Button,
} from 'react-native';
import { useUserContext } from '@/components/contexts/UserContext';

const API_URL = process.env["EXPO_PUBLIC_API_URL"];

export const handleAddFavorite = async (user_id: string, recipeId: string, setUserData: any) => {
  try {
    const response = await fetch(`${API_URL}/add_favorite_recipe/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id,
        recipe_id: recipeId,
      }),
    });

    if (!response.ok) throw new Error('Failed to add favorite recipe');

    const data = await response.json();
    setUserData((prevData: any) => ({
      ...prevData,
      favorite_recipes: data.updated_favorites,
    }));

    Alert.alert('Success', 'Recipe added to favorites!');
    return { success: true };
  } catch (error) {
    console.error(error);
    Alert.alert('Error', 'Failed to add recipe to favorites. Please try again.');
    return { success: false };
  }
};

export const handleRemoveFavorite = async (user_id: string, recipeId: string, setUserData: any) => {
  try {
    const response = await fetch(`${API_URL}/remove_favorite_recipe`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id,
        recipe_id: recipeId,
      }),
    });

    if (!response.ok) throw new Error('Failed to remove favorite recipe');

    const data = await response.json();
    setUserData((prevData: any) => ({
      ...prevData,
      favorite_recipes: data.updated_favorites,
    }));

    Alert.alert('Success', 'Recipe removed from favorites!');
    return { success: true };
  } catch (error) {
    console.error(error);
    Alert.alert('Error', 'Failed to remove recipe from favorites. Please try again.');
    return { success: false };
  }
};

export default function FavoritedRecipes() {
  const { userData, setUserData } = useUserContext();
  const [dropdownState, setDropdownState] = useState(false);

  const toggleDropdown = () => {
    setDropdownState(!dropdownState);
  };

  return (
    <View style={styles.dropdownContainer}>
      <TouchableOpacity style={styles.dropdownHeader} onPress={toggleDropdown}>
        <Text style={styles.dropdownTitle}>Favorited Recipes</Text>
        <Text style={styles.dropdownToggle}>{dropdownState ? '-' : '+'}</Text>
      </TouchableOpacity>

      {dropdownState && (
        <View style={styles.dropdownContent}>
          {userData?.favorite_recipes && userData.favorite_recipes.length > 0 ? (
            userData.favorite_recipes.map((recipe: any, index: number) => (
              <View key={index} style={styles.recipeItem}>
                <Text style={styles.recipeName}>{recipe.name}</Text>
                <Button
                  title="Remove"
                  onPress={() => handleRemoveFavorite(userData.user_id, recipe.id, setUserData)}
                />
              </View>
            ))
          ) : (
            <Text style={styles.noItemsText}>No favorite recipes found</Text>
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
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
  dropdownToggle: {
    fontSize: 25,
  },
  dropdownContent: {
    paddingVertical: 10,
  },
  recipeItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 5,
  },
  recipeName: {
    fontSize: 16,
  },
  noItemsText: {
    fontSize: 16,
    color: '#6c757d',
  },
});
