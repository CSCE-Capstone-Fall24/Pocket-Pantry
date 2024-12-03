import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal, TextInput, Pressable, FlatList } from "react-native";
import { BlurView } from "expo-blur";
import Ionicons from "@expo/vector-icons/Ionicons";
import MealItem from "@/components/MealItem";
import RecipeItem from "@/components/RecipeItem";
import { useUserContext } from '@/components/contexts/UserContext';
import { RefreshControl } from 'react-native-gesture-handler';

const API_URL = process.env["EXPO_PUBLIC_API_URL"];

export default function MealPlan () {
  interface Recipe {
    id: number;
    name: string;
    description: string;
    servings: number;
    nutrition: number[];
    cook_time: number;
    cook_steps: string[];
    ingredients: string[];
    ingredient_quantities: number[];
    ingredient_units: string[];
  }

  interface fried {
    id: number;
    name: string;
    description: string;
    servings: number;
    nutrition: number[];
    cook_time: number;
    cook_steps: string[];
    ingredients: string[];
    ingredient_quantities: number[];
    ingredient_units: string[];
  }

  type Roommate = {
    id: string; 
    name: string; 
    isReciprocal: boolean;
  };

  type PlannedMeal = {
    meal_id: string; 
    user_id: string; 
    recipe_id: string;
    n_servings: number;
    is_shared: boolean;
    shared_with: Number[];
    expiration_date: Date;
    recipe_obj: any; // lets go
  }

  const { userData, setUserData } = useUserContext(); // pull once integrated
  const [recipRoommates, setRecipRoommates] = useState<Roommate[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      await fetchPlannedMeals();
      await refreshRoommates();
    } finally {
      setRefreshing(false);
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

      // Alert.alert('Success', 'Roommates updated!');
    } catch (error) {
      // console.error(error);
      // Alert.alert('Error', 'Could not refresh roommates. Please try again.');
    }
  };

  useEffect(() => {
    const rms: Roommate[] = userData.roommates
      .filter((item: any) => item.is_reciprocated)
      .map((item: any) => ({
        id: item.roommate_id,
        name: item.username,
        isReciprocal: item.is_reciprocated,
      })).sort((a: Roommate, b: Roommate) => Number(a.id) - Number(b.id));

    setRecipRoommates(rms);
    fetchPlannedMeals();
  }, [userData.reciprocatedRoommates, userData.roommates]); // TODO, make run when item is deleted?

  {/* Functions - recipe search window */}
  const [isWindowVisible, setWindowVisible] = useState(false);
  const openWindow = () => setWindowVisible(true);
  const closeWindow = () => setWindowVisible(false);

  {/* Functions - filter window */}
  const [isFilterVisible, setFilterVisible] = useState(false);
  const openFilter = () => setFilterVisible(true);
  const closeFilter = () => setFilterVisible(false);

  {/* Functions - set filters */}
  const filterNames = ["Recipes cookable with inventory"];
  const [filter, setFilter] = useState<boolean[]>(new Array(filterNames.length).fill(false));
  const [tempFilter, setTempFilter] = useState(filter);
  const filterToggle = (index: number) => {
    setTempFilter((prevState) => {
      const updatedState = [...prevState];
      updatedState[index] = !updatedState[index];
      return updatedState;
    });
  };
  const filterCancel = () => { setTempFilter(filter); closeFilter(); };
  const filterApply = () => { setFilter(tempFilter); closeFilter(); };

  {/* Functions - search results */}
  const [searchData, setSearchData] = useState<any>('');
  const [searchResult, setSearchResult] = useState('');
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch(`${API_URL}/all_recipes`);
        const data = await response.json();
        setSearchData(data);
        console.log("FETCHING");
        console.log(data);
      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
    };
    fetchRecipes();
  }, []);

  const [mealData, setMealData] = useState<PlannedMeal[]>();
  const [groupedMeals, setGroupedMeals] = useState<{ [key: string]: PlannedMeal[] }>({});
  const fetchPlannedMeals = async () => {
    try {
      const response = await fetch(`${API_URL}/planned_meals/?user_id=${userData.user_id}`);
      // const response = await fetch(`${API_URL}/planned_meals/?user_id=4`);
      const data = await response.json();
      // setMealData(data);

      const transformedMeals: PlannedMeal[] = data.map((meal: any) => ({
        meal_id: meal.meal_id,
        user_id: meal.user_id,
        recipe_id: meal.recipe_id,
        n_servings: meal.n_servings,
        is_shared: Boolean(meal.is_shared),
        shared_with: meal.shared_with.sort(),
        expiration_date: new Date(meal.expiration_date),
        recipe_obj: meal.recipe,
      }));
      setMealData([...transformedMeals]); 

      console.log("got meals as");
      console.log(transformedMeals);

      // grp by date
      const grouped = transformedMeals.reduce((acc: { [key: string]: PlannedMeal[] }, meal) => {
        const day = meal.expiration_date.toISOString().split("T")[0];
        if (!acc[day]) acc[day] = [];
        acc[day].push(meal);
        return acc;
      }, {});

      // Sort dates
      const sortedGrouped = Object.keys(grouped)
        .sort((a, b) => new Date(a).getTime() - new Date(b).getTime())
        .reduce((acc: { [key: string]: PlannedMeal[] }, key) => {
          acc[key] = grouped[key];
          return acc;
        }, {});

      setGroupedMeals(sortedGrouped);
      
    } catch (error) {
      console.error('Error fetching recipes:', error);
    }
  };

  const deleteMeal = async (id: string, user_id: string) => { // argument is pantry_id
    alert("DELETING PLANNED MEAL " + id + " from " + user_id);
    console.log(mealData?.filter((item) => item.meal_id == id))
    // try {
    //   const response = await fetch(`${API_URL}/remove_pantry_item/`, {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({ id: id, user_id: user_id }),
    //   });
  
    //   if (!response.ok) {
    //     throw new Error('Failed to remove item from pantry');
    //   }
  
    //   setItems((prevItems) => prevItems.filter((item) => item.id !== id));
    // } catch (error) {
    //   console.error('Error removing item:', error);
    //   alert('Error: Failed to remove item.');
    // }    
  };



  const renderRecipes = ({item}:{item:any}) => (
    <RecipeItem
      id={item.recipe_id}
      name={item.name}
      description={item.description}
      servings={item.serving_size}
      nutrition={item.nutrition}
      cook_time={item.cook_time_minutes}
      cook_steps={item.cook_steps}
      ingredients={item.ingredients}
      ingredient_quantities={item.ingredient_quantities}
      ingredient_units={item.ingredient_units}
      closeSearchWindow={closeWindow}

      // editing: Boolean; // IF EDITING POST TO EDIT ON SAVE, ELSE POST TO ADD
      // recip_roommates: Roommate[]; // need for share
      // shared_with: Number[];
      // user_id: Number;
      editing={false}
      recip_roommates={recipRoommates}
      shared_with={[]}
      user_id={userData.user_id}
      deleteMeal={deleteMeal}
      meal_id={"-1"} // string uh idk
      refreshMeals={onRefresh}
    />
  );

  return (
    <View style={styles.container}> 
      <View style={styles.header}>
        <Text style={styles.title}>
          Meal Plan
          </Text>
        <TouchableOpacity style={styles.addButton} onPress={openWindow}>
          <Ionicons name="add-outline" size={40} color="white"/>
        </TouchableOpacity>
      </View>

      <ScrollView 
        style={styles.container} 
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#ff8667']}
          />
        }
      >

        {/* Recipe search window */}
        <Modal
          transparent={true}
          animationType="slide"
          visible={isWindowVisible}
          onRequestClose={closeWindow}
        >
          <View style={styles.windowContainer}>
            <View style={styles.windowHeader}> 

              {/* Search bar/filter */}
              <View style={styles.searchBarContainer}>
                <TextInput
                  style={styles.searchBar}
                  placeholder="Search for recipes"
                  placeholderTextColor="gray"
                  onChangeText={(value) => setSearchResult(value)}
                />
                <TouchableOpacity style={styles.filterButton} onPress={openFilter}>
                  <Ionicons name="options" size={27} color="gray"/>
                </TouchableOpacity>
              </View>

              {/* Close button */}
              <TouchableOpacity style={styles.closeButton} onPress={closeWindow}>
                <Ionicons name="close-outline" size={50} color="gray"/>
              </TouchableOpacity>
            </View>

            {/* Filter window */}
            <Modal
              transparent={true}
              animationType="fade"
              visible={isFilterVisible}
              onRequestClose={closeFilter}
            >
              <View style={[StyleSheet.absoluteFill, styles.blurOverlay]}>
                <BlurView style={StyleSheet.absoluteFill} intensity={30}/>
              </View>
              <View style={styles.filterAlignment}>
                <View style={styles.filterContainer}>
                  <Text style={styles.filterTitle} numberOfLines={1} ellipsizeMode="tail">Filters</Text>

                  {filterNames.map((filterName: string, index: number) => {
                    return (
                      <View key={filterName} style={styles.fieldContainer}>
                        <Text style={styles.fieldText} numberOfLines={1} ellipsizeMode="tail">{filterName}</Text>
                        <Pressable onPress={() => filterToggle(index)}>
                          {tempFilter[index] ? (
                            <Ionicons name="checkbox" size={32} color="gray"/>
                          ) : (
                            <Ionicons name="square-outline" size={32} color="gray"/>
                          )}
                        </Pressable>
                      </View>
                    );
                  })}

                  {/* Cancel/apply filters */}
                  <View style={styles.buttonAlignment}>
                    <TouchableOpacity style={styles.cancelButton} onPress={filterCancel}>
                      <Text style={styles.cancelButtonText}>Cancel</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.applyButton} onPress={filterApply}>
                      <Text style={styles.applyButtonText}>Apply</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </Modal>

            <View style={styles.line}></View>

            {/* Recipe results */}
            <FlatList
              data={
                searchResult 
                ? searchData.filter((item: any) =>
                    item.name.toLowerCase().includes(searchResult.toLowerCase())
                  )
                : []
              }
              keyExtractor={(item) => item.recipe_id.toString()}
              renderItem={renderRecipes}
              style={styles.resultsContainer}
              contentContainerStyle={styles.resultsBuffer}
            />
          </View>
        </Modal>

        {Object.entries(groupedMeals).map(([date, meals]) => (
          <View key={date}>
            <Text style={styles.dateHeader}>{new Date(date).toLocaleDateString()}</Text>
            {meals.map((meal) => (
              <MealItem
                key={meal.meal_id}
                meal_id={meal.meal_id}
                user_id={meal.user_id}
                recipe_id={meal.recipe_id}
                n_servings={meal.n_servings}
                is_shared={meal.is_shared}
                shared_with={meal.shared_with}
                expiration={meal.expiration_date}
                recipe={meal.recipe_obj}
                recip_rms={recipRoommates}
                deleteMeal={deleteMeal}
                refreshMeals={onRefresh}
              />
            ))}
          </View>
        ))}

        <View style={styles.itemBuffer}></View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    marginTop: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 25,
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
    marginBottom: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  searchBarContainer: {
    marginLeft: 35,
    width: "68%",
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
  },
  searchBar: {
    flex: 1,
    flexShrink: 1,
    paddingVertical: 12,
    paddingHorizontal: 14,
    fontSize: 16,
  },
  closeButton: {
    marginRight: 24,
  },
  filterButton: {
    paddingHorizontal: 14,
  },
  blurOverlay: {
    backgroundColor: `rgba(0, 0, 0, ${.15})`
  },
  filterAlignment: {
    flex: 1,
    justifyContent: "center",
  },
  filterContainer: {
    marginHorizontal: 35,
    borderRadius: 8,
    padding: 35,
    alignItems: "center",
    backgroundColor: "white",
  },
  filterTitle: {
    fontSize: 24,
    fontWeight: 600,
    marginBottom: 15,
  },
  fieldContainer: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  fieldText: {
    marginRight: 5,
    fontSize: 16,
  },
  buttonAlignment: {
    marginTop: 35,
    flexDirection: "row",
    alignItems: "center",
  },
  cancelButton: {
    marginRight: 35,
    width: 90,
    borderWidth: 2,
    borderRadius: 8,
    borderColor: "gray",
    paddingVertical: 10,
    alignItems: "center",
    backgroundColor: "white",
  },
  cancelButtonText: {
    color: "gray",
    fontSize: 16,
    fontWeight: "bold",
  },
  applyButton: {
    width: 90,
    borderWidth: 2,
    borderRadius: 8,
    borderColor: "gray",
    paddingVertical: 10,
    alignItems: "center",
    backgroundColor: "gray",
  },
  applyButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  line: {
    borderBottomWidth: 0.5,
    borderColor: "lightgray",
  },
  resultsContainer: {
    backgroundColor: "#f0f0f0",
  },
  resultsBuffer: {
    paddingBottom: 50,
  },
  dateHeader: {
    marginTop: 40,
    marginLeft: 25,
    color: "gray",
    fontWeight: 600,
  },
  itemBuffer: {
    height: 16,
  },
});