import React from "react";

import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import Icon from "react-native-vector-icons/Ionicons";
import Transaction from "./TransactionScreen";
import HospitalSelection from "./HospitalSelection";
import HomeScreen from "./HomeScreen";
import AppointmentScreen from "./AppointmentScreen";
import ProfileScreen from "./ProfileScreen";
import { FontAwesome5 } from "@expo/vector-icons";
import ReportRepo from "./Reports";

const ReportStack = createStackNavigator();
const FindSpecialityStack = createStackNavigator();
const HomeStack = createStackNavigator();
const ProfileStack = createStackNavigator();
const AppointmentStack = createStackNavigator();
const TransactionStack = createStackNavigator();

const Tab = createMaterialBottomTabNavigator();

const MainTabScreen = () => (
  <Tab.Navigator initialRouteName="Hospital" activeColor="#fff">
    <Tab.Screen
      name="Hospital"
      //component={HomeStackScreen}
      component={FindSpecialityStackScreen}
      options={{
        tabBarLabel: "Home",
        tabBarColor: "#009387",
        tabBarIcon: ({ color }) => (
          <Icon name="ios-home" color={color} size={26} />
        ),
      }}
    />
    <Tab.Screen
      name="Reports"
      // component={FindSpecialityStackScreen}
      component={ReportStackScreen}
      options={{
        tabBarLabel: "Reports",
        tabBarColor: "#009387",
        tabBarIcon: ({ color }) => (
          <FontAwesome5 name="notes-medical" size={26} color={color} />

          // <Icon name="ios-search" color={color} size={26} />
        ),
      }}
    />
    <Tab.Screen
      name="Appointment"
      component={AppointmentStackScreen}
      options={{
        tabBarLabel: "Appointment",
        tabBarColor: "#009387",
        tabBarIcon: ({ color }) => (
          <Icon name="ios-calendar" color={color} size={26} />
        ),
      }}
    />
    <Tab.Screen
      name="Profile"
      component={ProfileStackScreen}
      options={{
        tabBarLabel: "My Account",
        tabBarColor: "#009387",
        tabBarIcon: ({ color }) => (
          <Icon name="ios-person" color={color} size={26} />
        ),
      }}
    />
  </Tab.Navigator>
);

export default MainTabScreen;

const FindSpecialityStackScreen = ({ navigation }) => (
  <FindSpecialityStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: "#fff",
        height: 60,
      },
      headerTintColor: "#009387",
      headerTitleStyle: {
        fontWeight: "bold",
      },
    }}
  >
    <FindSpecialityStack.Screen
      name="Hospital"
      component={HospitalSelection}
      options={{
        title: "Welcome to VRCure",
        headerLeft: () => (
          <Icon.Button
            name="ios-menu"
            size={25}
            backgroundColor="#fff"
            color="#009387"
            onPress={() => navigation.openDrawer()}
          ></Icon.Button>
        ),
      }}
    />
  </FindSpecialityStack.Navigator>
);

const HomeStackScreen = ({ navigation }) => (
  <HomeStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: "#fff",
        height: 60,
      },
      headerTintColor: "#009387",
      headerTitleStyle: {
        fontWeight: "bold",
      },
    }}
  >
    <HomeStack.Screen
      name="Home"
      component={HomeScreen}
      options={{
        title: "VRCure",
        headerLeft: () => (
          <Icon.Button
            name="ios-menu"
            size={25}
            backgroundColor="#fff"
            color="#009387"
            onPress={() => navigation.openDrawer()}
          ></Icon.Button>
        ),
      }}
    />
  </HomeStack.Navigator>
);

const ProfileStackScreen = ({ navigation }) => (
  <ProfileStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: "#fff",
        height: 60,
      },
      headerTintColor: "#009387",
      headerTitleStyle: {
        fontWeight: "bold",
      },
    }}
  >
    <ProfileStack.Screen
      name="Profile"
      component={ProfileScreen}
      options={{
        title: "Profile",
        headerLeft: () => (
          <Icon.Button
            name="ios-menu"
            size={25}
            backgroundColor="#fff"
            color="#009387"
            onPress={() => navigation.openDrawer()}
          ></Icon.Button>
        ),
      }}
    />
  </ProfileStack.Navigator>
);

const AppointmentStackScreen = ({ navigation }) => (
  <AppointmentStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: "#fff",
        height: 60,
      },
      headerTintColor: "#009387",
      headerTitleStyle: {
        fontWeight: "bold",
      },
    }}
  >
    <AppointmentStack.Screen
      name="Appointment"
      component={AppointmentScreen}
      options={{
        title: "Appointment",
        headerLeft: () => (
          <Icon.Button
            name="ios-menu"
            size={25}
            backgroundColor="#fff"
            color="#009387"
            onPress={() => navigation.openDrawer()}
          ></Icon.Button>
        ),
      }}
    />
  </AppointmentStack.Navigator>
);
const ReportStackScreen = ({ navigation }) => (
  <ReportStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: "#fff",
        height: 60,
      },
      headerTintColor: "#009387",
      headerTitleStyle: {
        fontWeight: "bold",
      },
    }}
  >
    <ReportStack.Screen
      name="Reports"
      component={ReportRepo}
      options={{
        title: "Medical Records",
        headerLeft: () => (
          <Icon.Button
            name="ios-menu"
            size={25}
            backgroundColor="#fff"
            color="#009387"
            onPress={() => navigation.openDrawer()}
          ></Icon.Button>
        ),
      }}
    />
  </ReportStack.Navigator>
);
