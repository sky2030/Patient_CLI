import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";

import Avatar from "../assets/images/Avatar-icon.png";

import AsyncStorage from "@react-native-community/async-storage";
import {
  Ionicons,
  AntDesign,
  MaterialIcons,
  FontAwesome5,
  MaterialCommunityIcons,
  Fontisto,
} from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
const ProfileScreen = ({ navigation }) => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  const GetProfile = async () => {
    const userToken = await AsyncStorage.getItem("userToken");
    console.log(userToken);
    fetch(BASE_URL, {
      method: "GET",
      headers: { Authorization: userToken },
    })
      .then((res) => res.json())
      .then((results) => {
        if (results.code == 200) {
          console.log(JSON.stringify(results));
          if (results.data.picture && results.data.picture.length > 0) {
            if (results.data.picture.includes("data:image/") == false) {
              results.data.picture = `data:image/jpeg;base64,${results.data.picture}`;
            }
          }
          setData(results.data);
          setLoading(false);
        } else {
          Alert.alert(Alert_Title, results.message);
          setLoading(false);
        }
      })
      .catch((err) => {
        Alert.alert(Alert_Title, SOMETHING_WENT_WRONG);
      });
    //  console.log("New Data is going to show")
    //  console.log(data.mobile)
  };
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      GetProfile();
    });

    return unsubscribe;
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.ProfileCard} onPress={() => GetProfile()}>
          <View style={styles.avatar}>
            <Image
              source={data.picture == null ? Avatar : { uri: data.picture }}
              style={styles.img}
            />
          </View>

          <View>
            <View style={styles.profname}>
              <Text style={styles.PatientName}>{data.patient_name}</Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                paddingHorizontal: 10,
                width: "100%",
                alignSelf: "center",
                justifyContent: "center",
              }}
            >
              <View
                style={{
                  width: "45%",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Entypo name="mobile" size={24} color="#619DD5" />
                <Text
                  style={{
                    color: "#000",
                    fontSize: 16,
                    fontWeight: "500",
                    marginLeft: 6,
                  }}
                >
                  {data.mobile}
                </Text>
              </View>
              <View
                style={{
                  width: "53%",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Entypo name="email" size={22} color="#D5481F" />
                <Text
                  style={{
                    color: "#000",
                    fontSize: 16,
                    marginLeft: 6,
                    marginRight: 10,
                    fontWeight: "500",
                    marginRight: 20,
                  }}
                >
                  {data.email}
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                width: "100%",
                paddingHorizontal: 10,
                alignSelf: "center",
              }}
            >
              <View
                style={{
                  width: "45%",
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: 10,
                }}
              >
                <MaterialIcons name="location-city" size={26} color="black" />
                <Text
                  style={{
                    color: "#000",
                    fontSize: 16,
                    marginLeft: 6,
                    fontWeight: "500",
                  }}
                >
                  {data.city}
                </Text>
              </View>
              <View
                style={{
                  width: "53%",
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: 10,
                }}
              >
                <AntDesign name="user" size={24} color="black" />
                <Text
                  tyle={{
                    color: "#000",
                    fontSize: 16,
                    marginLeft: 6,
                    fontWeight: "500",
                  }}
                >
                  {data.mothers_name}
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View style={[styles.row1]}>
          <TouchableOpacity
            onPress={() => navigation.navigate("GeneralInfo", { data })}
            style={styles.optionCards}
          >
            <View style={styles.expoalign}>
              <AntDesign name="profile" size={25} color="#f50227" />
            </View>
            <View style={styles.textstyle}>
              <Text style={styles.smallcardtext}>Edit Profile</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("Myfamily")}
            style={styles.optionCards}
          >
            <View style={styles.expoalign}>
              <Ionicons name="ios-people" size={25} color="#2A9AD8" />
            </View>
            <View style={styles.textstyle}>
              <Text style={styles.smallcardtext}>My Family</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.row1}>
          {/* <TouchableOpacity
            onPress={() => navigation.navigate("HealthHistory")}
            style={styles.optionCards}
          >
            <View style={styles.expoalign}>
              <MaterialIcons name="healing" size={25} color="#d40ee6" />
            </View>
            <View style={styles.textstyle}>
              <Text style={styles.smallcardtext}>Appointment History</Text>
            </View>
          </TouchableOpacity> */}
          <TouchableOpacity
            onPress={() => navigation.navigate("MedicalProcedures")}
            style={styles.optionCards}
          >
            <View style={styles.expoalign}>
              <FontAwesome5 name="procedures" size={25} color="#0e1ce6" />
            </View>
            <View style={styles.textstyle}>
              <Text style={styles.smallcardtext}>Procedures</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={[styles.row1, { marginBottom: 20 }]}>
          <TouchableOpacity
            onPress={() => navigation.navigate("Appointment")}
            style={styles.optionCards}
          >
            <View style={styles.expoalign}>
              <MaterialCommunityIcons
                name="calendar-clock"
                size={25}
                color="#0b635c"
              />
            </View>
            <View style={styles.textstyle}>
              <Text style={styles.smallcardtext}>Appointments</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate("Transaction")}
            style={styles.optionCards}
          >
            <View style={styles.expoalign}>
              <MaterialCommunityIcons
                name="contactless-payment"
                size={26}
                color={"#9f02e8"}
              />
            </View>
            <View style={styles.textstyle}>
              <Text style={styles.smallcardtext}>Transactions</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* <TouchableOpacity
        style={styles.footer}
        onPress={() => navigation.navigate("PrivacyPolicy")}
      >
        <Text style={styles.bottomtext}>Privacy Policy | Terms of use</Text>
      </TouchableOpacity> */}
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 5,
    width: "100%",
    backgroundColor: "#fff",
  },

  expoalign: {
    flex: 1,
    paddingLeft: 30,
    alignItems: "flex-end",
  },
  textstyle: {
    flex: 3,
  },
  patientinfo: {
    flexDirection: "row",
  },
  patientinfo1: {
    flexDirection: "row",
  },
  profname: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 7,
  },
  footer: {
    backgroundColor: "#077464",
    position: "absolute",
    padding: 20,
    height: 40,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    bottom: 1,
  },
  bottomtext: {
    color: "#fff",
    fontSize: 15,
  },
  row1: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",

    marginHorizontal: 10,
  },

  PatientName: {
    color: "#020A0F",

    fontSize: 25,
    fontWeight: "500",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  smallcardtext: {
    color: "black",
    marginVertical: 5,
    fontSize: 17,
    fontWeight: "500",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
    marginLeft: 20,
  },
  DetailText: {
    color: "#000",
    marginBottom: 5,
    fontSize: 16,
    fontWeight: "500",
    justifyContent: "center",
    alignSelf: "center",
    marginLeft: 40,
  },
  DetailText1: {
    color: "#000",
    marginBottom: 5,
    fontSize: 16,
    fontWeight: "500",
    justifyContent: "center",
    alignSelf: "center",
    marginRight: 30,
  },
  DetailText2: {
    color: "#000",
    marginBottom: 5,
    fontSize: 16,
    fontWeight: "500",
    justifyContent: "center",
    alignSelf: "center",
    marginLeft: 85,
  },

  optionCards: {
    elevation: 5,
    backgroundColor: "#B4E2C7",
    shadowOffset: { width: 3, height: 3 },
    shadowColor: "#333",
    shadowOpacity: 0.3,
    shadowRadius: 2,
    marginHorizontal: 10,
    marginVertical: 6,
    alignItems: "center",
    justifyContent: "center",
    // padding: 20,
    width: "95%",
    height: 50,
    flexDirection: "row",
    //  borderRadius:13,
    borderBottomEndRadius: 15,
    borderTopLeftRadius: 15,
  },
  ProfileCard: {
    // borderRadius: 16,

    elevation: 2,
    // borderWidth: 1,
    // shadowOffset: { width: 1, height: 1 },
    shadowColor: "#333",
    shadowOpacity: 0.2,
    shadowRadius: 1,
    // marginVertical: 10,
    alignItems: "center",
    // justifyContent: "center",
    paddingBottom: 20,
    width: "96%",
    borderColor: "#B4E2C7",
    alignSelf: "center",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  avatar: {
    margin: 5,
  },
  Profileinfo: {},

  img: {
    marginTop: 7,
    alignItems: "center",
    justifyContent: "center",
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  img1: {
    marginBottom: 20,
    marginTop: 7,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    width: 75,
    height: 75,
  },
});
