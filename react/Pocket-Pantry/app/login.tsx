import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '@env';

export default function LoginScreen({ setIsAuthenticated, setUserId }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupUsername, setSignupUsername] = useState('');

  const [loadingLogin, setLoadingLogin] = useState(false);
  const [loadingSignup, setLoadingSignup] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }

    setLoadingLogin(true);

    try {
      const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email, // or username
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setIsAuthenticated(true);
        setUserId(data.user_id);
        Alert.alert('Success', 'Logged in successfully!');
        
      } else {
        Alert.alert('Error', data.detail || 'Something went wrong. Please try again.');
        alert(data.detail)
    }
    } catch (error) {
      Alert.alert('Error', 'Network error. Please try again.');
      alert("some other login error");
    } finally {
      setLoadingLogin(false);
    }
  };

  const handleSignup = async () => {
    if (!signupEmail || !signupPassword || !signupUsername) {
      Alert.alert('Error', 'Please fill in all fields.');
      alert('Error Please fill in all fields.');
      return;
    }
  
    setLoadingSignup(true);
  
    try {
      const response = await fetch(`${API_URL}/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: signupUsername,
          email: signupEmail,
          password: signupPassword,
        }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        Alert.alert('Success', 'Signed up successfully! Logging you in...');
        alert("good?");
        setIsAuthenticated(true);
        setUserId(data.user_id);
        setSignupEmail('');
        setSignupPassword('');
        setSignupUsername('');
      } else {
        Alert.alert('Error', data.detail || 'Something went wrong. Please try again.');
        alert('Error' + data.detail || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      Alert.alert('Error', 'Network error. Please try again.');
      alert("network errror");
    } finally {
      setLoadingSignup(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* login */}
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        autoCapitalize="none"
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loadingLogin}>
        <Text style={styles.buttonText}>{loadingLogin ? 'Logging in...' : 'Login'}</Text>
      </TouchableOpacity>

      <View style={styles.divider}>
        <Text style={styles.dividerText}>OR</Text>
      </View>

      {/* signup */}
      <Text style={styles.title}>Sign Up</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        value={signupEmail}
        onChangeText={setSignupEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Username"
        autoCapitalize="none"
        value={signupUsername}
        onChangeText={setSignupUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        autoCapitalize="none"
        value={signupPassword}
        onChangeText={setSignupPassword}
      />
      <TouchableOpacity style={styles.button} onPress={handleSignup} disabled={loadingSignup}>
        <Text style={styles.buttonText}>{loadingSignup ? 'Signing up...' : 'Sign Up'}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#007bff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  dividerText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#555',
  },
});
