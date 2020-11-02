
/**
 * Add reports
 * @ Mi-Xlab Anoop 
 */
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  Image,
  View,
  Modal,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  TouchableOpacity,
} from "react-native";
import { TextInput, Button } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import AsyncStorage from "@react-native-community/async-storage";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import moment from "moment-timezone";
function AddReport({ navigation, route }) {
  const [appointment_id, setAppointment_id] = useState("");
  const [report_name, setReport] = useState("");
  const [picture, setPicture] = useState("");
  const [modal, setModal] = useState(false);
  const [enableshift, setenableShift] = useState(false);
  const [isDatePickerAvailable, setDatePickerAvailable] = useState(false);
  const [reportDate, setReportDate] = useState(new Date());
  const [reportItem, setReportItem] = useState(undefined)

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      console.log("Add Report focused :", route.params)
      setReport("");
      setReportDate(new Date());
      if (route.params) {
        if (route.params.appointment_id) {
          setAppointment_id(route.params.appointment_id);
        }
        else {
          setAppointment_id("");
        }
        if (route.params.report) {
          setReportItem(route.params.report);
          setReport(route.params.report.report_name)
          setReportDate(moment(Number(route.params.report.report_date)))
        }
        else {
          setReportItem(undefined);
        }

      }
      else {
        setAppointment_id("");
        setReportItem(undefined);
      }


      setPicture("");
    });
    return unsubscribe;
  }, [route.params]);

  const submitData = async () => {
    if (report_name.length <= 0) {
      Alert.alert(Alert_Title, "Please add report name and then try again.");
      return;
    }
    if (picture.length <= 0) {
      Alert.alert(Alert_Title, "Please add report picture and then try again.");
      return;
    }
    console.log("Picture :", picture);
    console.log("Report Name :", report_name);
    console.log("Report Date :", moment(reportDate).format("x"));

    const userToken = await AsyncStorage.getItem("userToken");

    const data = new FormData();
    let extension = picture.split("/");
    let fileName = extension[extension.length - 1];
    let pathArray = fileName.split(".");
    pathArray = pathArray[pathArray.length - 1];

    data.append("report", {
      uri: picture,
      type: `image/${pathArray}`,
      name: fileName,
    });
    data.append("report_name", report_name);
    data.append("report_date", moment(reportDate).format("x"));

    if (appointment_id && appointment_id.length > 0) {
      data.append("appointment_id", appointment_id);
    }

    let method = "POST"
    let url = `${BASE_URL}report`
    if (reportItem) {
      method = "PUT"
      url = `${url}/${reportItem.report_id}`
    }

    console.log("Data :", JSON.stringify(data));
    fetch(url, {
      method: method,
      headers: {
        Authorization: userToken,
        "Content-Type": "multipart/form-data",
      },
      body: data,
    })
      .then((res) => res.json())
      .then((results) => {
        console.log("Add report :", JSON.stringify(results));
        if (results.code == 200) {
          navigation.goBack();
        }

        Alert.alert(Alert_Title, results.message);
      })
      .catch((err) => {
        Alert.alert(Alert_Title, SOMETHING_WENT_WRONG);
      });
  };

  const pickFromGallery = async () => {
    setModal(false);
    const { granted } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (granted) {
      let data = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        //  aspect: [1, 1],
        quality: 0.8,
      });
      // console.log(data.base64);
      if (!data.cancelled) {
        //  handleUpload(newfile);
        setPicture(data.uri);
      }
    } else {
      Alert.alert("you need to give up permission to work");
    }
  };
  const pickFromCamera = async () => {
    setModal(false);
    const { granted } = await Permissions.askAsync(Permissions.CAMERA);
    if (granted) {
      let data = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.allFiles,
        allowsEditing: true,
        //  aspect: [1, 1],
        quality: 0.8,
      });
      // console.log(data.base64);
      if (!data.cancelled) {
        //  handleUpload(newfile);
        setPicture(data.uri);
      }
    } else {
      Alert.alert("you need to give up permission to work");
    }
  };

  const handleUpload = (image) => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "skyMedi");
    data.append("cloud_name", "skycloud55");

    fetch("https://api.cloudinary.com/v1_1/skycloud55/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        setPicture(data.url);
        setModal(false);
      })
      .catch((err) => {
        Alert.alert(Alert_Title, SOMETHING_WENT_WRONG);
      });
  };
  const handleDatePicker = (date) => {
    setReportDate(date);
    setDatePickerAvailable(false);
  };
  return (
    <View style={styles.container}>
      <View style={styles.head}>
        <MaterialIcons
          name="navigate-before"
          size={28}
          onPress={() => navigation.goBack()}
          style={styles.back}
        />

        <Text style={styles.headtext}>Upload Report </Text>
        <MaterialCommunityIcons
          name="home-plus"
          size={30}
          color="white"
          onPress={() => navigation.navigate("Hospital")}
          style={{ position: "absolute", right: 10 }}
        />
      </View>
      <ScrollView>
        <KeyboardAvoidingView
          behavior="position"
          style={styles.root}
          enabled={enableshift}
        >
          <View style={styles.formHeader}>
            <TouchableOpacity
              style={{ width: "90%", padding: 5 }}
              onPress={() => setDatePickerAvailable(true)} >
              <TextInput
                label="Date of Report"
                value={`${moment(reportDate).format("ll")}`}
                theme={theme}
                mode="flat"
                editable={false}
              />
            </TouchableOpacity>
            <TextInput
              label="Name of Report"
              style={styles.inputStyle}
              value={report_name}
              theme={theme}
              onFocus={() => setenableShift(false)}
              mode="flat"
              onChangeText={(text) => setReport(text)}
            />

            <Button
              style={styles.uploadImage}
              icon={picture == "" ? "upload" : "check"}
              mode="contained"
              theme={theme}
              onPress={() => setModal(true)}
            >
              Upload Image
            </Button>

            <Button
              style={styles.uploadImage}
              icon="content-save"
              mode="contained"
              theme={theme}
              onPress={() => submitData()}
            >
              save
            </Button>

            <View style={{ alignItems: "center" }}>
              {
                picture.length > 0 &&
                <Image source={{ uri: picture }} style={styles.thumbnail}
                  resizeMode="contain"
                />
              }
            </View>

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
        </KeyboardAvoidingView>
      </ScrollView>

      <DateTimePickerModal
        isVisible={isDatePickerAvailable}
        mode="date"
        onConfirm={handleDatePicker}
        onCancel={() => setDatePickerAvailable(false)}
      />
    </View>
  );
}

