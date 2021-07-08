import React from "react";
import { Card, TextInput, Text, Button } from "react-native-paper";

import { AuthContext } from "../../../context/context";
import { Container } from "../../Elements/general/ScreenContainer";
import { LoadIng } from "../../Elements/general/Loading";

import axios from "axios";
import AwesomeAlert from "react-native-awesome-alerts";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const SignIn = ({ navigation }) => {
  const { signIn } = React.useContext(AuthContext);

  const [form, setForm] = React.useState({
    email: "bebarmyga@gmail.com",
    password: "contraseña@2",
  });

  const [secureTextEntry, setSecureTextEntry] = React.useState(true);

  const [loadingBtn, setLoadingBtn] = React.useState(false);
  const [awesomeAlert, setAwesomeAlert] = React.useState({
    showAlert: false,
    message: "",
    title: "",
    btnCancel: true,
    btnConfirm: true,
    textCancel: "",
    textConfirm: "",
    closeTouchOutside: true,
  });

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

      setAwesomeAlert({
        showAlert: true,
        message: message,
        title: "MULTICOM",
        btnConfirm: true,
        textConfirm: "Aceptar",
      });
      clearInputs();
      setLoadingBtn(false);
    }
  };

  const handleChange = (name, value) => setForm({ ...form, [name]: value });

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
          style={{ paddingVertical: "2%", paddingHorizontal: "4%" }}
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
      <AwesomeAlert
        show={awesomeAlert.showAlert}
        title={awesomeAlert.title}
        message={awesomeAlert.message}
        confirmText={awesomeAlert.textConfirm}
        showConfirmButton={awesomeAlert.btnConfirm}
        onConfirmPressed={() =>
          setAwesomeAlert({
            showAlert: false,
          })
        }
        confirmButtonColor="#1c243c"
        closeOnTouchOutside={awesomeAlert.closeTouchOutside}
      />
    </Container>
  );
};
