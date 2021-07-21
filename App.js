import React from "react";
import { StatusBar, useWindowDimensions, View } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";

import { time } from "./context/time";
import { AuthContext } from "./context/context";
import LoadIng from "./components/Elements/general/Loading";
import { IconMulticom } from "./components/Elements/general/IconMulticom";

import { SignIn } from "./components/views/auth/SignIn";
import { signUp } from "./components/views/auth/SignUp";
import { Recovery } from "./components/views/auth/Recovery";

import { Profile } from "./components/views/profile/Profile";
import { UpdatePassword } from "./components/views/profile/UpdatePassword";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { isJwtExpired } from "jwt-check-expiration";

import { Create } from "./components/views/app/reservations/Create";
import { Details } from "./components/views/app/reservations/Details";
import { Reclaim } from "./components/views/app/reservations/Reclaim";

import { Search } from "./screens/screens";
import { Home } from "./components/views/app/Home";

import Toast from "react-native-toast-message";
import axios from "axios";

import {
	useFonts,
	Inter_100Thin,
	Inter_200ExtraLight,
	Inter_300Light,
	Inter_400Regular,
	Inter_500Medium,
	Inter_600SemiBold,
	Inter_700Bold,
	Inter_800ExtraBold,
	Inter_900Black,
} from "@expo-google-fonts/inter";

axios.defaults.baseURL = "http://192.168.43.69:8080";
//axios.defaults.baseURL = "http://192.168.1.6:8080";
//axios.defaults.baseURL = "http://localhost:8080";

const AuthStack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tabs = createBottomTabNavigator();
const HomeStack = createStackNavigator();
const RootStack = createStackNavigator();
const CancelStack = createStackNavigator();
const ProfileStack = createStackNavigator();

const AuthStackScreen = () => (
	<AuthStack.Navigator
		screenOptions={{
			title: "MULTICOM",
			headerTintColor: "#ead42d",
			headerStyle: { backgroundColor: "#1c243c" },
		}}
	>
		<AuthStack.Screen
			name="SignIn"
			component={SignIn}
			options={{
				headerLeft: () => <IconMulticom />,
			}}
		/>
		<AuthStack.Screen name="CreateAccount" component={signUp} />
		<AuthStack.Screen name="RecoveryPassword" component={Recovery} />
	</AuthStack.Navigator>
);

const HomeStackScreen = () => (
	<HomeStack.Navigator
		screenOptions={{
			headerTintColor: "#ead42d",
			headerStyle: { backgroundColor: "#1c243c" },
		}}
	>
		<HomeStack.Screen
			name="Home"
			component={Home}
			options={{
				headerTitle: "MENÚ",
				headerLeft: () => <IconMulticom />,
			}}
		/>

		<HomeStack.Screen
			name="Create"
			component={Create}
			options={{ headerTitle: "Crear una cita" }}
		/>

		<HomeStack.Screen
			name="Details"
			component={Details}
			options={{ headerTitle: "Sección de detalle" }}
		/>

		<HomeStack.Screen
			name="Reclaim"
			component={Reclaim}
			options={{ headerTitle: "Sección de Reclamo" }}
		/>
	</HomeStack.Navigator>
);

const HomeCancelStack = () => (
	<CancelStack.Navigator
		screenOptions={{
			headerTintColor: "#ead42d",
			headerStyle: { backgroundColor: "#1c243c" },
		}}
	>
		<CancelStack.Screen
			name="Search"
			component={Search}
			options={{
				headerTitle: "MENÚ",
				headerLeft: () => <IconMulticom />,
			}}
		/>

		<CancelStack.Screen
			name="Details"
			component={Details}
			options={{ headerTitle: "Sección de detalle" }}
		/>
	</CancelStack.Navigator>
);

const ProfileStackScreen = () => (
	<ProfileStack.Navigator
		screenOptions={{
			headerTintColor: "#ead42d",
			headerStyle: { backgroundColor: "#1c243c" },
		}}
	>
		<ProfileStack.Screen
			name="Profile"
			component={Profile}
			options={{
				headerTitle: "MIS DATOS",
				headerLeft: () => <IconMulticom />,
			}}
		/>
		<ProfileStack.Screen
			name="UpPassword"
			component={UpdatePassword}
			options={{ headerTitle: "MIS DATOS" }}
		/>
	</ProfileStack.Navigator>
);

