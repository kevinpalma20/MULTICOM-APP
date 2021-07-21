import React from "react";
import { Text, View } from "react-native";
import { Button } from "react-native-paper";

export const Reclaim = ({ route }) => {
	const { idReservation } = route.params;

	React.useEffect(() => {}, []);

	return (
		<View>
			<Text>Reclaim</Text>
			<Text>Reclaim Screen {idReservation}</Text>
		</View>
	);
};
