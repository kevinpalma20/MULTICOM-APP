import React from "react";
import { View } from "react-native";

export const Container = (
	{ children }, //
) => <View style={{ backgroundColor: "#f4f5f8", flex: 1 }}>{children}</View>;
