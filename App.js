import React from "react";
import { StatusBar } from "react-native";
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

import { Search, Details, Search2 } from "./screens/screens";
import { Home } from "./components/views/app/Home";

import axios from "axios";

axios.defaults.baseURL = "http://192.168.43.69:8080";
//axios.defaults.baseURL = "http://192.168.1.6:8080";
//axios.defaults.baseURL = "http://localhost:8080";

const AuthStack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tabs = createBottomTabNavigator();
const HomeStack = createStackNavigator();
const RootStack = createStackNavigator();
const SearchStack = createStackNavigator();
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
			options={{ headerLeft: () => <IconMulticom /> }}
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
			options={({ route }) => ({ title: route.params.name })}
		/>
	</HomeStack.Navigator>
);

const SearchStackScreen = () => (
	<SearchStack.Navigator>
		<SearchStack.Screen name="Search" component={Search} />
		<SearchStack.Screen name="Search2" component={Search2} />
	</SearchStack.Navigator>
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
			labelStyle: {
				fontSize: 12,
			},
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
				tabBarBadge: 3,
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
			component={SearchStackScreen}
		/>
	</Tabs.Navigator>
);

const DrawerScreen = () => (
	<Drawer.Navigator initialRouteName="Home">
		<Drawer.Screen name="Home" component={TabsScreen} />
		<Drawer.Screen name="Profile" component={ProfileStackScreen} />
	</Drawer.Navigator>
);

const RootStackScreen = ({ verifyToken }) => (
	<RootStack.Navigator headerMode="none">
		{verifyToken ? (
			<RootStack.Screen
				name="Auth"
				component={AuthStackScreen}
				options={{ animationEnabled: false }}
			/>
		) : (
			<RootStack.Screen
				name="App"
				component={DrawerScreen}
				options={{ animationEnabled: false }}
			/>
		)}
	</RootStack.Navigator>
);

export default () => {
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
		<LoadIng loading={isLoading}>
			<AuthContext.Provider value={authContext}>
				<StatusBar backgroundColor="#ead42d" barStyle={"dark-content"} />
				<NavigationContainer>
					<RootStackScreen verifyToken={userToken} />
				</NavigationContainer>
			</AuthContext.Provider>
		</LoadIng>
	);
};
