import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Alert, Modal } from 'react-native';
const API_URL = process.env["EXPO_PUBLIC_API_URL"];

export default function LoginScreen({ setIsAuthenticated, setUserData }) {
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
        setUserData(data.user_data);
        console.log(data);
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
        // alert("good?");
        setIsAuthenticated(true);
        setUserData(data.user_data);
        // alert("Signed up successfully");
      } else {
        // Alert.alert('Error', data.detail || 'Something went wrong. Please try again.');
        alert('Error' + data.detail || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      Alert.alert('Error', 'Network error. Please try again.');
      // alert("network errror");
    } finally {
      setLoadingSignup(false);
    }
  };

  const [isWindowVisible, setWindowVisible] = useState(false);
  const openWindow = () => setWindowVisible(true);
  const closeWindow = () => setWindowVisible(false);

  return (
    <View style={styles.container}>
      
      {/* Login */}
      <Text style={styles.title}>LOGIN</Text>
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

      <TouchableOpacity style={styles.textContainer} onPress={openWindow}>
        <Text style={styles.textA}>Don't have an account?  </Text>
        <Text style={styles.textB}>Sign Up</Text>
      </TouchableOpacity>

      <Modal
        transparent={true}
        animationType="slide"
        visible={isWindowVisible}
        onRequestClose={closeWindow}
      >
        <View style={styles.container}>
          {/* Sign-up */}
          <Text style={styles.title}>SIGN UP</Text>
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

          <TouchableOpacity style={styles.textContainer} onPress={closeWindow}>
            <Text style={styles.textA}>Already have an account?  </Text>
            <Text style={styles.textB}>Login</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  title: {
    marginBottom: 20,
    fontSize: 24,
    fontWeight: 600,
  },
  input: {
    marginBottom: 15,
    height: 50,
    width: "100%",
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "lightgray",
    paddingHorizontal: 15,
    fontSize: 16,
  },
  button: {
    marginTop: 10,
    height: 50,
    width: "100%",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ff8667",
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  textContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  textA: {
    marginTop: 20,
    fontSize: 16,
  },
  textB: {
    marginTop: 20,
    fontSize: 16,
    fontWeight: 700,
    color: "#ff8667",
  },
});
