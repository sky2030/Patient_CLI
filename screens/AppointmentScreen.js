/**
 * List of appointments
 * @ Mi-Xlab Anoop
 */
import React, { useState, useEffect } from "react";

import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  Alert,
  Modal,
  ScrollView,
  FlatList,
  Dimensions,
} from "react-native";
const screenWidth = Math.round(Dimensions.get("window").width);

import AsyncStorage from "@react-native-community/async-storage";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import { TextInput, Button } from "react-native-paper";
import moment from "moment-timezone";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { AntDesign } from "@expo/vector-icons";
import Picker from 'react-native-picker-select';
import { Chevron } from 'react-native-shapes';
const AppointmentScreen = ({ navigation, route }) => {
  let startDate = moment().startOf("day").format("x");
  let endDate = moment().endOf("day").format("x");
  const [appointmentList, setAppointmentList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [picture, setPicture] = useState("");
  const [modal, setModal] = useState(false);
  const [slotDate, setslotDate] = useState(moment().format("ll"));
  const [isDatePickerAvailable, setDatePickerAvailable] = useState(false);
  const [slotValue, setSlotValue] = useState("booked");
  const [allSlots, setAllSlots] = useState([]);
  let completed_status = "completed"
  let booked_status = "booked"
  useEffect(() => {
    // fetchData();
    const unsubscribe = navigation.addListener("focus", async () => {

      fetchData();
    });
    return unsubscribe;
  }, [route.params]);

  const updateStartEndDate = async (sdate) => {
    startDate = moment(sdate).startOf("day").format("x");

    endDate = moment(sdate).endOf("day").format("x");


    setslotDate(moment(sdate).format("ll"));
  };
  const handleDatePicker = (date) => {
    updateStartEndDate(date);
    setDatePickerAvailable(false);
    fetchData();
  };
  const fetchData = async () => {
    const userToken = await AsyncStorage.getItem("userToken");
    let URL = `${BASE_URL}doctorslots?day_from=${startDate}&day_to=${endDate}&self=true`;
    console.log(URL);
    fetch(URL, {
      method: "GET",
      headers: { Authorization: userToken },
    })
      .then((res) => res.json())
      .then((results) => {
        setLoading(false);
        if (results.code == 200) {
          setAllSlots(results.data)
          console.log("Data appointment :", JSON.stringify(results.data))
          let list = results.data.filter(item => {
            if (item.status == slotValue)
              return item
          })
          setAppointmentList(list);
        } else {
          Alert.alert(Alert_Title, results.message);
          setLoading(false);
        }
      })
      .catch((err) => {
        setLoading(false);
        Alert.alert(Alert_Title, SOMETHING_WENT_WRONG);
      });
  };
  const StringFromTime = (timevalue) => {
    if (timevalue <= 0) {
      return "12:00 AM";
    }
    const time = Number(timevalue) / 60000;
    let sdate = new Date();
    sdate.setHours(Math.floor(time / 60));
    sdate.setMinutes(time % 60);
    var returnValue = moment(sdate.getTime(), "x").format("hh:mm A");
    // DeviceInfo.is24Hour() ? "HH:mm" : "hh:mm A"

    return returnValue;
  };
  const statusForJoinConversation = (item) => {
    return 0;
  };
  const joinConversationPressed = async (item) => {
    ///v1/patient/appointment/join-now
    const userToken = await AsyncStorage.getItem("userToken");

    let URL = `${BASE_URL}appointment/join-now?appointment_id=${item.id}`;

    console.log(URL);
    fetch(URL, {
      method: "GET",
      headers: { Authorization: userToken },
    })
      .then((res) => res.json())
      .then((results) => {
        if (results.code != 200) {
          Alert.alert(Alert_Title, results.message);
        } else {
          navigation.navigate("EnxConferenceScreen", {
            streamId: results.data.enableX.room_id,
            token: results.data.enableX.token
          })
        }
      })
      .catch((err) => {
        Alert.alert(Alert_Title, SOMETHING_WENT_WRONG);
      });
  };


  const renderItem = (item, index) => {
    const joinConversationStatus = statusForJoinConversation(item);
    return (
      <View style={styles.MainCard}>
        <View style={styles.header}>
          <Text style={{
            color: "white",
            // marginVertical: 5,
            fontWeight: "500",
            textAlign: "center",
            alignSelf: "center",
            fontSize: 16
          }}>{item.doctor.name}</Text>
        </View>
        <View style={styles.cardbody}>
          <View style={styles.cardsections}>
            <Text style={styles.cardtext}>Appointment date</Text>
            <Text style={styles.cardtext}>
              {moment(item.day_millis).format("ll")}
            </Text>
          </View>
          <View style={styles.cardsections}>
            <Text style={styles.cardtext}>Appointment Time</Text>
            <Text style={styles.cardtext}>
              {StringFromTime(item.time_millis)}
            </Text>
          </View>
          <View style={styles.cardsections}>
            <Text style={styles.cardtext}>Fees</Text>
            <Text style={styles.cardtext}>₹ {item.doctor.fee}/- </Text>
          </View>
        </View>
        <View style={styles.btnrow}>
          <TouchableOpacity
            activeOpacity={0.95}
            onPress={() =>
              navigation.navigate("ReportRepo", { appointment_id: item.id })
            }
            style={[styles.cardbtn, { marginRight: 10, backgroundColor: "#00AAA0" }]}
          >
            <Text style={styles.whitebold}> Report </Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.95}
            onPress={() =>
              navigation.navigate("PrescriptionHistory", {
                appointment_id: item.id,
              })
            }
            style={[styles.cardbtn, { backgroundColor: "#253E66" }]}
          >
            <Text style={styles.whitebold}> Prescriptions </Text>
          </TouchableOpacity>


        </View>

        {
          item.status == booked_status && <View style={styles.btnrow}>
            {
              joinConversationStatus == 1 && (
                <TouchableOpacity
                  activeOpacity={1}
                  onPress={() => joinConversationPressed(item)}
                  style={[styles.cardDisabled, { marginRight: 10, backgroundColor: "#556B2F" }]}
                >
                  <Text style={[styles.whitebold,]}>Join Conversation </Text>
                </TouchableOpacity>
              )}
            {
              joinConversationStatus == 0 && (
                <TouchableOpacity
                  onPress={() => joinConversationPressed(item)}
                  style={[styles.cardEnabled, { marginRight: 10, backgroundColor: "#2E8B57" }]}
                >
                  <Text style={styles.whitebold}>Join Conversation </Text>
                </TouchableOpacity>
              )
            }

            <TouchableOpacity
              activeOpacity={0.95}
              onPress={() =>
                navigation.navigate("Reschedule", { item })
              }
              style={[styles.cardbtn, { backgroundColor: "#EF6555" }]}
            >
              <Text style={styles.whitebold}> Reschedule </Text>
            </TouchableOpacity>

          </View>
        }
      </View>
    );


  };
  return (
    <View
      style={{
        width: screenWidth - 20,
        flex: 1,
        marginTop: 20,
        alignSelf: "center",
      }}
    >
      {

        <View style={{
          flexDirection: "row", alignSelf: "center", marginBottom: 20,
        }}>

          <TouchableOpacity
            activeOpacity={0.8}
            style={{
              width: 150,
              justifyContent: "center"
            }}
            onPress={() => setDatePickerAvailable(true)}
          >
            <Text style={styles.toptext} >{`${slotDate}  `}
              <AntDesign name="calendar" size={20} color="black" />
            </Text>

          </TouchableOpacity>


          <Picker
            style={{
              inputAndroid: {
                fontSize: 16,
                paddingHorizontal: 10,
                color: 'black',
                paddingRight: 30, //
              },
              inputIOS: {
                fontSize: 16,
                paddingHorizontal: 10,
                color: 'black',
                paddingRight: 30, //
              },
              iconContainer: {
                paddingVertical: 20,
              },
            }}
            placeholder={{}}
            useNativeAndroidPickerStyle={false}
            onValueChange={(itemValue) => {
              setSlotValue(itemValue)
              let list = allSlots.filter(item => {
                if (item.status == itemValue)
                  return item
              })
              setAppointmentList(list);
            }}
            Icon={() => {
              return <Chevron size={1.5} color="gray" />;
            }}
            items={[
              { label: 'Upcoming', value: 'booked' },
              { label: 'Completed', value: 'completed' },
            ]}
          />

          <DateTimePickerModal
            isVisible={isDatePickerAvailable}
            mode="date"
            onConfirm={handleDatePicker}
            onCancel={() => setDatePickerAvailable(false)}
          />

        </View>
      }
      {
        appointmentList.length == 0 && <Text style={{ alignSelf: "center", fontSize: 16 }}> No Appointment </Text>
      }
      {
        <FlatList
          style={{ marginBottom: 30 }}
          data={appointmentList}
          renderItem={({ item, index }) => renderItem(item, index)}
          keyExtractor={(item, index) => item.id}
        />
      }


      <TouchableOpacity
        activeOpacity={0.95}
        onPress={() => navigation.navigate("PrivacyPolicy")}
        style={styles.footer}
      >
        <Text style={styles.bottomtext}>Privacy Policy | Terms of use</Text>
      </TouchableOpacity>
    </View>
  );
};

