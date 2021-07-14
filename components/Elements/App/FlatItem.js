import React from "react";
import { Button, Snackbar } from "react-native-paper";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";

import axios from "axios";
import AwesomeAlert from "react-native-awesome-alerts";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const FlatItem = ({ item }) => {
	const [awesomeAlertFrom, setAwesomeAlert1From] = React.useState({
		show: false,
	});

	const [awesomeAlertFrom1, setAwesomeAlert1From1] = React.useState({
		show: false,
		message: "",
	});

	const handleAlert = (name, value) =>
		setAwesomeAlert1From({ ...awesomeAlertFrom, [name]: value });

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
			//console.log(res.data.mensaje);
			mssg = res.data.mensaje;
		} catch (error) {
			mssg = error.response.data.mensaje;
		} finally {
			setAwesomeAlert1From1({ show: true, message: mssg });
		}
	};

	React.useEffect(() => {}, []);

	return (
		<View style={styles.itemContainer}>
			<TouchableOpacity>
				<Text>{item.fecha}</Text>
				<View style={{ flexDirection: "row" }}>
					<Text style={{ color: "#8395a7" }}>{item.horaInicio}</Text>
					<Text style={{ color: "#8395a7", marginLeft: "5%" }}>{item.horaFin}</Text>
				</View>
				{/* <Text style={styles.itemTitle}>{task.title}</Text>
				<Text style={{ color: "#8395a7" }}>{task.description}</Text> */}
			</TouchableOpacity>
			<Button style={{ padding: 1, borderRadius: 5 }} color="#1c243c">
				<Text>RECLAMO</Text>
			</Button>
			<Button
				style={{ padding: 3, borderRadius: 5 }}
				onPress={() => handleAlert("show", true)}
				//onPress={onToggleSnackBar}
				color="red"
				icon="close-octagon"
			>
				<Text style={{ color: "red" }}>CANCELAR</Text>
			</Button>
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
	);
};

const styles = StyleSheet.create({
	itemContainer: {
		backgroundColor: "white",
		padding: 20,
		marginVertical: 8,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		borderRadius: 5,

		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 3,
		},
		shadowOpacity: 0.27,
		shadowRadius: 4.65,

		elevation: 6,
	},
});

export default FlatItem;
