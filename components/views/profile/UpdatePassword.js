import React from "react";
import { ScrollView } from "react-native";
import { Text, Button, Card, TextInput, Title } from "react-native-paper";

import { Container } from "../../Elements/general/ScreenContainer";
import { CardAlert } from "../../Elements/general/CardAlert";
import { AuthContext } from "../../../context/context";

import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import AwesomeAlert from "react-native-awesome-alerts";

export const UpdatePassword = () => {
	const { signOut } = React.useContext(AuthContext);

	const [groupPasswords, setGroupPasswords] = React.useState({
		passwordOld: "contraseña@2",
		passwordNew: "contraseña@21",
		passwordConfirm: "contraseña@21",
	});

	const [securePasswords, setSecurePasswords] = React.useState({
		securityPasswordOld: true,
		securityPasswordNew: true,
		securityPasswordConfirm: true,
	});

	const [loadingButton, setLoadingBtn] = React.useState(false);

	const [awesomeAlertFrom, setAwesomeAlert1From] = React.useState({
		show: false,
		message: "",
	});

	const handleText = (name, value) =>
		setGroupPasswords({ ...groupPasswords, [name]: value });

	const handleSecure = (name, value) =>
		setSecurePasswords({ ...securePasswords, [name]: value });

	const RightContent = (nameProp, valProp) => (
		<TextInput.Icon name="eye" onPress={() => handleSecure(nameProp, valProp)} />
	);

	const TextSecure = ({
		inputLabel,
		value,
		propVal,
		secureProp,
		securePropName,
		valSecure,
	}) => {
		return (
			<TextInput
				label={inputLabel}
				style={{ marginBottom: "5%" }}
				value={value}
				theme={{ colors: { primary: "#1c243c" } }}
				secureTextEntry={secureProp}
				onChangeText={(text) => handleText(propVal, text)}
				right={RightContent(securePropName, valSecure)}
			/>
		);
	};

	const clearInputs = () => {
		try {
			setGroupPasswords({
				passwordOld: "",
				passwordNew: "",
				passwordConfirm: "",
			});
			setSecurePasswords({
				securityPasswordOld: true,
				securityPasswordNew: true,
				securityPasswordConfirm: true,
			});
		} catch (error) {
			return;
		}
	};

	const changePassword = async () => {
		const userDetails = JSON.parse(await AsyncStorage.getItem("USERD"));
		const token = await AsyncStorage.getItem("TOKEN");
		let msg = "";
		setLoadingBtn(true);
		try {
			const res = await axios.post(
				"/Update/Password/" + userDetails.id,
				{
					oldPassword: groupPasswords.passwordOld,
					newPassword: groupPasswords.passwordNew,
					confirmPassword: groupPasswords.passwordConfirm,
				},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				},
			);

			setTimeout(function () {
				setLoadingBtn(false);
				AsyncStorage.clear();
				signOut();
			}, 3000);
		} catch (error) {
			msg = error.response.data.mensaje;
			setAwesomeAlert1From({ show: true, message: msg });
			setLoadingBtn(false);
		}
	};

	return (
		<Container>
			<Title
				style={{
					paddingVertical: "2%",
					paddingHorizontal: "4%",
					fontSize: 30,
					color: "#1c243c",
				}}
			>
				Actualizar contraseña
			</Title>
			<CardAlert
				title="Advertencia"
				subtitle="Se cerrará su sesión, al cambiar su contraseña."
				icon="lock"
				elevation={5}
			/>
			<ScrollView>
				<Card>
					<Card.Content>
						<TextSecure
							propVal="passwordOld"
							inputLabel="Contraseña antigua"
							value={groupPasswords.passwordOld}
							securePropName="securityPasswordOld"
							secureProp={securePasswords.securityPasswordOld}
							valSecure={!securePasswords.securityPasswordOld}
						/>
						<TextSecure
							propVal="passwordNew"
							inputLabel="Nueva contraseña"
							value={groupPasswords.passwordNew}
							securePropName="securityPasswordNew"
							secureProp={securePasswords.securityPasswordNew}
							valSecure={!securePasswords.securityPasswordNew}
						/>
						<TextSecure
							propVal="passwordConfirm"
							inputLabel="Confirmar contraseña"
							value={groupPasswords.passwordConfirm}
							securePropName="securityPasswordConfirm"
							valSecure={!securePasswords.securityPasswordConfirm}
							secureProp={securePasswords.securityPasswordConfirm}
						/>
					</Card.Content>
					<Card.Actions>
						<Button
							loading={loadingButton}
							color="#1c243c"
							mode="contained"
							style={{ width: "50%" }}
							onPress={changePassword}
						>
							<Text style={{ color: "#ead42d" }}>Guardar cambios</Text>
						</Button>
						<Button color="#1c243c" style={{ width: "50%" }} onPress={clearInputs}>
							<Text>Limpiar</Text>
						</Button>
					</Card.Actions>
				</Card>
			</ScrollView>
			<AwesomeAlert
				title="MULTICOM"
				showProgress={true}
				closeOnTouchOutside={false}
				closeOnHardwareBackPress={false}
				show={awesomeAlertFrom.show}
				message={awesomeAlertFrom.message}
				confirmText={"Aceptar"}
				showConfirmButton={true}
				confirmButtonColor="#1c243c"
				onConfirmPressed={() => {
					setAwesomeAlert1From({ show: false });
				}}
			/>
		</Container>
	);
};
