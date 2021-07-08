import React from "react";
import { TextInput, Card, Text, Button } from "react-native-paper";

import { AuthContext } from "../../../context/context";
import { Container } from "../../Elements/general/ScreenContainer";

import axios from "axios";
import AwesomeAlert from "react-native-awesome-alerts";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const signUp = ({ navigation }) => {
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
  const [form, setForm] = React.useState({
    nombre: "",
    apellido: "",
    numero: "",
    email: "",
  });

  const handleChange = (name, value) => setForm({ ...form, [name]: value });

  const viewAlert = async () => {
    setAwesomeAlert({
      showAlert: true,
      message: "Se le proporcionará una contraseña, revise su correo.",
      title: "MULTICOM",
      btnCancel: true,
      btnConfirm: true,
      textConfirm: "Aceptar",
      textCancel: "Cancelar",
    });
  };

  const clearInputs = async () => {
    setForm({
      nombre: "",
      apellido: "",
      numero: "",
      email: "",
    });
  };

  const _signUp = async () => {
    let message = "";
    setAwesomeAlert({ showAlert: false });
    setLoadingBtn(true);

    try {
      const res = await axios.post("/auth/register", {
        nombre: form.nombre,
        apellido: form.apellido,
        numero: form.numero,
        email: form.email,
      });
      message = res.data.mensaje;
    } catch (error) {
      message = error.response.data.mensaje;
    } finally {
      setAwesomeAlert({
        showAlert: true,
        message: message,
        title: "MULTICOM",
        btnCancel: true,
        textCancel: "Ok",
      });
      clearInputs();
      setLoadingBtn(false);
    }
  };

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
          REGISTRO
        </Text>
        <Card.Content style={{ paddingVertical: "2%" }}>
          <TextInput
            value={form.nombre}
            onChangeText={(text) => handleChange("nombre", text)}
            style={{ paddingVertical: "2%" }}
            mode="outlined"
            label="Nombre(s)"
            theme={{ colors: { primary: "#1c243c" } }}
            right={<TextInput.Icon name="text" />}
          />
          <TextInput
            value={form.apellido}
            onChangeText={(text) => handleChange("apellido", text)}
            style={{ paddingVertical: "2%" }}
            mode="outlined"
            label="Apellido(s)"
            theme={{ colors: { primary: "#1c243c" } }}
            right={<TextInput.Icon name="text" />}
          />
          <TextInput
            value={form.numero}
            keyboardType="numeric"
            maxLength={13}
            onChangeText={(text) => handleChange("numero", text)}
            style={{ paddingVertical: "2%" }}
            mode="outlined"
            label="Número"
            theme={{ colors: { primary: "#1c243c" } }}
            right={<TextInput.Icon name="cellphone" />}
          />
          <TextInput
            value={form.email}
            onChangeText={(text) => handleChange("email", text)}
            style={{ paddingVertical: "2%" }}
            mode="outlined"
            label="Correo eletrónico"
            theme={{ colors: { primary: "#1c243c" } }}
            right={<TextInput.Icon name="email" />}
          />
        </Card.Content>
        <Card.Actions
          style={{ paddingVertical: "2%", paddingHorizontal: "4%" }}
        >
          <Button
            onPress={viewAlert}
            loading={loadingBtn}
            style={{ width: "50%" }}
            mode="contained"
            theme={{ colors: { primary: "#1c243c" } }}
          >
            <Text style={{ color: "#ead42d" }}>Registrarse</Text>
          </Button>
          <Button
            onPress={clearInputs}
            style={{ width: "50%" }}
            theme={{ colors: { primary: "#1c243c" } }}
          >
            <Text style={{ color: "#1c243c" }}>Limpiar</Text>
          </Button>
        </Card.Actions>
      </Card>
      <AwesomeAlert
        show={awesomeAlert.showAlert}
        title={awesomeAlert.title}
        message={awesomeAlert.message}
        cancelText={awesomeAlert.textCancel}
        confirmText={awesomeAlert.textConfirm}
        showCancelButton={awesomeAlert.btnCancel}
        showConfirmButton={awesomeAlert.btnConfirm}
        onConfirmPressed={_signUp}
        onCancelPressed={() => setAwesomeAlert({ showAlert: false })}
        confirmButtonColor="#1c243c"
        closeOnTouchOutside={awesomeAlert.closeTouchOutside}
      />
    </Container>
  );
};
