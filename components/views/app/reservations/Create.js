import React from "react";
import { ScrollView, View, Platform } from "react-native";
import { Text, Card, Button } from "react-native-paper";

import { Container } from "../../../../components/Elements/general/ScreenContainer";

import DateTimePicker from "@react-native-community/datetimepicker";

export const Create = () => {
	const today = new Date();

	const [date, setDate] = React.useState(new Date(today));
	const [mode, setMode] = React.useState("date");
	const [show, setShow] = React.useState(false);

	const onChange = (event, selectedDate) => {
		const currentDate = selectedDate || date;
		setShow(Platform.OS === "ios");
		setDate(currentDate);
		console.log(currentDate);
	};

	const showMode = (currentMode) => {
		setShow(true);
		setMode(currentMode);
	};

	const showDatepicker = () => {
		showMode("date");
	};

	const showTimepicker = () => {
		showMode("time");
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
						<View>
							<Button onPress={showDatepicker}>
								<Text>Seleccione una fecha</Text>
							</Button>
							<Button onPress={showTimepicker}>
								<Text>Seleccione una hora de inicio</Text>
							</Button>
							<Button onPress={showTimepicker}>
								<Text>Seleccione una hora final</Text>
							</Button>
						</View>
						{show && (
							<DateTimePicker
								testID="dateTimePicker"
								value={date}
								mode={mode}
								is24Hour={true}
								display="default"
								onChange={onChange}
							/>
						)}
					</ScrollView>
				</Card.Content>
			</Card>
		</Container>
	);
};
