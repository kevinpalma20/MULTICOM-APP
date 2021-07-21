import React from "react";
import { ActivityIndicator, View, StyleSheet } from "react-native";

const style = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
});

function LoadIng({ loading, children }) {
	if (loading) {
		return (
			<View style={style.container}>
				<ActivityIndicator size="large" color="#1c243c" />
			</View>
		);
	}
	return children;
}

export default LoadIng;
