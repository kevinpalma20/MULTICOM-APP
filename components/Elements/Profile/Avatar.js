import React from "react";
import nameAvatar from "../../../services/nameAvatar";
import { Avatar } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const MyAvatar = () => {
  const [avatarFrom, setAvatarFrom] = React.useState({
    firstname: "",
    lastname: "",
  });

  const dataProfile = async () => {
    const objectData = JSON.parse(await AsyncStorage.getItem("USERD"));
    setAvatarFrom({
      firstname: objectData.nombre,
      lastname: objectData.apellido,
    });
  };

  const _avatarName = nameAvatar(avatarFrom.firstname, avatarFrom.lastname);

  React.useEffect(() => {
    dataProfile();
  }, []);

  return (
    <Avatar.Text
      style={{ backgroundColor: "#ead42d" }}
      color="#1c243c"
      size={50}
      label={_avatarName}
    />
  );
};
