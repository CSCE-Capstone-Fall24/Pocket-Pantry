import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Modal } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import RecipeItem from "./RecipeItem";

type Roommate = {
  id: string; 
  name: string; 
  isReciprocal: boolean;
};

type MealProps = {
  meal_id: string;
  user_id: string; // PLANNER, not necessarily 
  recipe_id: string;
  n_servings: number;
  is_shared: boolean;
  shared_with: Number[];
  expiration: Date;
  recipe: any; // lol
  recip_rms: Roommate[]
};

const MealItem = (props: MealProps) => {
  const { recipe_id, n_servings, is_shared, shared_with, expiration, recipe, recip_rms } = props;

  const [isModalVisible, setModalVisible] = useState(false);

  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  return (
    <>
      <TouchableOpacity style={styles.container} onPress={openModal}> {/* ON PRESS OPEN MODAL OF RECIPE ITEM WITH EDIT=TRUE */}
        <View style={styles.textContainer}>
          {/* Meal Info */}
          <Text style={styles.recipeName}>{props.recipe.name}</Text>
          <Text style={styles.details}>Servings: {n_servings}</Text>
          <Text style={styles.details}>Expiration: {expiration.toLocaleDateString()}</Text>

          {/* Sharing Info */}
          {is_shared && (
            <Text style={styles.shared}>Shared with {shared_with.length} {shared_with.length === 1 ? "person" : "people"}</Text>
          )}
        </View>
      </TouchableOpacity>

      <Modal visible={isModalVisible} transparent={true} animationType="slide" onRequestClose={closeModal}>
      <View>
        <View>
          <RecipeItem
            id={recipe.id}
            name={recipe.name}
            description={recipe.description}
            servings={n_servings}
            nutrition={recipe.nutrition}
            cook_time={recipe.cook_time}
            cook_steps={recipe.cook_steps}
            ingredients={recipe.ingredients}
            ingredient_quantities={recipe.ingredient_quantities}
            ingredient_units={recipe.ingredient_units}
            editing={true}
            closeSearchWindow={() => null} // Assuming RecipeItem supports closing modal
            recip_roommates={recip_rms}
            user_id={Number(props.user_id)}
            shared_with={props.shared_with}
            close_guy={closeModal}
          />
        </View>
      </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 100,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 5,
    shadowColor: "black",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FFF",
    padding: 16,
  },
  textContainer: {
    flex: 1,
  },
  recipeName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  details: {
    fontSize: 14,
    color: "#555",
    marginBottom: 2,
  },
  shared: {
    fontSize: 14,
    color: "#2a9d8f",
    marginTop: 4,
  },
  iconContainer: {
    paddingLeft: 16,
  },
});

export default MealItem;