const theme = {
  colors: {
    primary: "#006aff",
  },
};

export default AppointmentScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
  Subtitle: {
    alignContent: "center",
    justifyContent: "center",
    flexDirection: "row",
    marginBottom: 10,
  },
  toptext: {
    fontSize: 16,
    fontWeight: "500",
    marginTop: 5,
  },
  head: {
    backgroundColor: "white",
    padding: 20,
    height: 60,
    width: "100%",
  },

  whitebold: {
    color: "white",
    // marginVertical: 5,
    fontWeight: "500",
    textAlign: "center",
    alignSelf: "center",
    fontSize: 14,
    marginVertical: 8

  },

  cardtext: {
    color: "#4E557C",
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 2,
    marginTop: 8,
    marginLeft: 2,
  },

  header: {
    color: "white",
    backgroundColor: "#192161",
    fontWeight: "500",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    height: 40,
  },

  MainCard: {
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "#E5F0ED",
    shadowOffset: { width: 1, height: 1 },
    shadowColor: "#333",
    shadowOpacity: 0.3,
    shadowRadius: 2,
    width: screenWidth - 20,
    marginBottom: 20,
  },
  cardDisabled: {
    flex: 1,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "gray",
    shadowOffset: { width: 1, height: 1 },
    shadowColor: "#333",
    shadowOpacity: 0.3,
    shadowRadius: 2,
    justifyContent: "center",
  },
  cardEnabled: {
    flex: 1,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "#FF7A5A",
    shadowOffset: { width: 1, height: 1 },
    shadowColor: "#333",
    shadowOpacity: 0.3,
    shadowRadius: 2,
    justifyContent: "center",
  },
  cardbtn: {
    flex: 1,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "#192161",
    shadowOffset: { width: 1, height: 1 },
    shadowColor: "#333",
    shadowOpacity: 0.3,
    shadowRadius: 2,
    justifyContent: "center",
  },
  Cancelbtn: {
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "#192161",
    shadowOffset: { width: 1, height: 1 },
    shadowColor: "#333",
    shadowOpacity: 0.3,
    shadowRadius: 2,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    width: "50%",
    marginBottom: 10,
    marginHorizontal: 10,
  },

  btnrow: {
    flexDirection: "row",
    marginHorizontal: 30,
    // justifyContent: "space-between",
    // alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,

  },
  cardbody: {
    justifyContent: "space-between",
    flexDirection: "row",
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  footer: {
    position: "absolute",
    bottom: 1,
    padding: 10,
    height: 40,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  cardsections: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
  modalView: {
    position: "absolute",
    bottom: 2,
    width: "100%",
    backgroundColor: "white",
  },
  modalButtonView: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
});
const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    height: 50,
    // paddingVertical: 12,
    paddingHorizontal: 10,
    color: 'black',

    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    height: 50,
    paddingHorizontal: 10,
    paddingVertical: 8,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});