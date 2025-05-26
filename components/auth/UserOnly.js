import { View, Text } from 'react-native';
import { useUser } from '../../hooks/useUser';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';

const UserOnly = ({ children }) => {
	const { user, authChecked } = useUser();
	const router = useRouter();

	useEffect(() => {
		if (authChecked && user === null) {
			router.replace('/(auth)/login');
		}
	}, [authChecked, user]);

	if (!authChecked || user === null) {
		return <Text>Loading...</Text>;
	}
	return children;
};

export default UserOnly;
