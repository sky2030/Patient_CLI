import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Button,
  TextInput,
  View,
  Text,
  Modal,
  TouchableWithoutFeedback,
  Alert,
  TouchableOpacity,
  Keyboard,
} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import AsyncStorage from "@react-native-community/async-storage";
import moment from "moment-timezone";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
let NA = "N/A";

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
const relationItem = [
  {
    label: NA,
    value: NA,
  },
  {
    label: "Son",
    value: "son",
  },
  {
    label: "Daughter",
    value: "daughter",
  },
  {
    label: "Father",
    value: "father",
  },
  {
    label: "Mother",
    value: "mother",
  },
  {
    label: "Grand Father",
    value: "grand-father",
  },
  {
    label: "Grand Mother",
    value: "grand-mother",
  },
  {
    label: "Wife",
    value: "wife",
  },
  {
    label: "Husband",
    value: "husband",
  },
  {
    label: "Other",
    value: "other",
  },

];

const retnum = (str) => {
  var num = str.replace(/[^0-9]/g, "");
  return parseInt(num, 10);
};

export default function AddFamily({ navigation, route }) {
  const [name, SetMemberName] = useState("");
  const [relation, setrelation] = useState("");
  const [birth_millis, setbirthdate] = useState(undefined);
  const [height, setheight] = useState("");
  const [weight, setweight] = useState("");
  const [gender, setGender] = useState("");
  const [isDatePickerAvailable, setDatePickerAvailable] = useState(false);

  const handleDatePicker = (date) => {
    console.log(moment(date).format("x"))
    setbirthdate(date);
    setDatePickerAvailable(false);
  };
  const submitData = async () => {
    // await setpatientId(route.params.patientId);
    const userToken = await AsyncStorage.getItem("userToken");
    let payload = {
      name,
      relation,
      gender,
      birth_millis: moment(birth_millis).format("x"),
      height: `${retnum(height)}`,
      weight: `${retnum(weight)}`,
    }
    console.log(JSON.stringify(payload))
    let URL = `${BASE_URL}family-members/add`;
    console.log(URL)
    fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: userToken,
      },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.code == 200) {
          Alert.alert(`${name} is saved successfully`);
          navigation.navigate("Myfamily");
        } else {
          Alert.alert(Alert_Title, data.message)
        }
      })
      .catch((err) => {
        Alert.alert(Alert_Title, SOMETHING_WENT_WRONG);
      });

  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {

      setGender("");
      SetMemberName("");
      setrelation("");
      setbirthdate(undefined);
      setheight("");
      setweight("");


      // console.log(route.params)
    });

    return unsubscribe;
  }, [route.params]);

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <View style={styles.head}>
          <MaterialIcons
            name="navigate-before"
            size={30}
            onPress={() => navigation.goBack()}
            style={styles.back}
          />

          <Text style={styles.headtext}>Add Family Member</Text>
          <MaterialCommunityIcons
            name="home-plus"
            size={30}
            color="white"
            onPress={() => navigation.navigate("Hospital")}
            style={{ position: "absolute", right: 10 }}
          />
        </View>

        <View>
          <TextInput
            style={styles.input}
            placeholder="Enter Name"
            value={name}
            mode="outlined"
            onChangeText={(text) => SetMemberName(text)}
          />

          {/* <TextInput
              style={styles.input}
              placeholder="Birthdate of Family Member"
              value={birth_millis != undefined ? moment(birth_millis).format("ll") : ""}
              mode="outlined"
              onChangeText={(text) => setbirthdate(text)}
            />  */}
          <Text style={styles.Inputs}> Date of Birth : {birth_millis != undefined ? moment(birth_millis).format("ll") : ""}</Text>
          <TouchableOpacity
            style={styles.hwInput}
            onPress={() => setDatePickerAvailable(true)}
          >
            <AntDesign name="calendar" size={45} color="black" />
          </TouchableOpacity>

          <DateTimePickerModal
            isVisible={isDatePickerAvailable}
            mode="date"
            onConfirm={handleDatePicker}
            onCancel={() => setDatePickerAvailable(false)}
          />
          {/* <TextInput
            style={styles.input}
            placeholder="Relation"
            value={relation}
            mode="outlined"
            onChangeText={(text) => setrelation(text)}
          /> */}
          <Text
            style={styles.Inputs}>

            Gender
                </Text>

          <TextInput
            style={styles.input}
            placeholder="Enter Other gender if Any"
            mode="outlined"
            value={gender}
            onChangeText={(text) => setGender(text)}
          />
          <View style={styles.hwInput}>
            <RNPickerSelect
              placeholder={{}}
              items={genderItem}
              onValueChange={(value) => {
                setGender(value);
              }}
              style={pickerSelectStyles}
              value={gender}
              useNativeAndroidPickerStyle={false}
            />
          </View>
          <Text
            style={styles.Inputs}>

            Relation
                </Text>
          <View style={styles.hwInput}>
            <RNPickerSelect
              placeholder={{}}
              items={relationItem}
              onValueChange={(value) => {
                setrelation(value);
              }}
              style={pickerSelectStyles}
              value={relation}
              useNativeAndroidPickerStyle={false}
            />
          </View>
          <Text style={styles.Inputs}> Height</Text>
          <View style={styles.hwInput}>
            <RNPickerSelect
              placeholder={{}}
              items={heightItem()}
              onValueChange={(value) => {
                setheight(value);
              }}
              style={pickerSelectStyles}
              value={height}
              useNativeAndroidPickerStyle={false}
            /></View>
          <Text style={styles.Inputs}> Weight</Text>
          <View style={styles.hwInput}>
            <RNPickerSelect
              placeholder={{}}
              items={weightItem()}
              onValueChange={(value) => {
                setweight(value);
              }}
              style={pickerSelectStyles}
              value={weight}
              useNativeAndroidPickerStyle={false}
            /></View>


          <View style={{ marginVertical: 20, marginHorizontal: 20 }}>
            <Button
              color="#047858"
              title="Submit"
              onPress={() => submitData()}
            />
          </View>


        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 3,
    paddingHorizontal: 5,
    color: "black",
    fontWeight: "500",
    // width: 90,
    backgroundColor: "#ddd",
  },

  inputAndroid: {
    fontSize: 16,
    fontWeight: "500",
    paddingVertical: 3,
    color: "black",
    backgroundColor: "#ddd",
    marginHorizontal: 20,
    width: 200,
    paddingHorizontal: 5
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: "center",
  },
  Inputs: {
    fontSize: 18,
    fontWeight: "500",
    marginLeft: 10,
    marginVertical: 10
  },
  header: {
    width: "100%",
    backgroundColor: "#E5F0ED",
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 15,
  },
  btntext: {
    color: "#4E557C",
    fontSize: 20,
    fontWeight: "bold",
  },
  Subtitle: {
    borderWidth: 1,
    borderBottomWidth: 3,
    borderBottomColor: 'grey',
    borderColor: '#ddd',
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "row",
    marginHorizontal: 10,
    marginVertical: 10,
    borderRadius: 5,
    paddingVertical: 5
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderBottomWidth: 3,
    borderBottomColor: 'grey',
    padding: 10,
    fontSize: 18,
    marginHorizontal: 10,
    marginTop: 20,
    height: HEIGHT_ROW
  },
  hwInput: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderBottomWidth: 3,
    borderBottomColor: 'grey',
    padding: 10,
    fontSize: 18,
    marginHorizontal: 10,

  },
  head: {
    backgroundColor: "#21ada2",
    flexDirection: "row",
    height: 50,
    width: "100%",
    alignItems: "center",
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
  inputlast: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    fontSize: 18,
    height: 38,
    marginHorizontal: 10,
    marginVertical: 10,
    borderBottomColor: "black",
    height: HEIGHT_ROW
  },
});

export const images = {
  ratings: {
    1: require("../assets/rating-1.png"),
    2: require("../assets/rating-2.png"),
    3: require("../assets/rating-3.png"),
    4: require("../assets/rating-4.png"),
    5: require("../assets/rating-5.png"),
  },
};
