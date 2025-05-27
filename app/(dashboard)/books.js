import { FlatList, Pressable, StyleSheet, Text } from 'react-native';
import {useBooks} from "../../hooks/useBooks";
import { Colors } from '../../constants/Colors';

import Spacer from '../../components/Spacer';
import ThemedText from '../../components/ThemedText';
import ThemedView from '../../components/ThemedView';
import ThemedCard from '../../components/ThemedCard';
import { useRouter } from 'expo-router';

const Books = () => {
	const { books } = useBooks();
	const router = useRouter()
	// const colorScheme = useColorScheme();
	return (
		<ThemedView style={styles.container} safe={true}>
			<Spacer />
			<ThemedText title={true} style={styles.heading}>
				Your Reading List
			</ThemedText>
			<Spacer />

			<FlatList 
				data={books}
				keyExtractor={(item) => item.$id}
				contentContainerStyle={styles.list}
				showsVerticalScrollIndicator={true}
				style={styles.flatList}
				renderItem={({item}) => {
					return (
            <Pressable onPress={() => router.push(`/books/${item.$id}`)}>
							<ThemedCard style={styles.card}>
								<ThemedText style={styles.title}>{item.title}</ThemedText>
								<ThemedText>Written by <Text style={{fontWeight: 'bold'}}>{item.author}</Text></ThemedText>
							</ThemedCard>
						</Pressable>
          );
				}}
			/>
		</ThemedView>
	);
};

export default Books;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: "stretch",
  },
  heading: {
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
  },
	flatList: {
    flex: 1,
    width: '100%',
  },
  list: {
    marginTop: 40,
		paddingBottom: 40,
  },
  card: {
    width: "90%",
    marginHorizontal: "5%",
    marginVertical: 10,
    padding: 10,
    paddingLeft: 14,
    borderLeftColor: Colors.primary,
    borderLeftWidth: 4
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
})
