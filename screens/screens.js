import React from "react";
import { Container } from "../components/Elements/general/ScreenContainer";
import { Text, Button } from "react-native-paper";

export const Details = ({ route }) => (
  <Container>
    <Text>Details Screen</Text>
    {route.params.name && <Text>{route.params.name}</Text>}
  </Container>
);

export const Search = ({ navigation }) => (
  <Container>
    <Text>Search Screen</Text>
    <Button></Button>
    {/* <Button title="Search 2" onPress={() => navigation.push("Search2")} />
        <Button title="React Native School" onPress={() => { navigation.navigate("Home", { screen: "Details", params:{ name: "React Native School" } })}} /> */}
  </Container>
);

export const Search2 = () => (
  <Container>
    <Text>Search2 Screen</Text>
  </Container>
);
