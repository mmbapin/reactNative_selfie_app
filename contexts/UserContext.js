import { createContext, useEffect, useState } from 'react';
import { account } from '../lib/appwrite'; // Adjust the import path as necessary
import { ID } from 'react-native-appwrite';

export const UserContext = createContext();

export function UserProvider({ children }) {
	const [user, setUser] = useState(null);
	const [authChecked, setAuthChecked] = useState(false);

	async function login(email, password) {
		try {
			await account.createEmailPasswordSession(email, password);
			const response = await account.get();
			setUser(response);
		} catch (error) {
			throw Error(error.message);
		}
	}

	async function register(email, password) {
		try {
			await account.create(ID.unique(), email, password);
			await login(email, password); // Automatically log in after registration
		} catch (error) {
			console.error(error.message);
			throw Error(error.message);
		}
	}

	async function logout() {
		await account.deleteSession('current');
		setUser(null);
	}

	async function getInitialUserValue() {
		try {
			const response = await account.get();
			setUser(response);
		} catch (error) {
			setUser(null);
		} finally {
			setAuthChecked(true); // Set authChecked to true after checking the user
		}
	}

	useEffect(() => {
		getInitialUserValue();
	}, []);

	return <UserContext.Provider value={{ user, login, register, logout, authChecked }}>{children}</UserContext.Provider>;
}
