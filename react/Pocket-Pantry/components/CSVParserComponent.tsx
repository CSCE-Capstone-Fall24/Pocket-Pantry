import * as DocumentPicker from 'expo-document-picker';
import Papa from 'papaparse';
import { View, Text, Button, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';
import React, { useState } from 'react';

const CSVParserComponent = () => {
  const [data, setData] = useState<any[]>([]);
  const [expandedItems, setExpandedItems] = useState<Record<number, boolean>>({});

  const pickDocument = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: 'text/csv',
    });

    if (result.canceled) {
      console.log('Document picker was canceled');
      return;
    }

    if (result.assets && result.assets.length > 0) {
      const asset = result.assets[0];

      if (asset.uri) {
        const response = await fetch(asset.uri);
        const text = await response.text();

        Papa.parse(text, {
          header: true,
          skipEmptyLines: true,
          complete: (results) => {
            setData(results.data);
          },
          error: (error) => {
            console.error('Error parsing CSV:', error);
          },
        });
      }
    } else {
      console.error('No assets found');
    }
  };

  const toggleExpanded = (index: number) => {
    setExpandedItems((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  return (
    <View style={styles.container}>
      <Button title="Pick a CSV file" onPress={pickDocument} />
      <FlatList
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => {
          const isExpanded = expandedItems[index];
          return (
            <TouchableOpacity onPress={() => toggleExpanded(index)}>
              <View style={styles.card}>
                <View style={styles.contentRow}>
                  <View style={styles.textContent}>
                    <Text style={styles.recipeTitle}>{item.name}</Text>
                    <Text style={styles.recipeTime}>{item.minutes} minutes</Text>
                    <Text style={styles.description}>{item.description}</Text>

                    <Text style={styles.ingredientsLabel}>Ingredients:</Text>
                    <Text style={styles.ingredients}>{item.ingredients}</Text>

                    {isExpanded ? (
                      <View style={styles.expandedSection}>
                        <Text style={styles.label}>Steps:</Text>
                        <Text style={styles.value}>{item.steps}</Text>

                        <View style={styles.infoRow}>
                          <Text style={styles.label}>ID:</Text>
                          <Text style={styles.value}>{item.id}</Text>
                        </View>
                        <View style={styles.infoRow}>
                          <Text style={styles.label}>Contributor ID:</Text>
                          <Text style={styles.value}>{item.contributor_id}</Text>
                        </View>
                        <View style={styles.infoRow}>
                          <Text style={styles.label}>Submitted:</Text>
                          <Text style={styles.value}>{item.submitted}</Text>
                        </View>
                        <View style={styles.infoRow}>
                          <Text style={styles.label}>Tags:</Text>
                          <Text style={styles.value}>{item.tags}</Text>
                        </View>
                      </View>
                    ) : null }
                  </View>

                  <Image
                    source={{ uri: 'https://www.creativefabrica.com/wp-content/uploads/2021/01/09/Diagonal-of-random-square-pattern-5-Graphics-7678518-1.jpg' }} 
                    style={styles.recipeImage}
                  />
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f8f8f8',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  contentRow: {
    flexDirection: 'row',
  },
  textContent: {
    flex: 2,
  },
  recipeTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  recipeTime: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    marginBottom: 5,
  },
  ingredientsLabel: {
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
  },
  ingredients: {
    fontSize: 14,
    marginBottom: 10,
  },
  expandedSection: {
    marginTop: 10,
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  label: {
    fontWeight: 'bold',
    marginRight: 5,
  },
  value: {
    color: '#333',
  },
  separator: {
    height: 10,
  },
  recipeImage: {
    flex: 1,
    height: 200,
    borderRadius: 10,
    marginLeft: 10,
  },
});

export default CSVParserComponent;
