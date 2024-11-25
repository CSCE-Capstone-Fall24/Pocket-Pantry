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

export default function FavoritedRecipes() {
  const { userData, setUserData } = useUserContext();
  const [dropdownState, setDropdownState] = useState(false);

  const toggleDropdown = () => {
    setDropdownState(!dropdownState);
  };

  const handleRemoveFavorite = async (recipeId: string) => {
    try {
      const response = await fetch(`${API_URL}/remove_favorite_recipe`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: userData?.user_id,
          recipe_id: recipeId,
        }),
      });

      if (!response.ok) throw new Error('Failed to remove favorite');

      const data = await response.json();
      setUserData((prevData: any) => ({
        ...prevData,
        favorite_recipes: data.updated_favorites,
      }));

      Alert.alert('Success', 'Recipe removed from favorites!');
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Could not remove recipe. Please try again.');
    }
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
                  onPress={() => handleRemoveFavorite(recipe.id)}
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
  dropdownToggle: {
    fontSize: 18,
    fontWeight: '600',
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
