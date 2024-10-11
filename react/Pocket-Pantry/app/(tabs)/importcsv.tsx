import React, { useState } from 'react';
import { Button, View, Text } from 'react-native';
import * as SQLite from 'expo-sqlite';

// Open the SQLite database (or create it if it doesn't exist)
const db = SQLite.openDatabaseAsync('masterDatabase');

const DatabaseComponent = () => {
  const [status, setStatus] = useState('No action taken');

  // Function to create a table in the database
  const createTable = () => {
  //   db.execAsync(
  //       `CREATE TABLE IF NOT EXISTS recipes (
  //         name TEXT,
  //         id INTEGER PRIMARY KEY,
  //         minutes INTEGER,
  //         contributor_id INTEGER,
  //         submitted DATE,
  //         tags TEXT,
  //         nutrition TEXT,
  //         n_steps INTEGER,
  //         steps TEXT,
  //         description TEXT,
  //         ingredients TEXT,
  //         n_ingredients INTEGER
  //       );`,
  //     );

      setStatus('Table created successfully!');
    };

  return (
    <>
    <View style={{ padding: 20 }}>
      <Button title="Create Table" onPress={createTable} />
    </View>
    <Text>{status}</Text>
    </>
  );
};

export default DatabaseComponent;
