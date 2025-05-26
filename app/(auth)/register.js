import { Keyboard, StyleSheet, Text, TouchableWithoutFeedback } from 'react-native';
import React, { useState } from 'react';
import { Link } from 'expo-router';
import ThemedView from '../../components/ThemedView';
import Spacer from '../../components/Spacer';
import ThemedText from '../../components/ThemedText';
import { Colors } from '../../constants/Colors';
import ThemedButton from '../../components/ThemedButton';
import ThemedTextInput from '../../components/ThemedTextInput';
import { useUser } from '../../hooks/useUser';
//themed components

const Register = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState(null);

	const { user, register } = useUser();

	const handleSubmit = async () => {
		setError(null);
		try {
			await register(email, password);
			console.log('Current User :', user);
		} catch (error) {
			setError(error.message);
		}
	};
	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
			<ThemedView style={styles.container}>
				<Spacer />
				<ThemedText title={true} style={styles.title}>
					Register to Your Account
				</ThemedText>

				<ThemedTextInput
					style={{
						width: '80%',
						marginBottom: 20,
					}}
					placeholder='Email'
					keyboardType='email-address'
					onChangeText={setEmail}
					value={email}
				/>

				<ThemedTextInput
					style={{ width: '80%', marginBottom: 20 }}
					placeholder='Password'
					onChangeText={setPassword}
					value={password}
					secureTextEntry
				/>

				<ThemedButton onPress={handleSubmit}>
					<Text style={{ color: '#f2f2f2' }}>Register</Text>
				</ThemedButton>

				<Spacer height={10} />
				{error && <Text style={styles.error}>{error}</Text>}

				<Spacer height={30} />
				<ThemedText>
					Already have an account?{' '}
					<Link href='/login'>
						<ThemedText style={{ textAlign: 'center', color: Colors.primary, fontWeight: 'bold' }}>Login</ThemedText>
					</Link>
				</ThemedText>
			</ThemedView>
		</TouchableWithoutFeedback>
	);
};

export default Register;

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
	error: {
		color: Colors.warning,
		padding: 10,
		backgroundColor: '#f5c1c8',
		borderColor: Colors.warning,
		borderWidth: 1,
		borderRadius: 6,
		marginHorizontal: 10,
	},
});
