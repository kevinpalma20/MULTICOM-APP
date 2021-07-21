import React from "react";
import { Card, TextInput, Text, Button } from "react-native-paper";

import { AuthContext } from "../../../context/context";
import { Container } from "../../Elements/general/ScreenContainer";

import axios from "axios";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const SignIn = ({ navigation }) => {
	const { signIn } = React.useContext(AuthContext);

	const [form, setForm] = React.useState({
		email: "bebarmyga@gmail.com",
		password: "contraseña@21",
	});

	const [secureTextEntry, setSecureTextEntry] = React.useState(true);

	const [loadingBtn, setLoadingBtn] = React.useState(false);

	const clearInputs = async () => {
		setForm({
			email: "",
			password: "",
		});
	};

	const _SignIn = async () => {
		let message = "";
		setLoadingBtn(true);

		try {
			const res = await axios.post("/auth/clients", {
				email: form.email,
				password: form.password,
			});

			await AsyncStorage.setItem("TOKEN", res.data.token);
			await AsyncStorage.setItem("USERD", JSON.stringify(res.data.userDetails));
			signIn();
		} catch (error) {
			message = error.response.data.mensaje;

			Toast.show({
				type: "error",
				position: "bottom",
				text1: "MULTICOM",
				text2: message,
				visibilityTime: 4000,
				autoHide: true,
				bottomOffset: 40,
			});

			clearInputs();
			setLoadingBtn(false);
		}
	};

	const handleChange = (name, value) => setForm({ ...form, [name]: value });

	React.useEffect(() => {}, []);

	return (
		<Container>
			<Card style={{ paddingVertical: "5%" }}>
				<Text
					style={{
						paddingVertical: "2%",
						paddingHorizontal: "4%",
						fontSize: 30,
						color: "#1c243c",
						backgroundColor: "white",
					}}
				>
					INICIO DE SESIÓN
				</Text>
				<Card.Content style={{ paddingVertical: "2%" }}>
					<TextInput
						value={form.email}
						onChangeText={(text) => handleChange("email", text)}
						style={{ paddingVertical: "2%" }}
						mode="outlined"
						label="Correo electrónico"
						theme={{ colors: { primary: "#1c243c" } }}
						right={<TextInput.Icon name="email" />}
					/>
					<TextInput
						value={form.password}
						onChangeText={(text) => handleChange("password", text)}
						style={{ paddingVertical: "2%" }}
						mode="outlined"
						label="Contraseña"
						theme={{ colors: { primary: "#1c243c" } }}
						right={
							<TextInput.Icon
								name="eye"
								onPress={() => setSecureTextEntry(!secureTextEntry)}
							/>
						}
						secureTextEntry={secureTextEntry}
					/>
				</Card.Content>
				<Card.Actions
					style={{
						paddingVertical: "2%",
						paddingHorizontal: "4%",
					}}
				>
					<Button
						loading={loadingBtn}
						onPress={_SignIn}
						style={{ width: "50%" }}
						mode="contained"
						theme={{ colors: { primary: "#1c243c" } }}
					>
						<Text style={{ color: "#ead42d" }}>Iniciar sesión</Text>
					</Button>
					<Button
						onPress={() => navigation.push("CreateAccount")}
						style={{ width: "50%" }}
						theme={{ colors: { primary: "#1c243c" } }}
					>
						<Text style={{ color: "#1c243c" }}>Registrarse</Text>
					</Button>
				</Card.Actions>
				<Button
					onPress={() => navigation.push("RecoveryPassword")}
					style={{ width: "100%", marginTop: "5%" }}
					theme={{ colors: { primary: "#1c243c" } }}
				>
					<Text style={{ color: "#1c243c" }}>¿Olvidó su contraseña?</Text>
				</Button>
			</Card>
		</Container>
	);
};
