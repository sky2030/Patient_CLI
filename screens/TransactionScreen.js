
/**
 * Transaction
 * @ Mi-Xlab Anoop
 */
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
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-community/async-storage";
const screenWidth = Math.round(Dimensions.get("window").width);
import moment from "moment-timezone";
export default function Transaction({ navigation, route }) {

  const [item, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const GetTransactiondata = async () => {
    const userToken = await AsyncStorage.getItem("userToken");
    //   console.log(userToken)
    fetch(`${BASE_URL}orders`, {
      method: "GET",
      headers: { Authorization: userToken },
    })
      .then((res) => res.json())
      .then((results) => {
        console.log("Orders :", JSON.stringify(results.data))
        setLoading(false);
        if (results.code == 200) {
          setData(results.data);

        } else {
          Alert.alert(Alert_Title, results.message);
        }
      })
      .catch((err) => {
        setLoading(false);
        Alert.alert(Alert_Title, SOMETHING_WENT_WRONG);
      });
  }
  const LoadMoreGetTransactiondata = async () => {
    console.log("Load more transaction")
    setIsLoadingMore(true)
    const userToken = await AsyncStorage.getItem("userToken");
    //   console.log(userToken)
    let offset = 0
    if (item && item.length > 0) {
      offset = item.length
    }
    fetch(`${BASE_URL}orders?offset=${offset}`, {
      method: "GET",
      headers: { Authorization: userToken },
    })
      .then((res) => res.json())
      .then((results) => {
        console.log("More Orders :", JSON.stringify(results.data))
        setIsLoadingMore(false)
        if (results.code == 200) {
          // setData(results.data);
          if (item && item.length > 0) {

            setData(item.concat(results.data))
          }
        }
      })
      .catch((err) => {
        setIsLoadingMore(false)
      });
  }
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      setLoading(true);
      GetTransactiondata();

    });

    return unsubscribe;
  }, [route.params]);
  const renderList = (item) => {
    //{moment(item.date).format("ll")}
    return (
      <View style={styles.card1}>
        <View style={styles.header}>
          {/* <Text style={styles.headtext1}> Invoice No. {item.invoice} </Text> */}
          <View style={{ flexDirection: "row", flex: 1, justifyContent: "space-between" }}>
            <Text style={{
              alignSelf: "flex-start", backgroundColor: "lightgray",
              paddingHorizontal: 10, paddingVertical: 2
            }}>{item.status.toUpperCase()}</Text>
            <Text style={{
              alignSelf: "flex-end", backgroundColor: "lightgray",
              paddingHorizontal: 10, paddingVertical: 2
            }}>{moment(item.date).format("ll")}</Text>
          </View>
          <View style={styles.title7}>
            <Text style={styles.headtext1}> Invoice No </Text>
            <Text style={styles.InvoiceNo}>{item.invoice.toUpperCase()}</Text>
          </View>
        </View>

        <View style={styles.title4}>

          <View style={styles.title8}>
            <Text style={styles.headtext2}>Doctor</Text>
            <Text style={styles.headtext2}>Dr. {item.doctor_name}</Text>
          </View>
          <View style={styles.title6}>
            <Text style={styles.headtext2}>Amount</Text>
            <Text style={styles.headtext2}>{item.amount} {item.currency} </Text>
          </View>
        </View>


      </View>
    )
  }
  return (



    <View style={styles.container}>
      <View style={styles.head}>
        <MaterialIcons
          name="navigate-before"
          size={30}
          onPress={() => navigation.goBack()}
          style={styles.back}
        />
        <Text style={styles.titletext}>Transactions history </Text>
        <MaterialCommunityIcons
          name="home-plus"
          size={30}
          color="white"
          onPress={() => navigation.navigate("Hospital")}
          style={{ position: "absolute", right: 10 }}
        />

      </View>
      <FlatList
        data={item}
        renderItem={({ item }) => {
          return renderList(item);
        }}
        onRefresh={() => GetTransactiondata()}
        refreshing={loading}
        onEndReachedThreshold={0.4}
        onEndReached={() => {
          if (isLoadingMore == false) {
            LoadMoreGetTransactiondata()
          }

        }}
        keyExtractor={(item) => item.invoice}
      />
    </View>
  );
}

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
    marginBottom: 10,
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
    backgroundColor: "#009387",
    padding: 20,
    height: 40,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  bottomtext: {
    color: "white",
    fontSize: 15,
  },
  headtext: {
    color: "#2E76B6",
    fontSize: 24,
    fontWeight: "500",
    marginBottom: 20,
    marginTop: 10,
    borderColor: "#2E76B6",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 10,
    marginLeft: 50,
  },
  headtext1: {
    color: "#2F504C",
    fontSize: 17,
    fontWeight: "500",
    alignSelf: "center",
  },
  btntext: {
    color: "white",
    fontSize: 15,
    padding: 10,
  },
  headtext2: {
    color: "#4E557C",
    marginTop: 5,
    fontWeight: "500",
  },
  InvoiceNo: {
    color: PRIMARY_COLOR,
    fontWeight: "500",
    fontSize: 16,
    marginLeft: 10,
    marginBottom: 5
  },
  header6: {
    color: "green",

    fontWeight: "500",
    marginBottom: 2,
    marginTop: 8,
    marginLeft: 2,
  },
  headtext3: {
    color: "#4E557C",
    fontSize: 15,
    fontWeight: "500",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 70,
    marginTop: 20,
  },
  headtext4: {
    color: "#4E557C",

    fontWeight: "500",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 70,
  },
  header: {
    color: "black",
    backgroundColor: "#EEF5F4",
    fontSize: 15,
    fontWeight: "500",
  },
  card: {
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "white",
    shadowOffset: { width: 1, height: 1 },
    shadowColor: "#333",
    shadowOpacity: 0.3,
    shadowRadius: 2,
    marginHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 10,
  },
  card1: {
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "white",
    shadowOffset: { width: 2, height: 2 },
    shadowColor: "#55DE61",
    shadowOpacity: 0.3,
    shadowRadius: 2,
    marginHorizontal: 10,
    // alignItems: "center",
    // justifyContent: "center",
    marginBottom: 10,
    alignSelf: "center",
    marginTop: 10,
    width: screenWidth - 20,
    paddingBottom: 10,
  },
  card2: {
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "#CED2DC",
    shadowOffset: { width: 1, height: 1 },
    shadowColor: "#333",
    shadowOpacity: 0.3,
    shadowRadius: 2,
    alignItems: "center",
    justifyContent: "center",
    width: "90%",
    marginHorizontal: 20,
  },
  card3: {
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "#7B6DA3",
    shadowOffset: { width: 1, height: 1 },
    shadowColor: "#333",
    shadowOpacity: 0.3,
    shadowRadius: 2,
    marginHorizontal: 10,
    marginVertical: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  cardContent: {
    marginHorizontal: 20,
    marginVertical: 10,
  },
  input3: {
    marginBottom: 15,
    marginTop: 15,
  },
  input1: {
    alignContent: "center",
    justifyContent: "center",
    fontSize: 15,
    fontWeight: "500",
    marginLeft: 15,
  },
  baseText1: {
    marginBottom: 15,
    marginTop: 15,
    alignContent: "center",
    justifyContent: "center",
    fontSize: 18,
    fontWeight: "500",
  },
  title1: {
    flexDirection: "row",
    marginRight: 20,
  },
  title2: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 15,
  },
  title3: {
    alignItems: "flex-start",
    justifyContent: "flex-start",
    marginTop: 10,
    marginLeft: 10,
    marginRight: 170,
    flexDirection: "row",
  },
  title4: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title5: {
    alignItems: "flex-start",
    justifyContent: "flex-start",
    marginLeft: 25,
    marginRight: 10,
    flexDirection: "column",
  },
  title6: {
    flex: 0.8,
    // backgroundColor: "#1e1",
    alignItems: "center",
    marginVertical: 5,
    marginRight: 5,
  },
  title7: {
    // flexDirection: "row",
    justifyContent: "space-between",
    // backgroundColor: "#281",
    marginLeft: 5,
    alignItems: "center",
    backgroundColor: "#EEF5F4",

  },
  title8: {
    flex: 1,
    alignItems: "center",
    // backgroundColor: "#8e1",
    marginVertical: 5,
  },
  title9: {
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 60,
    flexDirection: "column",
    marginRight: 10,
  },
  title10: {
    color: "white",
    backgroundColor: "#192161",
    fontSize: 15,
    fontWeight: "500",
    alignItems: "center",
    justifyContent: "center",
    width: "90%",
    marginHorizontal: 20,
  },
  title11: {
    alignItems: "flex-start",
    justifyContent: "flex-start",
    marginTop: 20,
    marginLeft: 10,
    marginRight: 20,
    flexDirection: "column",
  },
  header2: {
    color: "#4E557C",
    fontSize: 15,
    fontWeight: "500",
    marginBottom: 10,
    marginRight: 10,
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  header3: {
    color: "#4E557C",
    fontSize: 15,
    fontWeight: "500",
    marginBottom: 2,
    marginTop: 10,
  },
  header4: {
    color: "#4E557C",
    fontSize: 15,
    fontWeight: "500",
    marginRight: 70,
    marginTop: 10,
  },
  header5: {
    color: "green",
    fontSize: 15,
    fontWeight: "500",
    marginBottom: 2,
    marginTop: 10,
  },
  headtext6: {
    color: "blue",
    fontSize: 15,
    fontWeight: "500",
    marginBottom: 2,
    marginTop: 10,
  },
  detail: {
    flexDirection: "row",
  },
  img: {
    marginBottom: 5,
    padding: 20,
    width: 60,
    height: 60,
    borderRadius: 60 / 2,
    marginLeft: 10,
  },
  collapseview: {
    flexDirection: "column",
  },
  btn: {
    width: 150,
    backgroundColor: "#707379",
    padding: 5,
    color: "#fff",
    fontSize: 22,
    fontWeight: "500",
    flexDirection: "row",
    borderRadius: 5,
    height: 25,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    elevation: 3,
    marginBottom: 20,
    marginLeft: 20,
  },
  img1: {
    marginBottom: 40,
    padding: 15,
    marginTop: 10,
    width: 30,
    height: 30,
    borderRadius: 30 / 2,
  },
});
