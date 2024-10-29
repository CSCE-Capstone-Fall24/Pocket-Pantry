import { Image, StyleSheet, Button } from 'react-native';
import React, { useState } from 'react';


import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';

import { InventoryProvider } from '../../components/contexts/inventoryContext'; // Import the provider
import AdminView from '../../components/AdminView'; 
import InventoryView from '../../components/InventoryView';


export default function HomeScreen() {

  const [showAdmin, setShowAdmin] = useState<boolean>(false);

  return (
    <>
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }
      >
      <ThemedText> 
        <h1>Pantry View</h1>
      </ThemedText>

      <Button title="toggle admin view" onPress={() => setShowAdmin(!showAdmin)} />

      <InventoryProvider>
        { showAdmin ? (
            <AdminView />
          ) : null
        }
        <InventoryView />
      </InventoryProvider>

    </ParallaxScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
