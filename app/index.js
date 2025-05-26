import { StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';
import { Link } from 'expo-router';
import Logo from '../assets/img/logo_light.png';
import ThemedView from '../components/ThemedView';
import ThemedLogo from '../components/ThemedLogo';
import Spacer from '../components/Spacer';
import ThemedText from '../components/ThemedText';

const Home = () => {
	return (
		<ThemedView style={styles.container}>
			<ThemedLogo style={styles.img} />
			<Spacer height={20}/>
			<ThemedText style={styles.title} title={true}>The Number 1</ThemedText>
			<Spacer height={10}/>
			<ThemedText>Reading List App</ThemedText>
			<Spacer/>
			<Link href="/login" style={styles.link}>
        <ThemedText>
          Login
        </ThemedText>
      </Link>
			<Link href="/register" style={styles.link}>
        <ThemedText>
          Register
        </ThemedText>
      </Link>
			<Link href="/profile" style={styles.link}>
        <ThemedText>
          Profile
        </ThemedText>
      </Link>
		</ThemedView>
	);
};

export default Home;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
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
	link: {
    marginVertical: 10,
		borderBottomWidth: 1,
  },
});
