import { StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';
import Logo from '../assets/img/logo_light.png';

const Home = () => {
	return (
		<View style={styles.container}>
			<Image source={Logo} style={styles.img} />
			<Text style={styles.title}>The Number 1</Text>
			<Text style={{ marginTop: 10, marginBottom: 10 }}>Reading List App</Text>

			<View style={styles.card}>
				<Text>Hello, this is a card</Text>
			</View>
		</View>
	);
};

export default Home;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#f0f0f0',
	},
	img: {
		marginVertical: 20,
	},
	title: {
		fontSize: 18,
		fontWeight: 'bold',
	},

	card: {
		backgroundColor: '#eee',
		padding: 20,
		borderRadius: 5,
		boxShadow: '4px 4px 10px rgba(0,0,0,0.1)',
	},
});
