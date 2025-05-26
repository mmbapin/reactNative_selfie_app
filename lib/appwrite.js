import { Client, Account, Avatars, Databases } from 'react-native-appwrite';

const client = new Client()
	.setEndpoint('https://fra.cloud.appwrite.io/v1')
	.setProject('683359f4002f6b217ea0')
	.setPlatform('dev.bapin.selfie');

export const account = new Account(client);
export const avatars = new Avatars(client);

export const databases = new Databases(client);