const theme = {
  colors: {
    primary: "#006aff",
  },
};
const styles = StyleSheet.create({
  thumbnail: {
    width: "90%",
    aspectRatio: 0.7,
    marginTop: 20,
    marginBottom: 20,
  },
  head: {
    backgroundColor: "#21ada2",
    flexDirection: "row",
    height: 50,
    width: "100%",
    alignItems: "center",
    marginBottom: 10,
  },
  back: {
    padding: 10,
    color: "white",
  },

  headtext: {
    color: "white",
    fontSize: 21,
    fontWeight: "500",
    textAlign: "center",
    width: "80%",
  },
  root: {
    flex: 1,
    width: "100%",
  },
  formHeader: {
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  buttonNew: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonheader: {
    alignItems: "flex-start",
    justifyContent: "flex-start",
    flexDirection: "row",
    marginRight: 50,
  },

  container: {
    flex: 1,
  },

  inputStyle: {
    margin: 5,
    width: "90%",
    height: HEIGHT_ROW
  },
  uploadImage: {
    margin: 5,
    marginTop: 10,
    width: "90%",
  },
  form: {
    width: "100%",
    marginLeft: 25,
  },
  modalView: {
    position: "absolute",
    bottom: 2,
    width: "100%",
    backgroundColor: "white",
  },
  savebtn: {
    width: 100,
    backgroundColor: "#6564AD",
    color: "#6564AD",
    fontSize: 18,
    fontWeight: "bold",
    flexDirection: "row",
    borderRadius: 5,
    height: 25,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    elevation: 3,
    marginBottom: 20,
    marginLeft: 10,
    height: 50,
    marginRight: 15,
    paddingRight: 5,
    marginLeft: 5,
  },
  cancelbtn: {
    width: 100,
    backgroundColor: "#E71E4F",
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    flexDirection: "row",
    borderRadius: 5,
    height: 25,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    elevation: 3,
    marginBottom: 20,
    marginLeft: 10,
    height: 50,
    marginRight: 15,
    paddingRight: 5,
    marginLeft: 5,
  },
  btntext: {
    color: "white",
    fontSize: 18,
    marginLeft: 5,
  },
  modalButtonView: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
});

export default AddReport;