const TabsScreen = () => (
	<Tabs.Navigator
		initialRouteName="Home"
		tabBarOptions={{
			labelStyle: { fontSize: 12 },
			style: {
				height: "10%",
				backgroundColor: "white",
			},
			activeTintColor: "#1c243c",
		}}
	>
		<Tabs.Screen
			name="Home"
			options={{
				tabBarLabel: "Menu",
				tabBarIcon: ({ color }) => (
					<MaterialCommunityIcons color={color} name="file" size={25} />
				),
			}}
			component={HomeStackScreen}
		/>
		<Tabs.Screen
			name="Search"
			options={{
				tabBarLabel: "Citas canceladas",
				tabBarIcon: ({ color }) => (
					<MaterialCommunityIcons color={color} name="cancel" size={25} />
				),
			}}
			component={HomeCancelStack}
		/>
	</Tabs.Navigator>
);

const DrawerScreen = () => {
	const dimensions = useWindowDimensions();

	return (
		<Drawer.Navigator
			initialRouteName="Home"
			drawerContentOptions={{
				activeTintColor: "#1c243c",
				inactiveTintColor: "#9c9b95",
				inactiveBackgroundColor: "white",
				activeBackgroundColor: "#ead42d",

				labelStyle: {
					marginLeft: 6,
					fontWeight: "700",
					fontSize: 17,
				},
			}}
			drawerType={dimensions.width >= 768 ? "permanent" : "front"}
			overlayColor={dimensions.width >= 768 ? "transparent" : "rgba(0, 0, 0, 0.7)"}
		>
			<Drawer.Screen
				name="Home"
				component={TabsScreen}
				//component={HomeStackScreen}
				options={{
					title: "Mi menú",
					drawerIcon: ({ color }) => (
						<MaterialCommunityIcons color={color} name="home" size={25} />
					),
				}}
			/>
			<Drawer.Screen
				name="Profile"
				component={ProfileStackScreen}
				options={{
					title: "Mi perfil",
					drawerIcon: ({ color }) => (
						<MaterialCommunityIcons color={color} name="face-profile" size={25} />
					),
				}}
			/>
		</Drawer.Navigator>
	);
};

const RootStackScreen = ({ verifyToken }) => (
	<RootStack.Navigator headerMode="none">
		{verifyToken ? (
			<RootStack.Screen
				name="Auth"
				component={AuthStackScreen}
				options={{ animationEnabled: true }}
			/>
		) : (
			<RootStack.Screen
				name="App"
				component={DrawerScreen}
				options={{ animationEnabled: true }}
			/>
		)}
	</RootStack.Navigator>
);

export default () => {
	let [fontsLoaded] = useFonts({
		Inter_100Thin,
		Inter_200ExtraLight,
		Inter_300Light,
		Inter_400Regular,
		Inter_500Medium,
		Inter_600SemiBold,
		Inter_700Bold,
		Inter_800ExtraBold,
		Inter_900Black,
	});

	const [isLoading, setIsLoading] = React.useState(true);
	const [userToken, setUserToken] = React.useState(null);

	async function tokenExpired() {
		try {
			let _token = await AsyncStorage.getItem("TOKEN");
			return isJwtExpired(_token);
		} catch (error) {
			return true;
		}
	}

	const authContext = React.useMemo(() => {
		tokenExpired().then((response) => {
			setUserToken(response);
		});
		return {
			signIn: () => setUserToken(false),
			signOut: () => setUserToken(true),
		};
	}, []);

	React.useEffect(() => {
		setTimeout(() => {
			setIsLoading(false);
		}, time);
		tokenExpired().then((response) => {
			setUserToken(response);
		});
	}, []);

	return (
		<View style={{ flex: 1, justifyContent: "space-around" }}>
			<LoadIng loading={isLoading}>
				<AuthContext.Provider value={authContext}>
					<StatusBar backgroundColor="#ead42d" barStyle={"dark-content"} />
					<NavigationContainer>
						<RootStackScreen verifyToken={userToken} />
					</NavigationContainer>
				</AuthContext.Provider>
				<Toast ref={(ref) => Toast.setRef(ref)} />
			</LoadIng>
		</View>
	);
};
