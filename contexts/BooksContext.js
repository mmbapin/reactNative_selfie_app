import { createContext, useEffect, useState } from 'react';
import { databases, client } from '../lib/appwrite';
import { useUser } from '../hooks/useUser';
import { ID, Permission, Query, Role } from 'react-native-appwrite';

const DATABASE_ID = '6834b0730026e6d21663'; // Replace with your actual database ID
const COLLECTION_ID = '6834b098003335fb8106'; // Replace with your actual collection ID
export const BooksContext = createContext();

export const BooksProvider = ({ children }) => {
	const [books, setBooks] = useState([]);
	const { user } = useUser();

	async function fetchBooks() {
		try {
			// Simulate fetching books from an API or database
			const response = await databases.listDocuments(
				DATABASE_ID,
				COLLECTION_ID,
				[
					Query.equal('userId', user?.$id), // Only fetch books associated with the current user
				]
			);
			setBooks(response.documents || []);
			console.log('Fetched books:', response.documents);
		} catch (error) {
			console.error(error.message);
		}
	}

	async function fetchBookById(id) {
		try {
			const response = await databases.getDocument(
				DATABASE_ID,
				COLLECTION_ID,
				id
			);
			return response;
		} catch (error) {
			console.error(error.message);
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
			await databases.deleteDocument(
				DATABASE_ID,
				COLLECTION_ID,
				id
			);
		} catch (error) {
			console.error('Failed to delete book:', error);
		}
	}


useEffect(() => {
    let unSubscribe;
    const channel = `databases.${DATABASE_ID}.collections.${COLLECTION_ID}.documents`;
    
    if (user) {
        fetchBooks();
        unSubscribe = client.subscribe(channel, (response) => {
            // console.log('Subscription response:', response);
            
            const { payload, events } = response;
            
            // Check if this event is for the current user's books
            if (payload.userId === user.$id) {
                // Check if any of the events contain these patterns
                const isCreateEvent = events.some(event => event.includes('.create'));
                const isUpdateEvent = events.some(event => event.includes('.update'));
                const isDeleteEvent = events.some(event => event.includes('.delete'));

                if (isCreateEvent) {
                    // console.log('Creating new book:', payload);
                    setBooks(prevBooks => {
                        // Check if book already exists to prevent duplicates
                        const exists = prevBooks.some(book => book.$id === payload.$id);
                        if (!exists) {
                            return [...prevBooks, payload];
                        }
                        return prevBooks;
                    });
                }
                else if (isUpdateEvent) {
                    // console.log('Updating book:', payload);
                    setBooks(prevBooks => 
                        prevBooks.map(book => 
                            book.$id === payload.$id ? payload : book
                        )
                    );
                }
                else if (isDeleteEvent) {
                    // console.log('Deleting book:', payload);
                    setBooks(prevBooks => 
                        prevBooks.filter(book => book.$id !== payload.$id)
                    );
                }
            }
        });
        
        // console.log('Subscription created for channel:', channel);
    } else {
        setBooks([]);
    }

    return () => {
        if (unSubscribe) {
            console.log('Unsubscribing...');
            unSubscribe();
        }
    };
}, [user]);
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
