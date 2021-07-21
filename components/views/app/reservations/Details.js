import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { Button, Card, Title } from "react-native-paper";

import LoadIng from "../../../../components/Elements/general/Loading";
import { time } from "../../../../context/time";

import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AwesomeAlert from "react-native-awesome-alerts";

export const Details = ({ route }) => {
	const [STATE, setSTATE] = React.useState(true);
	const [awesomeAlertFrom, setAwesomeAlert1From] = React.useState({
		show: false,
	});

	const [awesomeAlertFrom1, setAwesomeAlert1From1] = React.useState({
		show: false,
		message: "",
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
			setAwesomeAlert1From1({ show: true, message: mssg });
		}
	};

	const { idReservation } = route.params;
	const [detailsData, setDetailsData] = React.useState([]);
	const [reclaim, setReclaim] = React.useState([]);

	const labelText = (title, info) => (
		<View style={{ flexDirection: "row", marginVertical: "1%" }}>
			<Text
				style={{
					fontSize: 17,
					flexDirection: "column",
					fontFamily: "Inter_500Medium",
				}}
			>
				{title + ":"}
			</Text>
			<Text
				style={{
					flexDirection: "column",
					marginLeft: "1%",
					fontSize: 17,
					fontFamily: "Inter_300Light",
				}}
			>
				{info}
			</Text>
		</View>
	);

	const viewDetail = async () => {
		var token = await AsyncStorage.getItem("TOKEN");
		try {
			const res = await axios.get(
				"/Reservation/viewReservation/" + idReservation,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				},
			);

			setDetailsData(res.data);
			setReclaim(res.data.reclamo);
		} catch (error) {
			console.log(error.response.data.mensaje);
		}
	};

	React.useEffect(() => {
		setTimeout(() => {
			setSTATE(false);
		}, time);
		viewDetail();
	}, []);

	return (
		<>
			{STATE == true ? (
				<LoadIng loading={STATE} />
			) : (
				<View>
					<Card style={styles.itemContainer}>
						<Title
							style={{
								fontFamily: "Inter_600SemiBold",
								fontSize: 25,
								marginBottom: "2%",
							}}
						>
							Información de la cita
						</Title>
						<Card.Content>
							{labelText("Fecha", detailsData.fecha)}
							{labelText("Hora de inicio", detailsData.horaInicio)}
							{labelText("Hora final", detailsData.horaFin)}
							{labelText("Propocito", detailsData.proposito)}
						</Card.Content>
						<View>
							{reclaim.length == 0 ? (
								<Text
									style={{
										marginVertical: "1.5%",
										fontSize: 12,
										fontFamily: "Inter_100Thin",
									}}
								>
									No se ha realizado ningun reclamo
								</Text>
							) : (
								<>
									<Text>con reclamo</Text> <Text>Motivo: {reclaim[0].motivo} </Text>{" "}
									<Text>Descripcion: {reclaim[0].descripcion} </Text>
								</>
							)}
						</View>
						<Card.Actions>
							<Button
								color="red"
								icon="close-octagon"
								style={{ width: "100%" }}
								onPress={() => setAwesomeAlert1From({ show: true })}
							>
								<Text style={{ fontFamily: "Inter_300Light" }}>CANCELAR CITA</Text>
							</Button>
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
						onCancelPressed={() => setAwesomeAlert1From({ show: false })}
						onConfirmPressed={() => cancelReservation(detailsData.id)}
					/>

					<AwesomeAlert
						title="MULTICOM"
						closeOnTouchOutside={false}
						closeOnHardwareBackPress={false}
						show={awesomeAlertFrom1.show}
						message={awesomeAlertFrom1.message}
						confirmText={"Aceptar"}
						showConfirmButton={true}
						confirmButtonColor="#1c243c"
						onConfirmPressed={() => setAwesomeAlert1From1({ show: false })}
					/>
				</View>
			)}
		</>
	);
};
const styles = StyleSheet.create({
	itemContainer: {
		marginVertical: "2%",
		marginHorizontal: "4%",
		padding: "2%",
		flexDirection: "row",
		alignItems: "center",
		borderRadius: 7,
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
