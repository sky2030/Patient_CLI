import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  ImageBackground,
  StatusBar,
  Alert, FlatList, Dimensions
} from "react-native";
import PageControl from "react-native-page-control";

import AsyncStorage from "@react-native-community/async-storage";
import {
  Fontisto,
  FontAwesome5,
  MaterialIcons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
const screenWidth = Math.round(Dimensions.get("window").width);

const HomeScreen = ({ navigation, route }) => {
  const [item, setHdata] = useState([]);
  const [hospitalcode, sethospitalcode] = useState("");
  const [hospitalName, sethospitalName] = useState("");
  const [data, Setdata] = useState({});
  const [loading, setLoading] = useState(true);
  const [currentPage, setcurrentPage] = useState(0);


  const GetProfile = async () => {
    const userToken = await AsyncStorage.getItem("userToken");
    //   console.log(userToken)
    fetch(BASE_URL, {
      method: "GET",
      headers: { Authorization: userToken },
    })
      .then((res) => res.json())
      .then((results) => {
        setLoading(false);
        if (results.code == 200) {
          Setdata(results.data);

        } else {
          Alert.alert(Alert_Title, results.message);
        }
      })
      .catch((err) => {
        setLoading(false);
        Alert.alert(Alert_Title, SOMETHING_WENT_WRONG);
      });
  };
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      setLoading(true);
      GetProfile();
      setHdata(route.params.item);
      // sethospitalcode(route.params.item.hospitalcode);
      sethospitalName(route.params.item.hospitalname);
      // setHospital(route.params.item);
    });

    return unsubscribe;
  }, [route.params.item]);
  const onScrollEnd = (e) => {
    let contentOffset = e.nativeEvent.contentOffset;
    let viewSize = e.nativeEvent.layoutMeasurement;

    // Divide the horizontal offset by the width of the view to see which page is visible
    let pageNum = Math.floor(contentOffset.x / viewSize.width);
    // console.log('scrolled to page ', pageNum);
    setcurrentPage(pageNum);
  };
  const renderListSpecialization = (item) => {
    // console.log("url :", `${BASE}${item.picture.url}`)
    return (
      <TouchableOpacity
        activeOpacity={0.95}
        style={{ width: screenWidth, flexDirection: "row" }}
      // onPress={() => navigation.navigate("HospitalHome", { item })}
      >
        <View>
          <Image style={{
            height: 100, width: 150,
            marginLeft: 20,
          }}
            source={{ uri: `${BASE}${item.picture.url}` }} />
        </View>
        <View style={{ marginLeft: 20, marginRight: 10, flex: 1 }}>
          <Text numberOfLines={2} style={{
            color: "black",
            fontSize: 17,
            fontWeight: "500",
          }}>{item.title} </Text>
          <Text numberOfLines={4}>{item.description} </Text>

        </View>
      </TouchableOpacity>
    );
  }
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#009387" barStyle="light-content" />
      <View style={styles.head}>
        <MaterialIcons
          name="navigate-before"
          size={30}
          onPress={() => navigation.goBack()}
          style={styles.back}
        />
        <Text style={styles.titletext}>{hospitalName} </Text>
        <MaterialCommunityIcons
          name="home-plus"
          size={30}
          color="white"
          onPress={() => navigation.navigate("Hospital")}
          style={{ position: "absolute", right: 10 }}
        />
      </View>
      <View style={styles.header}>
        <ImageBackground
          style={styles.imgBackground}
          source={{ uri: "imagebg" }}
        ></ImageBackground>
      </View>
      <View style={{ marginBottom: 10 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Text style={styles.intro}>Welcome, </Text>
          <Text style={styles.PatientName}>{data.patient_name}</Text>
        </View>
        <Text style={styles.intro}>How can we help you? </Text>
      </View>

      <View style={styles.CardRows}>
        <TouchableOpacity
          onPress={() => navigation.navigate("Speciality", { item })}
          style={styles.card}
        >
          <View style={{ alignItems: "center" }}>
            <Fontisto name="doctor" size={28} color="#0b635c" />
          </View>
          <View style={{ marginLeft: 10 }}>
            <Text style={styles.cardtext}>Book Doctor</Text>
          </View>
        </TouchableOpacity>

      </View>
      {
        item != undefined && item.specialities != undefined && item.specialities.length > 0 &&
        <View>
          <Text style={{
            color: "black",
            fontSize: 18,
            fontWeight: "500",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            paddingLeft: 20,
          }}>Hospital Specialization </Text>
          <FlatList
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            style={{ marginTop: 10 }}
            data={item.specialities}
            onMomentumScrollEnd={onScrollEnd}
            renderItem={({ item }) => {
              return renderListSpecialization(item);
            }}
            keyExtractor={(item) => item.id}
          />
          {
            <PageControl
              style={{ marginHorizontal: 0, marginTop: 10 }}
              numberOfPages={item.specialities.length}
              currentPage={currentPage}
              hidesForSinglePage
              pageIndicatorTintColor="gray"
              currentPageIndicatorTintColor="#009387"
              indicatorStyle={{ borderRadius: 5 }}
              currentIndicatorStyle={{ borderRadius: 5 }}
              indicatorSize={{ width: 8, height: 8 }}
            // onPageIndicatorPress={this.onItemTap}
            />
          }
        </View>
      }

      <TouchableOpacity
        style={styles.footer}
        onPress={() => navigation.navigate("PrivacyPolicy")}
      >
        <Text style={styles.bottomtext}>Privacy Policy | Terms of use</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
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

  titletext: {
    color: "white",
    fontSize: 21,
    fontWeight: "500",
    textAlign: "center",
    width: "80%",
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

  PatientName: {
    color: "#0b635c",
    fontSize: 23,
    fontWeight: "500",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    fontStyle: "italic",
    marginTop: 5,
  },
  intro: {
    color: "black",
    fontSize: 20,
    fontWeight: "500",
    fontStyle: "italic",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    paddingLeft: 20,
  },
  Sintro: {
    color: "black",
    marginTop: 5,
    fontSize: 20,
    fontWeight: "500",
    fontStyle: "italic",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  cardtext: {
    color: "black",
    fontSize: 20,
    fontWeight: "500",
    justifyContent: "center",
    alignItems: "center",
  },
  specialities: {
    color: "black",
    fontSize: 16,
    fontWeight: "600",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 8,
    marginVertical: 8,
  },
  CardRows: {
    flexDirection: "row",
    alignSelf: "center",
    // justifyContent: "space-evenly",
    alignItems: "center",
    //marginVertical:5,
    width: "95%",
    borderRadius: 30,
    marginBottom: 10,
    // backgroundColor: "#e1e"
  },

  card: {
    flex: 1,
    borderColor: "white",
    elevation: 3,
    backgroundColor: "white",
    shadowOffset: { width: 1, height: 1 },
    marginHorizontal: 10,
    marginVertical: 5,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    borderRadius: 15,
    borderWidth: 0.2,
    paddingVertical: 10
  },
  SpecialityCard: {
    flex: 1,
    borderColor: "white",
    elevation: 3,
    backgroundColor: "white",
    shadowOffset: { width: 1, height: 1 },
    marginHorizontal: 10,
    marginVertical: 5,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
    borderWidth: 0.2,
  },

  imgBackground: {

    aspectRatio: 1.6,
    shadowOpacity: 0.3,
    shadowOffset: { width: 1, height: 1 },
    shadowColor: "#333",
    borderRadius: 30,
  },
  header: {
    width: "100%",
    shadowOpacity: 0.3,
    shadowOffset: { width: 1, height: 1 },
    shadowColor: "#333",
  },
});
