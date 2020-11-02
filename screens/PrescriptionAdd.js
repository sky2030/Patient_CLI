/**
 * Add Prescription
 * @ Mi-Xlab Anoop
 */

import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
  Alert,
  Modal,
  KeyboardAvoidingView,
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { Button } from "react-native-paper";
import AsyncStorage from "@react-native-community/async-storage";
import { Title, Caption, Paragraph, Drawer } from "react-native-paper";
import RNPickerSelect from "react-native-picker-select";
//import ImagePicker from "react-native-image-picker";
import moment from "moment-timezone";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
let NA = "N/A";
export default function PatientHistory({ navigation, route }) {
  const [enableshift, setenableShift] = useState(false);
  const [advice, setdoctorAdvice] = useState("");
  const [special_advice, setSpecial] = useState(NA);
  const [symptoms, setSymptoms] = useState(NA);
  const [findings, setFindings] = useState(NA);
  const [appointment, setAppointment] = useState({});
  const [fileString, setFilestring] = useState("");
  const [patientName, setPatientName] = useState(NA);
  const [patientWeight, setPatientWeight] = useState(NA);
  const [patientAge, setPatientAge] = useState(NA);
  const [patientHeight, setPatientheight] = useState(NA);
  const [patientGender, setPatientGender] = useState(NA);
  const [Hospital_Name, setHospitalName] = useState("");
  const [Doctor_Name, setDoctorName] = useState("");
  const [Ddesignation, setDesignation] = useState("");
  const [Ddegree, setDegree] = useState("");
  const [H_Place, setHPlace] = useState("");
  const [H_city, setHCity] = useState("");
  const [H_pin, setHPin] = useState("");
  const [suggestedInvestigation, setSuggestedInvestigation] = useState(NA);
  const [modal, setModal] = useState(false);
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", async () => {
      console.log("Appointment :", JSON.stringify(route.params.item.consultant.height));
      setAppointment(route.params.item);
      setdoctorAdvice("");
      setSpecial(NA);
      setSymptoms(NA);
      setFindings(NA);
      setFilestring("");
      setSuggestedInvestigation(NA);
      setHospitalName(route.params.item.hospital.name)
      setDoctorName(route.params.item.doctor.name)
      setDesignation(route.params.item.doctor.designation)
      setDegree(route.params.item.doctor.degree)
      setHPlace(route.params.item.hospital.place)
      setHCity(route.params.item.hospital.city)
      setHPin(route.params.item.hospital.pincode)
      setPatientName(
        route.params.item.consultant ? route.params.item.consultant.name : ""
      );
      setPatientWeight(
        route.params.item.consultant.weight + " Kg"
        // route.params.item.consultant.weight != undefined
        //   ? route.params.item.consultant.weight
        //   : NA
      );
      setPatientAge(
        route.params.item.consultant.age
        // route.params.item.age != undefined ? route.params.item.consultant.age : NA
      );
      setPatientheight(
        route.params.item.consultant.height + " cm"
        // route.params.item.consultant.height != undefined
        //   ? route.params.item.consultant.height
        //   : NA
      );
      setPatientGender(
        route.params.item.consultant.gender
        // route.params.item.consultant.gender != undefined
        //   ? route.params.item.consultant.gender
        //   : "MALE"
      );
    });
    return unsubscribe;
  }, [route.params.item]);

  // const selectPhototapped = () => {
  //   const options = {
  //     quality: 1.0,
  //     maxWidth: 400,
  //     maxHeight: 700,
  //     storageOptions: {
  //       skipBackup: true,
  //     },
  //   };

  //   ImagePicker.showImagePicker(options, (response) => {
  //     console.log("Response = ", response);

  //     if (response.didCancel) {
  //       console.log("User cancelled photo picker");
  //     } else if (response.error) {
  //       console.log("ImagePicker Error: ", response.error);
  //     } else if (response.customButton) {
  //       console.log("User tapped custom button: ", response.customButton);
  //     } else {
  //       setFilestring(response.data);
  //       // You can also display the image using data:
  //       // let source = { uri: 'data:image/jpeg;base64,' + response.data };
  //     }
  //   });
  // };

  const pickFromGallery = async () => {
    setModal(false);
    const { granted } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (granted) {
      let data = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        //  aspect: [1, 1],
        quality: 0.8,
        base64: true,
      });
      if (!data.cancelled) {
        //  handleUpload(newfile);
        setFilestring(`data:image/jpeg;base64,${data.base64}`);
      }
    } else {
      Alert.alert(Alert_Title, "you need to give up permission to work");
    }
  };
  const pickFromCamera = async () => {
    setModal(false);

    const { granted } = await Permissions.askAsync(Permissions.CAMERA);
    if (granted) {
      let data = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        //  aspect: [1, 1],
        quality: 0.8,
        base64: true,
      });
      // console.log(data.base64);
      if (!data.cancelled) {
        //  handleUpload(newfile);
        setFilestring(`data:image/jpeg;base64,${data.base64}`);
      }
    } else {
      Alert.alert(Alert_Title, "you need to give up permission to work");
    }
  };

  const uploadPrescription = async () => {
    const userToken = await AsyncStorage.getItem("userToken");

    let URL = `${BASE_URL}prescription`;

    if (patientName.length <= 0) {
      Alert.alert(Alert_Title, "Please fill the patient name");
      return;
    }
    if (patientGender == NA) {
      Alert.alert(Alert_Title, "Please fill the patient gender.");
      return;
    }
    if (patientWeight == NA) {
      Alert.alert(Alert_Title, "Please fill the patient weight.");
      return;
    }
    if (patientAge == NA) {
      Alert.alert(Alert_Title, "Please fill the patient age.");
      return;
    }
    if (patientHeight == NA) {
      Alert.alert(Alert_Title, "Please fill the patient height.");
      return;
    }
    if (symptoms.length <= 0) {
      Alert.alert(Alert_Title, "Please fill the symptoms.");
      return;
    }
    if (advice.length <= 0) {
      Alert.alert(Alert_Title, "Please fill the prescription body.");
      return;
    }
    let payload = {
      appointment_id: appointment.id,
      symptoms: symptoms,
      advice: advice,
      special_advice: special_advice,
      report: fileString,
      lab_findings: findings,
      suggested_investigation: suggestedInvestigation,
      name: patientName,
      gender: patientGender,
      age: `${retnum(patientAge)}`,
      height: `${retnum(patientHeight)}`,
      weight: `${retnum(patientWeight)}`,
    };
    console.log(userToken, URL, JSON.stringify(payload));
    fetch(URL, {
      method: "POST",
      headers: {
        Authorization: userToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((results) => {
        console.log(JSON.stringify(results));

        if (results.code == 200) {
          navigation.goBack();
        } else {
          Alert.alert(Alert_Title, results.message);
        }
      })
      .catch((err) => {
        Alert.alert(Alert_Title, SOMETHING_WENT_WRONG);
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.head}>
        <MaterialIcons
          name="navigate-before"
          size={30}
          onPress={() => navigation.goBack()}
          style={styles.back}
        />
        <Text style={styles.titletext}>Add Prescription</Text>
        <Button
          style={{ position: "absolute", right: 12, alignSelf: "center" }}
          icon="upload"
          mode="contained"
          theme={theme}
          onPress={() => uploadPrescription()}
        >
          Upload
        </Button>
        {/* <TouchableOpacity
          activeOpacity={0.95}
          onPress={() => uploadPrescription()}
          style={{ position: "absolute", right: 12, alignSelf: "center" }}
        >
          <Text
            style={{
              color: "white",
              paddingVertical: 5,
              borderRadius: 5,
              fontWeight: "500",
              textAlign: "center",
              alignSelf: "center",
              backgroundColor: "#009387",
            }}
          >
            {" "}
            Upload{" "}
          </Text>
        </TouchableOpacity> */}
      </View>

      <ScrollView>
        <KeyboardAvoidingView
          behavior="position"
          enabled={enableshift}
        >
          <View style={styles.presCard}>
            <View style={styles.header}>
              <Text style={styles.Titlehead}>{Hospital_Name} </Text>
              <Text style={styles.headtext}> Dr. {Doctor_Name} | {Ddegree} </Text>
              <Text style={styles.headtext}>{Ddesignation} </Text>
              <Text style={styles.headtext}>{H_Place}, {H_city} {H_pin}</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignSelf: "center",
                marginTop: 10,
                alignItems: "center",
                marginBottom: 5,
              }}
            >
              <Text style={{ color: "black", fontWeight: "500", fontSize: 18 }}>
                Patient Name :{" "}
              </Text>
              <TextInput
                placeholder="Patient Name"
                value={patientName}
                placeholderTextColor="#666666"
                style={{ color: "black", fontSize: 18, fontWeight: "500", height: HEIGHT_ROW }}
                onChangeText={(val) => setPatientName(val)}
              />
            </View>
            <View style={styles.Patientinfo}>
              <View>
                <View
                  style={{
                    marginLeft: 10,
                    flexDirection: "row",
                    flex: 1,
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      color: "black",
                      fontWeight: "500",
                      fontSize: 16,
                      width: 70,
                    }}
                  >
                    Gender
                </Text>
                  <Text style={{ color: "black", fontWeight: "500", fontSize: 16 }}>

                    : {" "}

                  </Text>
                  <RNPickerSelect
                    placeholder={{}}
                    items={genderItem}
                    onValueChange={(value) => {
                      setPatientGender(value);
                    }}
                    style={pickerSelectStyles}
                    value={patientGender}
                    useNativeAndroidPickerStyle={false}
                  />
                </View>
                <View
                  style={{
                    marginLeft: 10,
                    flexDirection: "row",
                    flex: 1,
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      color: "black",
                      fontWeight: "500",
                      fontSize: 16,
                      width: 70,
                    }}
                  >
                    Age
                </Text>
                  <Text
                    style={{ color: "black", fontWeight: "500", fontSize: 16 }}
                  >
                    :  {" "}
                  </Text>
                  <RNPickerSelect
                    placeholder={{}}
                    items={ageItem()}
                    onValueChange={(value) => {
                      setPatientAge(value);
                    }}
                    style={pickerSelectStyles}
                    value={patientAge}
                    useNativeAndroidPickerStyle={false}
                  />

                </View>
              </View>
              <View style={{ marginLeft: 10 }}>
                <View
                  style={{
                    marginLeft: 20,
                    flexDirection: "row",
                    flex: 1,
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      color: "black",
                      fontWeight: "500",
                      fontSize: 16,
                      width: 70,
                    }}
                  >
                    Weight
                </Text>
                  <Text
                    style={{ color: "black", fontWeight: "500", fontSize: 16 }}
                  >
                    : {" "}
                  </Text>
                  <RNPickerSelect
                    placeholder={{}}
                    items={weightItem()}
                    onValueChange={(value) => {
                      setPatientWeight(value);
                    }}
                    style={pickerSelectStyles}
                    value={patientWeight}
                    useNativeAndroidPickerStyle={false}
                  />
                </View>
                <View
                  style={{
                    marginLeft: 20,
                    flexDirection: "row",
                    flex: 1,
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      color: "black",
                      fontWeight: "500",
                      fontSize: 16,
                      width: 70,
                    }}
                  >
                    Height
                </Text>
                  <Text
                    style={{ color: "black", fontWeight: "500", fontSize: 16 }}
                  >
                    : {" "}
                  </Text>
                  <RNPickerSelect
                    placeholder={{}}
                    items={heightItem()}
                    onValueChange={(value) => {
                      setPatientheight(value);
                    }}
                    style={pickerSelectStyles}
                    value={patientHeight}
                    useNativeAndroidPickerStyle={false}
                  />
                </View>
              </View>
            </View>

            <View style={styles.presbody}>
              <View style={styles.presbodyLeft}>
                <Title style={styles.lefttext}> Chief Complaints </Title>
                <TextInput
                  placeholder="Symptoms"
                  //placeholderTextColor="#666666"
                  style={styles.Input}
                  onFocus={() => setenableShift(false)}
                  multiline={true}
                  value={symptoms != NA ? symptoms : ""}
                  onChangeText={(val) => setSymptoms(val)}
                />

                <Title style={styles.lefttext}> Lab Findings </Title>
                <TextInput
                  placeholder="Findings"
                  //placeholderTextColor="#666666"
                  onFocus={() => setenableShift(true)}
                  style={styles.Input}
                  multiline={true}
                  value={findings != NA ? findings : ""}
                  onChangeText={(val) => setFindings(val)}
                />

                <Title style={styles.lefttext}> Suggested Investigation </Title>
                <TextInput
                  placeholder="Suggested Investigation"
                  //placeholderTextColor="#666666"
                  onFocus={() => setenableShift(true)}
                  style={styles.Input}
                  multiline={true}
                  value={
                    suggestedInvestigation != NA ? suggestedInvestigation : ""
                  }
                  onChangeText={(val) => setSuggestedInvestigation(val)}
                />
              </View>
              <View style={styles.presbodyRight}>
                <TextInput
                  placeholder="Doctor's Prescription body"
                  // placeholderTextColor="#666666"
                  onFocus={() => setenableShift(false)}
                  style={styles.textInput}
                  multiline={true}
                  value={advice != NA ? advice : ""}
                  onChangeText={(val) => setdoctorAdvice(val)}
                />
              </View>
            </View>
            <View style={styles.Specialbody}>
              <Text style={styles.infotext}>Special Instructions:</Text>
              <TextInput
                placeholder="Special Instruction's"
                //placeholderTextColor="#666666"
                onFocus={() => setenableShift(true)}
                style={styles.specialInput}
                multiline={true}
                value={special_advice != NA ? special_advice : ""}
                onChangeText={(val) => setSpecial(val)}
              />

              <View style={{ flexDirection: "row", marginTop: 5 }}>
                <Text style={styles.date}>Appointment Date</Text>
                <Text>{moment(appointment.day_millis).format("ll")}</Text>
                <Text style={{ marginLeft: 20, fontWeight: "500" }}>
                  Signature
              </Text>
              </View>
            </View>
          </View>

          {/* <View>
          {
            fileString.length > 0 && <Image
              source={{ uri: fileString }}
              style={{ flex: 1, aspectRatio: 0.4, marginBottom: 10 }}
            />
          }
        </View> */}
          <TouchableOpacity
            activeOpacity={0.95}
            onPress={() => selectPhototapped()}
            style={{ margin: 10, flex: 1, marginBottom: 50 }}
          >
            {fileString.length > 0 && (
              <View>
                <Image
                  source={{ uri: fileString }}
                  style={{ flex: 1, aspectRatio: 0.4, marginBottom: 10 }}
                />
              </View>
            )}
            {fileString.length > 0 && (
              <TouchableOpacity
                onPress={() => {
                  setFilestring("");
                }}
              >
                <Text style={styles.redbold}>Remove Attachment</Text>
              </TouchableOpacity>
            )}
            {fileString.length == 0 && (
              <TouchableOpacity
                onPress={() => {
                  setModal(true);
                }}
              >
                <Text style={styles.whitebold}>Attachment</Text>
              </TouchableOpacity>
            )}
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </ScrollView>
      <TouchableOpacity
        activeOpacity={0.95}
        onPress={() => navigation.navigate("PrivacyPolicy")}
        style={styles.footer}
      >
        <Text style={styles.bottomtext}>Privacy Policy | Terms of use</Text>
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modal}
        onRequestClose={() => {
          setModal(false);
        }}
      >
        <View style={styles.modalView}>
          <View style={styles.modalButtonView}>
            <Button
              icon="camera"
              theme={theme}
              mode="contained"
              onPress={() => pickFromCamera()}
            >
              camera
            </Button>
            <Button
              icon="image-area"
              mode="contained"
              theme={theme}
              onPress={() => pickFromGallery()}
            >
              gallery
            </Button>
          </View>
          <Button theme={theme} onPress={() => setModal(false)}>
            cancel
          </Button>
        </View>
      </Modal>
    </View>
  );
}

