import React from "react";
import { FlatList, RefreshControl, Text, SafeAreaView } from "react-native";
import { Title, Button } from "react-native-paper";

import FlatItem from "../../Elements/App/FlatItem";
import { Container } from "../../../components/Elements/general/ScreenContainer";

import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

export const Home_Cancel = ({ navigation }) => {
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
			const res = await axios.get("/Reservation/ByUserC/" + userDetails.id, {
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
					fontSize: 25,
					color: "#1C243C",
					paddingVertical: "5%",
					fontFamily: "Inter_500Medium",
					marginLeft: "2%",
				}}
			>
				Lista de citas canceladas
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
		</Container>
	);
};
