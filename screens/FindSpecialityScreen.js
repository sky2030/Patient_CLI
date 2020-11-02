import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
  FlatList,
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import AsyncStorage from "@react-native-community/async-storage";
import { Searchbar } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const FindSpecialityScreen = ({ navigation, route }) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [hospitalcode, sethospitalcode] = useState("");
  const [hospitalName, sethospitalName] = useState("");
  const [searchQuery, setSearchQuery] = React.useState("");

  const onChangeSearch = (query) => setSearchQuery(query);
  // const [hospital, sethospital] = useState({});

  const fetchData = async () => {
    await sethospitalcode(route.params.item.hospitalcode);
    await sethospitalName(route.params.item.hospitalname);
    const userToken = await AsyncStorage.getItem("userToken");
    let baseURL = `${BASE_URL}hospitals/${route.params.item.hospitalcode}/departments`
    console.log("Base url :", baseURL)
    fetch(
      baseURL,
      { method: "GET", headers: { Authorization: userToken } }
    )
      .then((res) => res.json())
      .then((results) => {
        setLoading(false);
        console.log(JSON.stringify(data));
        if (results.code == 200) {
          setData(results.data);
        } else {
          Alert.alert(Alert_Title, results.message);
        }
      })
      .catch((err) => {
        Alert.alert(Alert_Title, SOMETHING_WENT_WRONG);
      });
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      fetchData();
    });

    return unsubscribe;
  }, [route.params.item]);

  const renderList = (item) => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() =>
          navigation.navigate("Doctors", { item, hospitalName, hospitalcode })
        }
        style={styles.card}
      >
        <View style={styles.imgview}>
          <Image source={{ uri: item.picture }} style={styles.img} />
        </View>
        <View style={styles.dept}>
          <Text style={styles.headtext}>{item.departmentname}</Text>
          <Text style={styles.headtext1}>{item.deptcode}</Text>
          <Text style={styles.headtext2}>{item.description}</Text>
        </View>
      </TouchableOpacity>
    );
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
        <Text style={styles.header}>Select a Department</Text>
        <MaterialCommunityIcons
          name="home-plus"
          size={30}
          color="white"
          onPress={() => navigation.navigate("Hospital")}
          style={{ position: "absolute", right: 10 }}
        />
      </View>

      <View style={styles.hospitaltitle}>
        <Text style={styles.hospitaltext}>{hospitalName}</Text>
      </View>
      {/* <Searchbar
        placeholder="Search Doctor"
        onChangeText={onChangeSearch}
        value={searchQuery}
      /> */}

      <FlatList
        data={data}
        renderItem={({ item }) => {
          return renderList(item);
        }}
        keyExtractor={(item) => item._id}
        onRefresh={() => fetchData()}
        refreshing={loading}
      />
    </View>
  );
};

export default FindSpecialityScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },

  dept: {
    // paddingLeft: 40,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    flexDirection: "column",
    marginLeft: 10,
    flex: 2,
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
  header: {
    color: "white",
    fontSize: 21,
    fontWeight: "500",
    textAlign: "center",
    width: "80%",
  },

  hospitaltitle: {
    backgroundColor: "white",
    width: "100%",
    alignItems: "center",
  },
  hospitaltext: {
    color: "black",
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 5,
  },

  headtext: {
    color: "black",
    fontSize: 25,
    fontWeight: "bold",
    flex: 1,
  },
  headtext1: {
    color: "#4E557C",
    fontSize: 16,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    marginLeft: 5,
    flex: 1,
  },
  headtext2: {
    color: "#4E557C",
    fontSize: 16,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 5,
    flex: 2,
  },
  card: {
    flex: 1,
    // borderRadius: 6,
    borderColor: "white",
    elevation: 3,
    backgroundColor: "white",
    shadowOffset: { width: 1, height: 1 },
    shadowColor: "#333",
    shadowOpacity: 0.3,
    shadowRadius: 2,
    marginHorizontal: 10,
    marginVertical: 10,
    flexDirection: "row",
    borderRadius: 15,
    borderWidth: 0.2,
    padding: 10,
  },
  img: {
    flex: 1,
    aspectRatio: 1,
    borderWidth: 1,
    // marginLeft: 12,
    // marginVertical: 12,
    // backgroundColor: "black",
  },
  imgview: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    aspectRatio: 1,
    // backgroundColor: "#1e1",
  },
});
