import { View, Text } from 'react-native';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Stack } from 'expo-router';
import { useUser } from '../../hooks/useUser';
import GuestOnly from '../../components/auth/GuestOnly';

const AuthLayout = () => {
	const { user } = useUser();
	console.log('Current User in Auth Layout:', user);
	return (
		<GuestOnly>
			<Stack>
				<Stack.Screen
					name='login'
					options={{
						title: 'Login',
					}}
				/>
				<Stack.Screen
					name='register'
					options={{
						title: 'Register',
					}}
				/>
			</Stack>
		</GuestOnly>
	);
};

export default AuthLayout;
