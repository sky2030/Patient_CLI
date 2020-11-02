import React from "react";

import { createDrawerNavigator } from "@react-navigation/drawer";

import { DrawerContent } from "./DrawerContent";

import MainTabScreen from "./MainTabScreen";
import SupportScreen from "./SupportScreen";
import MyFamily from "./MyfamilyScreen";
import DoctorBooking from "./DoctorBooking";
import DoctorSelection from "./DoctorSelection";
import GeneralInfo from "./PatientGeneralInfo";
import HealthHistory from "./HealthHistory";
import PrescriptionHistory from "./PrescriptionHistory";
import MedicalProcedures from "./MedicalProcedures";
import Transaction from "./TransactionScreen";
import FindSpecialityScreen from "./FindSpecialityScreen";
import PrivacyPolicy from "./PrivacyScreens";
import AddFamily from "./AddFamily";
import ReportRepo from "./Reports";
import AddReport from "./AddReports";
import PaymentGatway from "./Payment";
import FamilyDetail from "./FamilyDetail";
import EnxConferenceScreen from "./EnxConferenceScreen";
import HomeScreen from "./HomeScreen";
import Reschedule from "./Reschedule"
//import DoctorBookingStackScreen from '../routes/DoctorBookingStack';

const Drawer = createDrawerNavigator();
const DrawerStackScreen = ({ }) => (
  <Drawer.Navigator drawerContent={(props) => <DrawerContent {...props} />}>
    <Drawer.Screen name="HomeDrawer" component={MainTabScreen} />
    <Drawer.Screen name="Contactus" component={SupportScreen} />
    <Drawer.Screen name="Myfamily" component={MyFamily} />
    <Drawer.Screen name="DoctorBooking" component={DoctorBooking} />
    <Drawer.Screen name="Doctors" component={DoctorSelection} />
    <Drawer.Screen name="GeneralInfo" component={GeneralInfo} />
    <Drawer.Screen name="HealthHistory" component={HealthHistory} />
    <Drawer.Screen name="PrescriptionHistory" component={PrescriptionHistory} />
    <Drawer.Screen name="MedicalProcedures" component={MedicalProcedures} />
    <Drawer.Screen name="Transaction" component={Transaction} />
    <Drawer.Screen name="Speciality" component={FindSpecialityScreen} />
    <Drawer.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
    <Drawer.Screen name="AddFamily" component={AddFamily} />
    <Drawer.Screen name="ReportRepo" component={ReportRepo} />
    <Drawer.Screen name="AddReport" component={AddReport} />
    <Drawer.Screen name="payment" component={PaymentGatway} />
    <Drawer.Screen name="familydetail" component={FamilyDetail} />
    <Drawer.Screen name="EnxConferenceScreen" component={EnxConferenceScreen} />
    <Drawer.Screen name="HospitalHome" component={HomeScreen} />
    <Drawer.Screen name="Reschedule" component={Reschedule} />
  </Drawer.Navigator>
);

export default DrawerStackScreen;
