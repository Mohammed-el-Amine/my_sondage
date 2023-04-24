import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import Signup from './components/Signup';
import axios from 'axios';
import Profile from './components/Profile';

export default function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showSignup, setShowSignup] = useState(false);
  const [userId, setUserId] = useState(null);

  const handleLogin = () => {

    console.log('Connexion avec email:', email, 'et mot de passe:', password);

    axios.post('http://10.68.255.234:3000/login', {
      email: email,
      password: password
    })
      .then((response) => {
        console.log("Connected");
        setUserId(response.data.userId);
        console.log(response.data.userId);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSignup = () => {
    setShowSignup(true);
  };

  const handleBack = () => {
    setShowSignup(false);
  };

  if (showSignup) {
    return <Signup handleBack={handleBack} />;
  }

  if (userId) {
    return <Profile userId={userId} />;
  } else {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>TeamVote by Softeam</Text>
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
          placeholder="Mot de passe"
          secureTextEntry={true}
          autoCapitalize="none"
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Se connecter</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.signupLink} onPress={handleSignup}>
          <Text style={styles.signupLinkText}>Pas encore de compte ? S'inscrire</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  input: {
    width: '80%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 10,
    fontSize: 18,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  signupLink: {
    marginBottom: 20,
  },
  signupLinkText: {
    color: '#007AFF',
    fontSize: 16,
  },
});