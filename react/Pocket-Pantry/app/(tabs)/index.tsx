import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal, TextInput, Pressable, Alert } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { BlurView } from 'expo-blur';
import Ionicons from '@expo/vector-icons/Ionicons';
import DateTimePicker from '@react-native-community/datetimepicker';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import MealItem from '@/components/MealItem';

// export default function Meal () {
//   interface Meal {
//     id: string;
//     name: string;
//     servings: number;
//     date: Date;
//     shared: boolean[];
//     roommates: string[];
//     ingredients: string[];
//     ingredientUnits: string[];
//     ingredientQuantities: number[];
//     cookTime: number;
//     recipe: string;
//     deleteMeal?: (id: string) => void; // Optional property
//   }

//   // Hardcoded meals (for initial data)
//   const [meals, setMeals] = useState<Meal[]>([
//     { id: "1", name: "Meal1", servings: 1, date: new Date(),
//       shared: [false, false, false, false], roommates: ["Roommie 1", "Roommie 2", "Roommie 3", "Roommie 4"],
//       ingredients: ["apple", "orange", "tomato"], ingredientUnits: ["lbs", "oz", "purple"], ingredientQuantities: [1, 2, 3], 
//       cookTime: 15, recipe: "There is no recipe, figure it out yourself" },
//     { id: "2", name: "Meal2", servings: 2, date: new Date(),
//       shared: [false, false, false, false], roommates: ["Roommie 1", "Roommie 2", "Roommie 3", "Roommie 4"],
//       ingredients: ["apple", "orange", "tomato"], ingredientUnits: ["lbs", "oz", "purple"], ingredientQuantities: [1, 2, 3], 
//       cookTime: 15, recipe: "There is no recipe, figure it out yourself" },
//     { id: "3", name: "Meal3", servings: 3, date: new Date(),
//       shared: [false, false, false, false], roommates: ["Roommie 1", "Roommie 2", "Roommie 3", "Roommie 4"],
//       ingredients: ["apple", "orange", "tomato"], ingredientUnits: ["lbs", "oz", "purple"], ingredientQuantities: [1, 2, 3], 
//       cookTime: 15, recipe: "There is no recipe, figure it out yourself" },
//     { id: "4", name: "Meal4", servings: 4, date: new Date(),
//       shared: [false, false, false, false], roommates: ["Roommie 1", "Roommie 2", "Roommie 3", "Roommie 4"],
//       ingredients: ["apple", "orange", "tomato"], ingredientUnits: ["lbs", "oz", "purple"], ingredientQuantities: [1, 2, 3], 
//       cookTime: 15, recipe: "There is no recipe, figure it out yourself" }
//   ]);

//   // Planned meals state
//   const [plannedMeals, setPlannedMeals] = useState<Meal[]>([]);

//   {/* Functions - search meal window */}
//   const [isWindowVisible, setWindowVisible] = useState(false);
//   const openWindow = () => setWindowVisible(true);
//   const closeWindow = () => {
//     setWindowVisible(false);
//     setSearch('');
//     // Then we need to pull in recipes from database using meal-search algorithm
//   };

//   {/* Functions - search meal */}
//   const [newSearch, setSearch] = useState('');

//   {/* Functions - new meal name */}
//   const [newName, setNewName] = useState('');

//   {/* Functions - new meal servings */}
//   const [newServings, setNewServings] = useState('');

//   {/* Functions - new date to cook */}
//   const [newDate, setNewDate] = useState(new Date());
//   const [isDatePickerVisible, setDatePickerVisible] = useState(false);
//   const openDatePicker = () => setDatePickerVisible(true);
//   const closeDatePicker = () => setDatePickerVisible(false);

//   {/* Functions - set new meal as shared */}
//   const roommates = ["BrianG", "ConnorH", "NickC", "JacobM"];
//   const [newShared, setNewShared] = useState<boolean[]>([false, false, false, false]);
//   const sharedToggle = (index: number) => {
//     setNewShared((prevState) => {
//       const updatedState = [...prevState];
//       updatedState[index] = !updatedState[index];
//       return updatedState;
//     });
//   };

