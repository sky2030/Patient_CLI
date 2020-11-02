/**
 * Reports
 * @ Mi-Xlab Anoop
 */

import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView, FlatList, Alert, Dimensions
} from "react-native";

import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { AntDesign } from "@expo/vector-icons";
import PageControl from "react-native-page-control";
import AsyncStorage from "@react-native-community/async-storage";
import { Button, TextInput } from "react-native-paper";
import moment from "moment-timezone"
const windowWidth = Dimensions.get('window').width;

export default function ReportRepo({ navigation, route }) {



  const [data, setData] = useState([]);
  const [currentPage, setcurrentPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [appointment_id, setAppointment_id] = useState("");
  let key_prefix = ""


  const fetchData = async (appointmentid) => {
    const userToken = await AsyncStorage.getItem("userToken");
    let URL = ""
    if (appointmentid) {
      URL = `${BASE_URL}report/${appointmentid}`;
    }
    else {
      URL = `${BASE_URL}reports`;
    }
    console.log(URL);
    fetch(URL, {
      method: "GET",
      headers: { Authorization: userToken },

    })
      .then((res) => res.json())
      .then((results) => {
        console.log(JSON.stringify(results));
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
  };
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      key_prefix = ""
      console.log("Focus report screen  :", route.params)
      if (route.params && route.params.appointment_id) {
        key_prefix = route.params.appointment_id
        setAppointment_id(route.params.appointment_id)
        fetchData(route.params.appointment_id)
      }
      else {
        setAppointment_id("")
        fetchData(undefined)
      }

    });
    return unsubscribe;
  }, [route.params]);
  const removeReport = async (item, index) => {
    const userToken = await AsyncStorage.getItem("userToken");
    let URL = `${BASE_URL}report/${item.report_id}`;
    console.log(URL);
    fetch(URL, {
      method: "delete",
      headers: { Authorization: userToken },

    })
      .then((res) => res.json())
      .then((results) => {
        console.log(JSON.stringify(results));
        if (results.code == 200) {
          console.log("Index to remove :", index)
          if (index > -1) {

            let dup_list = [...data]
            dup_list.splice(index, 1);
            console.log("data after remove :", dup_list)
            setData(dup_list)
          }

        }
        Alert.alert(Alert_Title, results.message);
      })
      .catch((err) => {
        setLoading(false);

        Alert.alert(Alert_Title, SOMETHING_WENT_WRONG);
      });
  }
  const replaceReport = (item) => {

    navigation.navigate("AddReport", { appointment_id: undefined, report: item })

  }
  const renderItem = (item, index) => {
    let fileString = ""
    if (item.file) {
      fileString = `${BASE}${item.file.url}`
    }
    const report = item.report_name
    const dateOfReport = moment(Number(item.report_date)).format("ll")
    return (
      <ScrollView
        horizontal={false}
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled
        contentContainerStyle={{ width: windowWidth, alignItems: "center", }}
      >
        {
          fileString.length > 0 && (
            <View>
              <Image
                source={{ uri: fileString }}
                style={{
                  width: windowWidth - 20, aspectRatio: 0.8, marginTop: 15,
                  backgroundColor: "#eee"
                }}
                resizeMode={"contain"}
              />
            </View>
          )
        }
        <View style={{
          flexDirection: "row", justifyContent: "space-between", marginTop: 5,
          width: "90%"
        }}>
          {
            report.length > 0 &&
            <Text style={{ fontSize: 16 }}>Report : {report}</Text>

          }
          {
            report.length > 0 &&
            <Text style={{ fontSize: 16 }}>Date : {dateOfReport}</Text>

          }
        </View>
        {

          fileString.length > 0 &&
          <View style={{ width: "95%", flexDirection: "row", justifyContent: "center", marginTop: 20 }}>
            <TouchableOpacity
              onPress={() => removeReport(item, index)}
            >
              <Text style={styles.whitebold}>Remove Report</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ marginLeft: 20 }}
              onPress={() => replaceReport(item)}
            >
              <Text style={styles.whitebold}>Replace Report</Text>
            </TouchableOpacity>
          </View>
        }

      </ScrollView>
    );
  };
  const onScrollEnd = (e) => {
    let contentOffset = e.nativeEvent.contentOffset;
    let viewSize = e.nativeEvent.layoutMeasurement;

    // Divide the horizontal offset by the width of the view to see which page is visible
    let pageNum = Math.floor(contentOffset.x / viewSize.width);
    // console.log('scrolled to page ', pageNum);
    setcurrentPage(pageNum);
  };
  return (
    <View style={styles.container}>
      {
        appointment_id.length > 0 && <View style={styles.head} >
          <Text style={styles.titletext}>My Reports</Text>
          <MaterialIcons
            name="navigate-before"
            size={30}
            onPress={() => navigation.goBack()}
            style={styles.back}
          />
          <Button
            style={{ position: "absolute", right: 12, alignSelf: "center" }}
            icon="upload"
            mode="contained"
            theme={{
              colors: {
                primary: "#4E557C",
              }
            }}
            onPress={() =>
              navigation.navigate("AddReport", { appointment_id })

            }
          >
            Upload
        </Button>
        </View>
      }

      {
        <FlatList

          horizontal
          pagingEnabled
          data={data}
          renderItem={({ item, index }) => renderItem(item, index)}
          keyExtractor={(item, index) => `${key_prefix}${item.report_id}`}
          onMomentumScrollEnd={onScrollEnd}
          onRefresh={() => { }}
          refreshing={loading}
          style={{ marginBottom: 30, }}
        />
      }
      {
        data.length > 0 && (
          <PageControl
            style={{ position: "absolute", left: 0, right: 0, bottom: 14 }}
            numberOfPages={data.length}
            currentPage={currentPage}
            hidesForSinglePage
            pageIndicatorTintColor="gray"
            currentPageIndicatorTintColor="#009387"
            indicatorStyle={{ borderRadius: 5 }}
            currentIndicatorStyle={{ borderRadius: 5 }}
            indicatorSize={{ width: 8, height: 8 }}
          />
        )}


      <TouchableOpacity
        onPress={() => navigation.navigate("AddReport", { appointment_id, report: undefined })}
        style={{
          position: "absolute", right: 20, bottom: 60,
          borderRadius: 3,

        }}
      >
        <MaterialIcons name="note-add" size={45} color="#940d2f" />

      </TouchableOpacity>
    </View>
  );
}
const theme = {
  colors: {
    primary: "#006aff",
  },
};
const styles = StyleSheet.create({
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
    color: PRIMARY_COLOR,
    position: "absolute"
  },

  titletext: {
    color: PRIMARY_COLOR,
    fontSize: 21,
    fontWeight: "500",
    textAlign: "center",
    width: "80%",
    backgroundColor: "transparent"
  },

  presCard: {
    flex: 1,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "#fff",
    shadowOffset: { width: 1, height: 1 },
    shadowColor: "#333",
    shadowOpacity: 0.3,
    shadowRadius: 2,
    marginHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 10,
  },
  headtext1: {
    color: "white",
    fontSize: 15,
    fontWeight: "bold",
  },
  btntext: {
    color: "white",
    fontSize: 15,
    padding: 10,
  },
  headtext2: {
    color: "#4E557C",
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 2,
    marginTop: 8,
    marginLeft: 2,
  },
  header: {
    color: "white",
    backgroundColor: "#192161",
    fontSize: 15,
    fontWeight: "bold",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  HeadCard: {
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "#E5F0ED",
    shadowOffset: { width: 1, height: 1 },
    shadowColor: "#333",
    shadowOpacity: 0.3,
    shadowRadius: 2,
    marginHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 5,
  },

  title4: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },

  title7: {
    alignItems: "center",
    justifyContent: "center",
    marginRight: 35,
    flexDirection: "column",
  },
  title8: {
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 15,
    flexDirection: "column",
  },

  img: {
    marginBottom: 5,
    padding: 30,
    width: 100,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    marginTop: 20,
    width: 90,
    padding: 20,
    marginBottom: 7,
    marginTop: 7,
    width: 90,
    padding: 10,
    width: 250,
    height: 250,
  },
  collapseview: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  Addbtn: {
    position: "absolute",
    bottom: 50,
    backgroundColor: "#E5F0ED",
    padding: 10,
    flexDirection: "row",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    margin: 30,
    elevation: 3,
  },
  inputStyle: {
    margin: 5,
    width: "90%",
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
  }
});
