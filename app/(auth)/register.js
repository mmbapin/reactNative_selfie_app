import { StyleSheet, Text } from 'react-native'
import React from 'react';
import { Link } from 'expo-router';
import ThemedView from '../../components/ThemedView';
import Spacer from '../../components/Spacer';
import ThemedText from '../../components/ThemedText';
import ThemedButton from '../../components/ThemedButton';
import { Colors } from '../../constants/Colors';
//themed components

const Register = () => {
  const handleSubmit = () => {
    // Handle login logic here
    console.log("Register button pressed");
  }
  return (
    <ThemedView style={styles.container}>
      <Spacer />
      <ThemedText title={true} style={styles.title}>
        Register to Your Account
      </ThemedText>

      <ThemedButton onPress={handleSubmit}>
        <Text style={{color: '#f2f2f2'}}>Register</Text>
      </ThemedButton>
      <Spacer height={100} />
      <Link href="/login" >
        <ThemedText style={{textAlign: 'center'}}>
          Login
        </ThemedText>
      </Link>
    </ThemedView>
  )
}

export default Register

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    textAlign: 'center',
    fontSize: 18,
    marginBottom: 30,
  },
  btn: {
    backgroundColor: Colors.primary,
    padding: 15,
    borderRadius: 5,
  },
  pressed: {
    opacity: 0.8,
  },
})