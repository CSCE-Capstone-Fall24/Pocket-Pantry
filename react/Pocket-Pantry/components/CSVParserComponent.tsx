import * as DocumentPicker from 'expo-document-picker';
import Papa from 'papaparse';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import React, { useState } from 'react';

const CSVParserComponent = () => {
  const [data, setData] = useState<any[]>([]);

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
      console.log("SCUEEDED");

      if (asset.uri) {
        const response = await fetch(asset.uri);
        const text = await response.text();

        Papa.parse(text, {
          header: true,
          skipEmptyLines: true,
          complete: (results) => {
            console.log('Parsed CSV results:', results.data);
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

  return (
    <View style={styles.container}>
      <Button title="Pick a CSV file" onPress={pickDocument} />
      <FlatList
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>Name: {item.name}</Text>
            <Text>ID: {item.id}</Text>
            <Text>Minutes: {item.minutes}</Text>
            <Text>Contributor ID: {item.contributor_id}</Text>
            <Text>Submitted: {item.submitted}</Text>
            <Text>Tags: {item.tags}</Text>
            <Text>Nutrition: {item.nutrition}</Text>
            <Text>Steps: {item.steps}</Text>
            <Text>Description: {item.description}</Text>
            <Text>Ingredients: {item.ingredients}</Text>
            <Text>Number of Ingredients: {item.n_ingredients}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  item: {
    marginVertical: 10,
    padding: 10,
    backgroundColor: '#f9c2ff',
  },
});

export default CSVParserComponent;
