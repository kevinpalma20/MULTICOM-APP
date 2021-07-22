import React from "react";
import {
	Button,
	Card,
	Title,
	Paragraph,
} from "react-native-paper";
import {
	View,
	Text,
	StyleSheet,
	center,
} from "react-native"; //https://picsum.photos/
import { useNavigation } from "@react-navigation/native";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import axios from "axios";
import Toast from "react-native-toast-message";
import AwesomeAlert from "react-native-awesome-alerts";
import AsyncStorage from "@react-native-async-storage/async-storage";

const FlatItem = ({ item }) => {
	const navigation = useNavigation();
	const [awesomeAlertFrom, setAwesomeAlert1From] =
		React.useState({
			show: false,
		});

	const handleAlert = (name, value) =>
		setAwesomeAlert1From({
			...awesomeAlertFrom,
			[name]: value,
		});

	const cancelReservation = async (idRes) => {
		let mssg = "";
		var token = await AsyncStorage.getItem("TOKEN");

		setAwesomeAlert1From({ show: false });

		try {
			const res = await axios.post(
				"/Reservation/cancelReservation/" + idRes,
				{},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				},
			);
			mssg = res.data.mensaje;
		} catch (error) {
			mssg = error.response.data.mensaje;
		} finally {
			Toast.show({
				type: "success",
				position: "bottom",
				text1: "MULTICOM",
				text2: mssg,
				visibilityTime: 4000,
				autoHide: true,
				bottomOffset: 40,
			});
		}
	};

	React.useEffect(() => {}, []);

	return (
		<>
			<Card style={styles.itemContainer}>
				<Card.Content>
					<View style={{ flexDirection: "row" }}>
						<View
							style={{
								flexDirection: "column",
								marginHorizontal: "2%",
							}}
						>
							<Title style={{ fontFamily: "Inter_500Medium" }}>
								Fecha
							</Title>
							<Paragraph style={{ fontFamily: "Inter_300Light" }}>
								{item.fecha}
							</Paragraph>
						</View>
						<View
							style={{
								flexDirection: "column",
								marginHorizontal: "2%",
							}}
						>
							<Title style={{ fontFamily: "Inter_500Medium" }}>
								Horario
							</Title>
							<View style={{ flexDirection: "row" }}>
								<Paragraph style={{ fontFamily: "Inter_300Light" }}>
									{item.horaInicio}
								</Paragraph>
								<Paragraph
									style={{
										fontFamily: "Inter_300Light",
										marginLeft: "10%",
									}}
								>
									{item.horaFin}
								</Paragraph>
							</View>
						</View>
						{item.estado ==
						"Solicitada por un cliente (o usted)." ? (
							<View
								style={{
									flexDirection: "column",
									marginLeft: "7%",
								}}
							>
								<Title style={{ fontFamily: "Inter_500Medium" }}>
									Estado
								</Title>
								<MaterialCommunityIcons
									color="green"
									name="check-circle"
									size={30}
								/>
							</View>
						) : (
							<View
								style={{
									flexDirection: "column",
									marginLeft: "7%",
								}}
							>
								<Title style={{ fontFamily: "Inter_500Medium" }}>
									Estado
								</Title>
								<MaterialCommunityIcons
									color="red"
									name="alert"
									size={30}
								/>
							</View>
						)}
					</View>
					<Paragraph
						style={{
							fontFamily: "Inter_600SemiBold",
							marginVertical: "1%",
						}}
					>
						{item.proposito}
					</Paragraph>
				</Card.Content>
				<Card.Actions>
					<Button
						icon="details"
						color="green"
						onPress={() => {
							navigation.navigate("Details", {
								idReservation: item.id,
							});
						}}
					>
						<Text style={{ fontFamily: "Inter_300Light" }}>
							VER DETALLE
						</Text>
					</Button>
					{item.estado == "Cita expirada." &&
					item.reclamo.length == 0 ? (
						<Button
							icon="emoticon-sad-outline"
							color="orange"
							onPress={() => {
								navigation.navigate("Reclaim", {
									idReservation: item.id,
								});
							}}
						>
							<Text style={{ fontFamily: "Inter_300Light" }}>
								RECLAMO
							</Text>
						</Button>
					) : (
						<></>
					)}
					{item.estado == "Cita apunto de expirar." ||
					item.estado == "En proceso." ||
					item.estado ==
						"Solicitada por un cliente (o usted)." ? (
						<Button
							onPress={() => handleAlert("show", true)}
							color="red"
							icon="close-octagon"
						>
							<Text style={{ fontFamily: "Inter_300Light" }}>
								CANCELAR CITA
							</Text>
						</Button>
					) : (
						<></>
					)}
				</Card.Actions>
			</Card>

			<AwesomeAlert
				title="MULTICOM"
				closeOnTouchOutside={false}
				closeOnHardwareBackPress={false}
				show={awesomeAlertFrom.show}
				message="¿Desea cancelar la cita?"
				confirmText={"Aceptar"}
				showConfirmButton={true}
				cancelText={"Cancelar"}
				showCancelButton={true}
				confirmButtonColor="#1c243c"
				onCancelPressed={() => handleAlert("show", false)}
				onConfirmPressed={() => cancelReservation(item.id)}
			/>
		</>
	);
};

const styles = StyleSheet.create({
	itemContainer: {
		marginVertical: "2%",
		marginHorizontal: "4%",
		flexDirection: "row",
		alignItems: "center",
		borderRadius: 15,
		width: "92%",

		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 3,
		},
		shadowOpacity: 0.27,
		shadowRadius: 4.65,

		elevation: 9,
	},
});

export default FlatItem;