const theme = {
  colors: {
    primary: "#4E557C",
  },
};

const styles = StyleSheet.create({
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
  container: {
    flex: 1,

    width: "100%",
  },
  head: {
    backgroundColor: "#fff",
    flexDirection: "row",
    height: 50,
    width: "100%",
    alignItems: "center",
  },
  back: {
    padding: 10,
    color: "#4E557C",
  },
  titletext: {
    color: "#4E557C",
    fontSize: 21,
    fontWeight: "500",
    textAlign: "center",
    width: "50%",
  },

  presCard: {
    // flex: 1,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "#fff",
    shadowOffset: { width: 1, height: 1 },
    shadowColor: "#333",
    shadowOpacity: 0.3,
    shadowRadius: 2,
    marginHorizontal: 10,
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: "#1e1",
    paddingBottom: 20,
    marginTop: 10,
  },
  presbody: {
    flex: 1,
    marginTop: 5,
    flexDirection: "row",
    borderTopColor: "black",
    borderTopWidth: 2,
  },
  presbodyLeft: {
    flex: 1,
    padding: 10,
    borderRightColor: "black",
    borderRightWidth: 2,
  },
  lefttext: {
    fontSize: 13,
    fontWeight: "500",
  },
  presbodyRight: {
    flex: 2,
    padding: 10,
    height: 280
  },
  textInput: {
    flex: 1,
    color: "#05375a",
    padding: 10,
  },
  infoInput: {
    color: "#05375a",
    padding: 10,
  },
  infoInput: {
    color: "#05375a",
    padding: 10,
  },
  specialInput: {
    flex: 1,
    color: "#05375a",
    padding: 10,
    width: "100%",
    height: 50,
  },
  date: {
    color: "#000",
    fontSize: 14,
    fontWeight: "500",
    marginHorizontal: 5,
  },

  footer: {
    backgroundColor: "#009387",
    padding: 20,
    height: 40,
    position: "absolute",
    bottom: 0,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  bottomtext: {
    color: "#fff",
    fontSize: 15,
  },

  Titlehead: {
    color: "white",
    fontSize: 20,
    fontWeight: "500",
  },
  headtext: {
    color: "white",
    fontSize: 15,
    fontWeight: "500",
  },

  header: {
    backgroundColor: "#192161",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    paddingVertical: 10,
  },

  Patientinfo: {
    flexDirection: "row",
    width: "100%",
  },
  section: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  Specialbody: {
    borderTopColor: "black",
    borderTopWidth: 2,
    alignItems: "flex-start",
    justifyContent: "center",
    width: "100%",
    paddingHorizontal: 5,
  },
  infotext: {
    color: "black",
    fontSize: 18,
    fontWeight: "500",
    paddingVertical: 5,
  },
  whitebold: {
    color: "white",
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 5,
    fontWeight: "500",
    textAlign: "center",
    alignSelf: "center",
    backgroundColor: "#009387",
  },
  redbold: {
    color: "white",
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 5,
    fontWeight: "500",
    textAlign: "center",
    alignSelf: "center",
    backgroundColor: "red",
  },
  btn: {
    backgroundColor: "#192161",
    padding: 5,
    color: "#fff",
    fontSize: 22,
    fontWeight: "500",
    flexDirection: "row",
    borderRadius: 5,
    height: 25,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 15,
    elevation: 3,
  },
});
const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 3,
    paddingHorizontal: 5,
    color: "black",
    fontWeight: "500",
    // width: 90,
    backgroundColor: "#fff",
  },
  inputAndroid: {
    fontSize: 16,
    fontWeight: "500",
    paddingVertical: 3,
    color: "black",
    backgroundColor: "#fff",
    //width: 30,
  },
});

const ageItem = () => {
  let list = [
    {
      label: NA,
      value: NA,
    },
  ];
  let index = 1;
  while (index <= 125) {
    list.push({
      label: `${index} years`,
      value: `${index} years`,
    });
    index++;
  }
  return list;
};
const weightItem = () => {
  let list = [
    {
      label: NA,
      value: NA,
    },
  ];
  let index = 1;
  while (index <= 200) {
    list.push({
      label: `${index} Kg`,
      value: `${index} Kg`,
    });
    index++;
  }
  return list;
};
const heightItem = () => {
  let list = [
    {
      label: NA,
      value: NA,
    },
  ];
  let index = 30;
  while (index <= 225) {
    list.push({
      label: `${index} cm`,
      value: `${index} cm`,
    });
    index++;
  }
  return list;
};
const genderItem = [
  {
    label: NA,
    value: NA,
  },
  {
    label: "Male",
    value: "Male",
  },
  {
    label: "Female",
    value: "Female",
  },
  {
    label: "Other",
    value: "Other",
  },
];
const retnum = (str) => {
  var num = str.replace(/[^0-9]/g, "");
  return parseInt(num, 10);
};
