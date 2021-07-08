import React from "react";
import { Text, Button, Card, Menu } from "react-native-paper";

import { Container } from "../../Elements/general/ScreenContainer";
import { AuthContext } from "../../../context/context";

import { MyAvatar } from "../../Elements/Profile/Avatar";

import AsyncStorage from "@react-native-async-storage/async-storage";

export const Profile = ({ navigation }) => {
  const { signOut } = React.useContext(AuthContext);

  const LeftContent = () => <MyAvatar />;

  const [loading, setLoading] = React.useState(false);

  const [form, setForm] = React.useState({
    nombre: "",
    apellido: "",
    correo: "",
    numero: "",
  });

  const dataProfile = async () => {
    const user = JSON.parse(await AsyncStorage.getItem("USERD"));
    setForm({
      nombre: user.nombre,
      apellido: user.apellido,
      correo: user.username,
      numero: user.numero,
    });
  };

  const closeSession = async () => {
    setLoading(true);
    setTimeout(function () {
      setLoading(false);
      AsyncStorage.clear();
      signOut();
    }, 3000);
  };

  React.useEffect(() => {
    dataProfile();
  }, []);

  return (
    <Container style={{ height: "100%" }}>
      <Card.Title
        title={form.nombre}
        subtitle={form.apellido}
        left={LeftContent}
      />
      <Menu.Item icon="email" title={form.correo} />
      <Menu.Item icon="cellphone" title={form.numero} />
      <Card.Actions>
        <Button
          icon="lock"
          color="#1c243c"
          style={{ width: "70%" }}
          onPress={() => navigation.push("UpPassword")}
        >
          <Text style={{ color: "#1c243c" }}>Cambiar de contraseña</Text>
        </Button>
        <Button
          icon="close-octagon"
          color="red"
          loading={loading}
          style={{ width: "30%" }}
          onPress={closeSession}
        >
          <Text style={{ color: "red" }}>Salir</Text>
        </Button>
      </Card.Actions>
    </Container>
  );
};
