import React from "react";
import { View } from "react-native";

export const Container = (
  { children } //
) => <View style={{ backgroundColor: "white", flex: 1 }}>{children}</View>;
