import { createContext, useState } from 'react';
import { databases } from '../lib/appwrite';
import { useUser } from '../hooks/useUser';
import { ID, Permission, Role } from 'react-native-appwrite';

const DATABASE_ID = '6834b0730026e6d21663'; // Replace with your actual database ID
const COLLECTION_ID = '6834b098003335fb8106'; // Replace with your actual collection ID
export const BooksContext = createContext();

export const BooksProvider = ({ children }) => {
	const [books, setBooks] = useState([]);
	const { user } = useUser();

	async function fetchBooks() {
		try {
			// Simulate fetching books from an API or database
			const response = await fetch('https://api.example.com/books');
			const data = await response.json();
			setBooks(data);
		} catch (error) {
			console.error('Failed to fetch books:', error);
		}
	}

	async function fetchBookById(id) {
		try {
			// Simulate fetching a single book by ID
			const response = await fetch(`https://api.example.com/books/${id}`);
			const data = await response.json();
			return data;
		} catch (error) {
			console.error('Failed to fetch book:', error);
			throw error;
		}
	}

	async function createBook(book) {
		try {
			const newBook = await databases.createDocument(
				DATABASE_ID,
				COLLECTION_ID,
				ID.unique(),
				{
					...book,
					userId: user?.$id, // Assuming you want to associate the book with the current user
				},
				[
					Permission.read(Role.user(user?.$id)), // Allow the user to read their own book
					Permission.write(Role.user(user?.$id)), // Allow the user to write their own book
					Permission.delete(Role.user(user?.$id)), // Allow the user to delete their own book
				]
			);
		} catch (error) {
			console.error('Failed to create book:', error);
		}
	}

	async function deleteBook(id) {
		try {
			// Simulate deleting a book by ID
			await fetch(`https://api.example.com/books/${id}`, {
				method: 'DELETE',
			});
			setBooks((prevBooks) => prevBooks.filter((book) => book.id !== id));
		} catch (error) {
			console.error('Failed to delete book:', error);
		}
	}

	return (
		<BooksContext.Provider
			value={{
				books,
				fetchBooks,
				fetchBookById,
				createBook,
				deleteBook,
			}}
		>
			{children}
		</BooksContext.Provider>
	);
};
