import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Linking,
  Platform,
  Alert,
  Keyboard,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Title, Card, Button } from "react-native-paper";
import {
  MaterialIcons,
  FontAwesome,
  AntDesign,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import AsyncStorage from "@react-native-community/async-storage";
import moment from "moment-timezone";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import RNPickerSelect from "react-native-picker-select";

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

const FamilyDetail = ({ navigation, route }) => {
  // const { name, _id, relation, birthdate, phone } = route.params.item;
  const [id, SetMemberID] = useState("");
  const [name, SetMemberName] = useState("");
  const [relation, setrelation] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [birth_millis, setbirthdate] = useState(undefined);
  const [height, setheight] = useState("");
  const [weight, setweight] = useState("");
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
      birth_millis: moment(birth_millis).format("x"),
      height: `${retnum(height)}`,
      weight: `${retnum(weight)}`,
      gender,
      id
    };
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
          Alert.alert(`${name} is Update successfully`);
          navigation.navigate("Profile");
        } else {
          Alert.alert(Alert_Title, data.message);
        }
      })
      .catch(() => {
        Alert.alert(Alert_Title, SOMETHING_WENT_WRONG);
      });

  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      console.log("Birthday Millies: " + route.params.item.birth_millis)
      SetMemberName(route.params.item.name);
      setrelation(route.params.item.relation);
      setbirthdate(route.params.item.birth_millis);
      setAge(route.params.item.age);
      setheight(route.params.item.height + " cm")
      setweight(route.params.item.weight + " Kg")
      SetMemberID(route.params.item.id)
      setGender(route.params.item.gender)


      // console.log(route.params)
    });

    return unsubscribe;
  }, [route.params.item]);

  const DeleteMember = async () => {
    const userToken = await AsyncStorage.getItem("userToken");
    let URL = `${BASE_URL}family-members/${route.params.item.id}`;
    console.log(URL)
    fetch(URL, {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
        Authorization: userToken,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.code == 200) {
          navigation.navigate("Myfamily");
        }
        Alert.alert(Alert_Title, data.message);
      })
      .catch((err) => {
        Alert.alert(Alert_Title, SOMETHING_WENT_WRONG);
      });
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.root}>
        <View style={styles.headTop}>
          <MaterialIcons
            name="navigate-before"
            size={35}
            onPress={() => navigation.goBack()}
            style={styles.back}
          />
          <Text style={styles.titletext}>Family Member Detail</Text>
          <MaterialCommunityIcons
            name="home-plus"
            size={30}
            color="white"
            onPress={() => navigation.navigate("Hospital")}
            style={{ position: "absolute", right: 10 }}
          />
        </View>

        {/* <View style={{ alignItems: "center", margin: 15 }}>
        <Text style={{ fontSize: 30, fontWeight: "bold" }}>{name}</Text>
        <Text style={{ fontSize: 22 }}>{relation}</Text>
      </View> */}

        <Card style={styles.mycard}>
          <View style={styles.cardContent}>
            <MaterialIcons name="person" size={32} color="#047858" />

            <Text style={styles.mytext}>{name} </Text>
          </View>
        </Card>
        <Card style={styles.mycard}>
          <View style={styles.cardContent}>
            <MaterialIcons name="speaker-group" size={32} color="#047858" />

            <Text style={styles.mytext}>{relation}, {age}  {gender} </Text>
          </View>
        </Card>
        <Card style={styles.mycard}>
          <View style={styles.cardContent}>
            <FontAwesome name="birthday-cake" size={32} color="#047858" />

            <Text style={styles.mytext}>{moment(birth_millis).format("ll")}</Text>
          </View>
        </Card>
        <Card style={styles.mycard}>
          <View style={styles.cardContent}>
            <MaterialCommunityIcons name="human-male-height" size={32} color="#047858" />

            <Text style={styles.mytext}>{height}</Text>
            <MaterialCommunityIcons name="weight" size={32} color="#047858" />

            <Text style={styles.mytext}>{weight}</Text>
          </View>
        </Card>

        <View>
          <View style={styles.Updatehead}>
            <Text style={styles.title}>UPDATE DETAIL </Text>
          </View>
          <TextInput
            style={styles.input}
            placeholder="Enter Name"
            value={name}
            mode="outlined"
            onChangeText={(text) => SetMemberName(text)}
          />
          <View style={styles.Subtitle}>
            <FontAwesome name="birthday-cake" style={styles.Inputs} size={28} color="#047858" />
            <Text style={styles.Inputs}>{moment(birth_millis).format("ll")}</Text>
            <TouchableOpacity
              style={{
                color: "#08211c",
                marginLeft: 10,
                flex: 1,
              }}
              onPress={() => setDatePickerAvailable(true)}
            >
              <AntDesign name="calendar" size={45} color="black" />
            </TouchableOpacity>
          </View>
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


          <DateTimePickerModal
            isVisible={isDatePickerAvailable}
            mode="date"
            onConfirm={handleDatePicker}
            onCancel={() => setDatePickerAvailable(false)}
          />
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
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            padding: 10,
            marginTop: 10
          }}
        >
          <Button

            icon="account-edit"
            mode="contained"
            theme={theme}
            onPress={() => submitData()}
          >
            Edit
          </Button>
          <Button

            icon="delete"
            mode="contained"
            theme={theme}
            onPress={() => DeleteMember()}
          >
            Delete Member
          </Button>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const theme = {
  colors: {
    primary: "#21ada2",
  },
};

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
  root: {
    flex: 1,
  },
  headTop: {
    backgroundColor: "#21ada2",
    flexDirection: "row",
    height: 50,
    width: "100%",
    alignItems: "center",
  },
  Updatehead: {
    marginTop: 10,
    height: 40,
    width: "100%",
    alignItems: "center",
    justifyContent: 'center'
  },
  title: {
    color: '#015952',
    fontSize: 25,
    fontWeight: '900'
  },
  Inputs: {
    fontSize: 20,
    fontWeight: "500",
    marginLeft: 10,
    marginVertical: 10
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
  back: {
    padding: 10,
    color: "white",
  },

  titletext: {
    color: "white",
    fontSize: 21,
    fontWeight: "500",
    textAlign: "center",
    width: "80%",
  },
  Subtitle: {
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "row",
    marginHorizontal: 2,
    borderRadius: 5,
    marginVertical: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderBottomColor: "black",
    padding: 10,
    fontSize: 20,
    borderRadius: 6,
    marginTop: 20,
    height: HEIGHT_ROW
  },
  inputlast: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    fontSize: 18,
    borderRadius: 6,
    marginVertical: 20,
    borderBottomColor: "black",
  },
  mycard: {
    marginTop: 10,
    marginHorizontal: 2,
  },
  cardContent: {
    flexDirection: "row",
    padding: 5,
  },
  mytext: {
    fontSize: 22,
    marginTop: 3,
    marginHorizontal: 15,
  },
});
export default FamilyDetail;
