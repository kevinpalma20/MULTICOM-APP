import React from "react";
import { Card, TextInput, Text, Button, Avatar } from "react-native-paper";

import { Container } from "../../Elements/general/ScreenContainer";
import { CardAlert } from "../../Elements/general/CardAlert";

import axios from "axios";
import Toast from "react-native-toast-message";
import AwesomeAlert from "react-native-awesome-alerts";

export const Recovery = ({ navigation }) => {
	const [email, setEmail] = React.useState("");

	const [loadingBtn, setLoadingBtn] = React.useState(false);

	const [awesomeAlert, setAwesomeAlert] = React.useState({
		showAlert: false,
		message: "",
		title: "",
		btnCancel: true,
		btnConfirm: true,
		textCancel: "",
		textConfirm: "",
		closeTouchOutside: true,
	});

	const viewAlert = async () => {
		setAwesomeAlert({
			showAlert: true,
			btnCancel: true,
			textCancel: "Cancelar",
			btnConfirm: true,
			textConfirm: "Aceptar",
			title: "MULTICOM",
			message: "¿Seguro que quiere reestabler su contraseña?",
		});
	};

	const recoveryPassowrd = async () => {
		let message = "";
		setAwesomeAlert({ showAlert: false });

		try {
			const res = await axios.post("/recovery/password", {
				email: email,
			});
			mensaje = res.data.mensaje;
		} catch (error) {
			message = error.response.data.mensaje;
		} finally {
			Toast.show({
				type: "error",
				position: "bottom",
				text1: "MULTICOM",
				text2: message,
				visibilityTime: 4000,
				autoHide: true,
				bottomOffset: 40,
			});
			setLoadingBtn(false);
			setEmail("");
		}
	};

	return (
		<Container>
			<Card style={{ paddingVertical: "5%" }}>
				<Text
					style={{
						paddingVertical: "2%",
						paddingHorizontal: "4%",
						fontSize: 30,
						color: "#1c243c",
					}}
				>
					RECUPERAR CONTRASEÑA
				</Text>
				<CardAlert
					title="Advertencia!"
					subtitle="Se reestablecerá su contraseña, revise su gmail."
					icon="alert"
					elevation={5}
				/>
				<Card.Content style={{ paddingVertical: "2%" }}>
					<TextInput
						value={email}
						onChangeText={setEmail}
						style={{ paddingVertical: "2%" }}
						mode="outlined"
						label="Correo electrónico"
						theme={{ colors: { primary: "#1c243c" } }}
						right={<TextInput.Icon name="email" />}
					/>
				</Card.Content>
				<Card.Actions>
					<Button
						loading={loadingBtn}
						onPress={viewAlert}
						style={{ width: "100%" }}
						mode="contained"
						theme={{ colors: { primary: "#1c243c" } }}
					>
						<Text style={{ color: "#ead42d" }}>Recuperar contraseña</Text>
					</Button>
				</Card.Actions>
			</Card>

			<AwesomeAlert
				show={awesomeAlert.showAlert}
				title={awesomeAlert.title}
				message={awesomeAlert.message}
				cancelText={awesomeAlert.textCancel}
				confirmText={awesomeAlert.textConfirm}
				showCancelButton={awesomeAlert.btnCancel}
				showConfirmButton={awesomeAlert.btnConfirm}
				onCancelPressed={() => setAwesomeAlert({ showAlert: false })}
				onConfirmPressed={recoveryPassowrd}
				confirmButtonColor="#1c243c"
				closeOnTouchOutside={awesomeAlert.closeTouchOutside}
			/>
		</Container>
	);
};
