import React from "react";
import { ScrollView, Platform } from "react-native";
import { Text, Card, Button, TextInput } from "react-native-paper";

import { Container } from "../../../../components/Elements/general/ScreenContainer";

import axios from "axios";
import AwesomeAlert from "react-native-awesome-alerts";
import DateTimePicker from "@react-native-community/datetimepicker";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const Create = () => {
	const today = new Date();
	const [date, setDate] = React.useState(new Date(today));

	const [fecha, setFecha] = React.useState("");
	const [horaIn, setHoraIn] = React.useState("");
	const [horaFin, setHoraFin] = React.useState("");
	const [proposito, setProposito] = React.useState("");

	const [loading, setLoading] = React.useState(false);

	const [mode, setMode] = React.useState("date");
	const [show, setShow] = React.useState(false);

	const [STATE, setSTATE] = React.useState("");

	const onChange = (event, selectedDate) => {
		const currentDate = selectedDate || date;
		setShow(Platform.OS === "ios");

		if (STATE == "fecha") {
			setDate(currentDate);
			setFecha(extracDate(currentDate));
		}
		if (STATE == "horaA") setHoraIn(extracTime(currentDate));
		if (STATE == "horaB") setHoraFin(extracTime(currentDate));
	};

	const extracTime = (varibleDate) => {
		let hours = varibleDate.getHours().toString();
		let minutes = varibleDate.getMinutes().toString();

		if (hours >= 0 && hours <= 9) hours = "0" + hours;
		if (minutes >= 0 && minutes <= 9) minutes = "0" + minutes;

		return hours + ":" + minutes;
	};

	const extracDate = (varibleDate) => {
		return varibleDate.toISOString().substr(0, 10);
	};

	const showMode = (currentMode) => {
		setShow(true);
		setMode(currentMode);
	};

	const showDatepicker = () => {
		showMode("date");
		setSTATE("fecha");
	};

	const showTimepickerA = () => {
		showMode("time");
		setSTATE("horaA");
	};

	const showTimepickerB = () => {
		showMode("time");
		setSTATE("horaB");
	};

	const clearInputs = () => {
		setFecha("");
		setHoraIn("");
		setHoraFin("");
		setProposito("");
	};

	const sendReservation = () => {
		setLoading(true);
		try {
		} catch (error) {}
	};

	React.useEffect(() => {});

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
					FORMULARIO
				</Text>
				<Card.Content style={{ paddingVertical: "2%" }}>
					<ScrollView>
						<TextInput
							mode="outlined"
							style={{ width: "100%" }}
							theme={{ colors: { primary: "#1c243c" } }}
							placeholder="Selecione una fecha"
							right={<TextInput.Icon name="calendar" onPress={showDatepicker} />}
							value={fecha}
							editable={false}
						/>
						<TextInput
							mode="outlined"
							style={{ width: "100%" }}
							theme={{ colors: { primary: "#1c243c" } }}
							placeholder="Selecione una hora de inicio"
							right={<TextInput.Icon name="clock" onPress={showTimepickerA} />}
							value={horaIn}
							editable={false}
						/>

						<TextInput
							mode="outlined"
							style={{ width: "100%" }}
							theme={{ colors: { primary: "#1c243c" } }}
							placeholder="Selecione una hora final"
							right={<TextInput.Icon name="clock" onPress={showTimepickerB} />}
							value={horaFin}
							editable={false}
						/>

						<TextInput
							mode="outlined"
							value={proposito}
							onChangeText={(text) => setProposito(text)}
							style={{ width: "100%" }}
							theme={{ colors: { primary: "#1c243c" } }}
							placeholder="¿Algún motivo?"
							multiline={true}
							numberOfLines={4}
							right={<TextInput.Icon name="text" />}
						/>

						{show && (
							<DateTimePicker
								testID="dateTimePicker"
								value={date}
								mode={mode}
								is24Hour={true}
								display="spinner"
								onChange={onChange}
							/>
						)}
					</ScrollView>
				</Card.Content>
				<Card.Actions>
					<Button
						style={{ width: "40%", marginHorizontal: "5%" }}
						theme={{ colors: { primary: "#1c243c" } }}
						onPress={sendReservation}
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
		</Container>
	);
};
