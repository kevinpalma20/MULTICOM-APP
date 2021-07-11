import React from "react";
import { Card, Avatar } from "react-native-paper";

export const CardAlert = ({ title, subtitle, icon, elevation }) => {
	const content = (props) => (
		<Avatar.Icon
			{...props}
			icon={icon}
			theme={{ colors: { primary: "#1c243c" } }}
			color="#ead42d"
		/>
	);
	return (
		<Card elevation={elevation}>
			<Card.Title title={title} subtitle={subtitle} left={content} />
		</Card>
	);
};
