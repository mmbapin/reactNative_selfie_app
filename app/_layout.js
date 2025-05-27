import { StyleSheet, Text, useColorScheme, View } from 'react-native';
import React from 'react';
import { Slot, Stack } from 'expo-router';
import { Colors } from '../constants/Colors';
import { StatusBar } from 'expo-status-bar';
import { UserProvider } from '../contexts/UserContext';
import { BooksProvider } from '../contexts/BooksContext';

const RootLayout = () => {
	const colorScheme = useColorScheme();
	const theme = Colors[colorScheme] || Colors.light;
	return (
		<UserProvider>
			{/* <StatusBar value="auto"/> */}
			<BooksProvider>
				<Stack
					screenOptions={{
						headerStyle: { backgroundColor: theme.navBackground },
						headerTintColor: theme.title,
					}}
				>
					<Stack.Screen name='index' options={{ title: 'Home' }}></Stack.Screen>
					<Stack.Screen name='(auth)' options={{ headerShown: false }}></Stack.Screen>
					<Stack.Screen name='(dashboard)' options={{ headerShown: false }}></Stack.Screen>
				</Stack>
			</BooksProvider>
		</UserProvider>
	);
};

export default RootLayout;

const styles = StyleSheet.create({});