import { View, Text } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { Stack } from 'expo-router'

const AuthLayout = () => {
  return (
    <>
      {/* <StatusBar style='auto'/> */}
      {/* <Stack screenOptions={{
        headerShown: false,
        animation: "none"
      }}></Stack> */}
      <Stack>
        <Stack.Screen 
          name="login" 
          options={{
            title: "Login"
          }}
        />
        <Stack.Screen 
          name="register" 
          options={{
            title: "Register"
          }}
        />
      </Stack>
    </>
  )
}

export default AuthLayout