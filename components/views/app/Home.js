import React from "react";
import { ScrollView, View } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { Container } from "../../../components/Elements/general/ScreenContainer";
import { Title, Text, Card, Avatar, Button } from "react-native-paper";

export const Home = ({ navigation }) => {
	const contentRight = (props) => (
		<>
			{" "}
			<Button icon="details">
				<Text>Ver</Text>
			</Button>
			<Button icon="close-circle">
				<Text>Cancelar</Text>
			</Button>
		</>
	);

	const contentLeft = (props) => (
		<>
			<Avatar.Icon
				{...props}
				icon="file"
				size={40}
				theme={{ colors: { primary: "#1c243c" } }}
				color="#ead42d"
			/>
		</>
	);

	return (
		<Container>
			<Title
				style={{
					margin: "10%",
					fontWeight: "bold",
					color: "#1c243c",
					fontSize: 30,
				}}
			>
				Lista de citas pendientes
			</Title>
			<ScrollView contentContainerStyle={{ padding: 20 }}>
				<Text style={{ marginVertical: "10%" }}>Hola</Text>
			</ScrollView>
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
																		ffffffffffffff
			<Button
				onPress={() =>
					navigation.push("Details", { name: "React Native School" })
				}
			>
				<Text>React Native School</Text>
			</Button>

			<Button onPress={() => navigation.toggleDrawer()}>
				<Text>Drawer</Text>
			</Button> **/}
		</Container>
	);
};
