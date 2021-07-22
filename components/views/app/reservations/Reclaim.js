import React from "react";
import { Text, View, StyleSheet } from "react-native";
import {
	Button,
	Card,
	Title,
	TextInput,
} from "react-native-paper";

import LoadIng from "../../../../components/Elements/general/Loading";
import { time } from "../../../../context/time"; //

import axios from "axios";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AwesomeAlert from "react-native-awesome-alerts";

export const Reclaim = ({ route }) => {
	const { idReservation } = route.params;
	const [STATE, setSTATE] = React.useState(true);
	const [awesomeAlertFrom, setAwesomeAlert1From] =
		React.useState({
			show: false,
		});

	const [motivo, setMotivo] = React.useState("Tardanza.");
	const [descripcion, setDescripcion] = React.useState(
		"Tardanza por parte del administrador, nunca me envió un enlace para reunirnos.",
	);

	const [loading, setLoading] = React.useState(false);

	const reclaimReservation = async () => {
		let mssg = "";
		let type = "success";
		var token = await AsyncStorage.getItem("TOKEN");
		setLoading(true);

		try {
			const res = await axios.post(
				"/Reservation/complainByCLient",
				{
					idreserva: idReservation,
					motivo: motivo,
					descripcion: descripcion,
				},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				},
			);
			mssg = res.data.mensaje;
		} catch (error) {
			mssg = error.response.data.mensaje;
			type = "error";
		} finally {
			Toast.show({
				type: type,
				position: "bottom",
				text1: "MULTICOM",
				text2: mssg,
				visibilityTime: 4000,
				autoHide: true,
				bottomOffset: 40,
			});
			setLoading(false);
			setAwesomeAlert1From({ show: false });
		}
	};

	{
		/* {
    "idreserva": 35,
    "motivo":"Impuntualidad",
    "descripcion":"El encargado tardo en realizar la reunión."
    } */
	}

	const clearInputs = () => {
		setMotivo("");
		setDescripcion("");
	};

	React.useEffect(() => {
		setTimeout(() => {
			setSTATE(false);
		}, time);
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
							Formulario para hacer reclamo
						</Title>
						<Card.Content>
							<TextInput
								value={motivo}
								onChangeText={(text) => setMotivo(text)}
								mode="outlined"
								style={{ width: "100%" }}
								theme={{ colors: { primary: "#1c243c" } }}
								placeholder="¿Algún motivo?"
								right={<TextInput.Icon name="text" />}
							/>
							<TextInput
								value={descripcion}
								onChangeText={(text) => setDescripcion(text)}
								multiline={true}
								numberOfLines={4}
								mode="outlined"
								style={{ width: "100%" }}
								theme={{ colors: { primary: "#1c243c" } }}
								placeholder="¿Algún motivo?"
								right={<TextInput.Icon name="text" />}
							/>
						</Card.Content>
						<Card.Actions>
							<Button
								style={{ width: "40%", marginHorizontal: "5%" }}
								theme={{ colors: { primary: "#1c243c" } }}
								onPress={() => setAwesomeAlert1From({ show: true })}
								loading={loading}
								mode="contained"
							>
								<Text style={{ color: "#ead42d" }}>Confirmar</Text>
							</Button>
							<Button
								style={{ width: "40%", marginHorizontal: "5%" }}
								onPress={clearInputs}
							>
								<Text style={{ color: "#1c243c" }}>Limpiar</Text>
							</Button>
						</Card.Actions>
					</Card>

					<AwesomeAlert
						title="MULTICOM"
						closeOnTouchOutside={false}
						closeOnHardwareBackPress={false}
						show={awesomeAlertFrom.show}
						message="¿Desea relizar el reclamo?"
						confirmText={"Aceptar"}
						showConfirmButton={true}
						cancelText={"Cancelar"}
						showCancelButton={true}
						confirmButtonColor="#1c243c"
						onCancelPressed={() =>
							setAwesomeAlert1From({ show: false })
						}
						onConfirmPressed={() => reclaimReservation()}
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