//   {/* Functions - add meal */}
//   const addMeal = () => {
//     if (isNaN(Number(newServings))) {
//       Alert.alert('Servings must be a number.');
//     } else if (newName && newServings && newDate && newShared) {
//       const newMeal: Meal = {
//         id: uuidv4(),
//         name: newName,
//         servings: Number(newServings),
//         date: newDate,
//         shared: newShared,
//         roommates: roommates,
//         ingredients: ['','','','',''],
//         ingredientUnits: ['','','','',''],
//         ingredientQuantities: [0,0,0,0,0],
//         cookTime: 0,
//         recipe: "",
//         deleteMeal: deleteMeal,
//       };
//       setMeals([...meals, newMeal]);
//       closeWindow();
//     } else {
//       Alert.alert('Please fill out all fields.');
//     }
//   };

//   {/* Functions - delete meal */}
//   const deleteMeal = (id: string) => {
//     setMeals((prevMeals) => prevMeals.filter(meal => meal.id !== id));
//   };

//   {/* Functions - date headers */}
//   // TODO:

//   return (
//     <ScrollView>
//       <SafeAreaView>
        
//         {/* Header */}
//         <View style={styles.header}>
          // <Text style={styles.title}>
          //   Meal Plan
          // </Text>
          // <Text style={styles.tempSubtitle}>
          //   (Frontend Branch) {/* This will need to be removed */}
          // </Text>
//           <TouchableOpacity style={styles.addButton} onPress={openWindow}>
//             <Ionicons name="add-outline" size={40} color="white" />
//           </TouchableOpacity>
//         </View>

//         {/* Recipe search window */}
//         <Modal
//           transparent={true}
//           animationType="slide"
//           visible={isWindowVisible}
//           onRequestClose={closeWindow}
//         >
//           <View style={[StyleSheet.absoluteFill, styles.blurOverlay]}>
//             <BlurView style={StyleSheet.absoluteFill} intensity={30} />
//           </View>
//           <View style={styles.windowContainer}>
//             <View style={styles.windowHeader}>
//               <View style={styles.searchBarContainer}>
//                 <TextInput
//                   style={styles.searchBar}
//                   placeholder="Search for recipes"
//                   placeholderTextColor="gray"
//                 />
//                 <View style={styles.searchBarIcon}>
//                   <Ionicons name="search" size={20} color="gray" />
//                 </View>
//               </View>
//               <TouchableOpacity style={styles.closeButton} onPress={closeWindow}>
//                 <Ionicons name="close-outline" size={32} color="white" />
//               </TouchableOpacity>
//             </View>

//             <ScrollView>
//               {/* Meal search results would go here */}
//               {meals.map((meal) => (
//               <View key={meal.id}>
//                 <MealItem
//                   id={meal.id}
//                   name={meal.name}
//                   servings={meal.servings}
//                   date={meal.date}
//                   shared={meal.shared}
//                   roommates={meal.roommates}
//                   ingredients={meal.ingredients}
//                   ingredientUnits={meal.ingredientUnits}
//                   ingredientQuantities={meal.ingredientQuantities}
//                   cookTime={meal.cookTime}
//                   recipe={meal.recipe}
//                   deleteMeal={deleteMeal}
//                 />
//               </View>
//             ))}
//             </ScrollView>
//           </View>
//         </Modal>

//         {/* Display planned meals */}
//         {plannedMeals.map((meal) => (
//           <View key={meal.id}>
//             <MealItem
//               id={meal.id}
//               name={meal.name}
//               servings={meal.servings}
//               date={meal.date}
//               shared={meal.shared}
//               roommates={meal.roommates}
//               ingredients={meal.ingredients}
//               ingredientUnits={meal.ingredientUnits}
//               ingredientQuantities={meal.ingredientQuantities}
//               cookTime={meal.cookTime}
//               recipe={meal.recipe}
//               deleteMeal={deleteMeal}
//             />
//           </View>
//         ))}
        
//       </SafeAreaView>
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   header: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//   },
//   title: {
//     marginTop: 30,
//     marginLeft: 25,
//     fontSize: 32,
//     fontWeight: "700",
//   },
  // tempSubtitle: { // This will need to be removed
  //   marginTop: 30,
  //   marginBottom: 10,
  //   marginLeft: 25,
  //   color: 'gray',
  //   fontWeight: 600,
  // },
