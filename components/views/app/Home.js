import React from "react";
import {
	ScrollView,
	FlatList,
	View,
	ListItem,
	RefreshControl,
	SafeAreaView,
} from "react-native";
import {
	Title,
	Text,
	Card,
	Avatar,
	Button,
	Snackbar,
} from "react-native-paper";

import FlatItem from "../../Elements/App/FlatItem";
import { Container } from "../../../components/Elements/general/ScreenContainer";

import axios from "axios";
import { useIsFocused } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

export const Home = ({ navigation }) => {
	const [DATA, setDATA] = React.useState("");
	const [refreshing, setRefreshing] = React.useState(false);

	const onRefresh = React.useCallback(async () => {
		setRefreshing(true);
		listReservation();
		setInterval(() => {
			setRefreshing(false);
		}, 1000);
	}, []);

	const listReservation = async () => {
		const token = await AsyncStorage.getItem("TOKEN");
		const userDetails = JSON.parse(await AsyncStorage.getItem("USERD"));

		try {
			const res = await axios.get("/Reservation/ByUserNC/" + userDetails.id, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			setDATA(res.data);
		} catch (error) {
			console.log(error.response.data.mensaje);
		}
	};

	const renderItem = ({ item }) => <FlatItem item={item} />;

	React.useEffect(() => {
		listReservation();
	}, []);
	return (
		<Container>
			<Title
				style={{
					margin: "10%",
					marginTop: "5%",
					fontWeight: "bold",
					color: "#1c243c",
					fontSize: 30,
				}}
			>
				Lista de citas pendientes
			</Title>

			<SafeAreaView style={{ flex: 1, width: "100%" }}>
				<FlatList
					style={{}}
					data={DATA}
					renderItem={renderItem}
					keyExtractor={(item) => item.id.toString()}
					refreshControl={
						<RefreshControl
							refreshing={refreshing}
							onRefresh={onRefresh}
							colors={["#ead42d"]}
							progressBackgroundColor="#1c243c"
						/>
					}
				/>
			</SafeAreaView>

			<Button
				mode="outlined"
				color="#1c243c"
				style={{
					width: "50%",
					marginHorizontal: "25%",
					marginVertical: "5%",
				}}
				onPress={() => navigation.push("Create")}
			>
				<MaterialCommunityIcons color="#1c243c" name="plus" />
				<Text style={{ color: "#1c243c" }}>Crear una cita</Text>
			</Button>
			{/**  
			<Button
				onPress={() =>
					navigation.push("Details", { name: "React Native School" })
				}
			>
				<Text>React Native School</Text>
			</Button>

			<Button onPress={() => navigation.toggleDrawer()}>
				<Text>Drawer</Text>
			</Button> 
			<Snackbar
				visible={true}
				onDismiss={false}
				action={{
					label: "Undo",
					onPress: () => {
						// Do something
					},
				}}
			>
				Hey there! I'm a Snackbar.
			</Snackbar> **/}
		</Container>
	);
};