//   blurOverlay: {
//     backgroundColor: `rgba(0, 0, 0, 0.1)`,
//   },
//   addButton: {
//     marginTop: 25,
//     marginRight: 25,
//     width: 50,
//     height: 50,
//     borderRadius: 25,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#ff8667",
//   },
//   windowHeader: {
//     marginTop: 75,
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//   },
//   searchBarContainer: {
//     marginLeft: 30,
//     height: 40,
//     width: "68%",
//     borderRadius: 20,
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     backgroundColor: "#f0f0f0",
//   },
//   searchBar: {
//     marginHorizontal: 14,
//     flex: 1,
//     flexShrink: 1,
//     fontSize: 16,
//     backgroundColor: "#f0f0f0",
//   },
//   searchBarIcon: {
//     marginRight: 14,
//   },
//   closeButton: {
//     marginRight: 30,
//     height: 40,
//     width: 40,
//     borderRadius: 20,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "gray",
//   },
//   windowContainer: {
//     marginHorizontal: 50,
//     borderRadius: 12,
//     padding: 35,
//     backgroundColor: "white",
//   },
// });

export default function MealPlan () {
  
  {/* Functions - recipe search window */}
  const [isWindowVisible, setWindowVisible] = useState(false);
  const openWindow = () => setWindowVisible(true);
  const closeWindow = () => {
    setWindowVisible(false);
  };

  return (
    <ScrollView>
      <SafeAreaView> 

        <View style={styles.header}>
          <Text style={styles.title}>
            Meal Plan
          </Text>
          <Text style={styles.tempSubtitle}>
            (Frontend Branch) {/* This will need to be removed */}
          </Text>
          <TouchableOpacity style={styles.addButton} onPress={openWindow}>
            <Ionicons name="add-outline" size={40} color="white"/>
          </TouchableOpacity>
        </View>

        {/* Recipe search window */}
        <Modal
          transparent={true}
          animationType="slide"
          visible={isWindowVisible}
          onRequestClose={closeWindow}
        >
          <View style={styles.windowContainer}>
            <View style={styles.windowHeader}> 

              {/* Search bar */}
              <View style={styles.searchBarContainer}>
                <TextInput
                  style={styles.searchBar}
                  placeholder="Search for recipes"
                  placeholderTextColor="gray"
                />
                <View style={styles.searchBarIcon}>
                  <Ionicons name="search" size={20} color="gray"/>
                </View>
              </View>

              {/* close button */}
              <TouchableOpacity style={styles.closeButton} onPress={closeWindow}>
                <Ionicons name="close-outline" size={32} color="white"/>
              </TouchableOpacity>
            </View>

            {/* Filter results */}
            <TouchableOpacity style={styles.filterButton}>
              <Ionicons name="add-outline" size={20} color="gray"/>
              <Text style={styles.filterText}>Add filter</Text>
            </TouchableOpacity>

            {/* Recipe results */}
            <ScrollView>
              <View style={styles.line}></View>
              
            </ScrollView>
          </View>
        </Modal>

      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    marginTop: 30,
    marginLeft: 25,
    fontSize: 32,
    fontWeight: 700,
  },
  tempSubtitle: { // This will need to be removed
    marginTop: 30,
    marginBottom: 10,
    marginLeft: 25,
    color: 'gray',
    fontWeight: 600,
  },
  addButton: {
    marginTop: 25,
    marginRight: 25,
    height: 50,
    width: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ff8667",
  },
  windowContainer: {
    flex: 1,
    backgroundColor: "white",
  },
  windowHeader: {
    marginTop: 75,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  searchBarContainer: {
    marginLeft: 30,
    width: "69%", // nice
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
  },
  searchBar: {
    marginHorizontal: 14,
    flex: 1,
    flexShrink: 1,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: "#f0f0f0",
  },
  searchBarIcon: {
    marginRight: 14,
  },
  closeButton: {
    marginRight: 30,
    height: 40,
    width: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "gray",
  },
  line: {
    borderBottomWidth: 1,
    borderColor: "lightgray",
  },
  filterButton: {
    marginLeft: 30,
    marginVertical: 10,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  filterText: {
    fontSize: 16,
    color: "gray",
  },
});
