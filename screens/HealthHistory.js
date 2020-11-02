import * as React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
  AccordionList,
} from "accordion-collapse-react-native";
import logo from "../assets/images/prescnew.jpg";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function HealthHistory({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.head}>
        <MaterialIcons
          name="navigate-before"
          size={30}
          onPress={() => navigation.goBack()}
          style={styles.back}
        />
        <Text style={styles.titletext}>Appointment History</Text>
        <MaterialCommunityIcons
          name="home-plus"
          size={30}
          color="white"
          onPress={() => navigation.navigate("Hospital")}
          style={{ position: "absolute", right: 10 }}
        />
      </View>

      <ScrollView>
        <View style={styles.input1}>
          <Text style={styles.baseText1}>Your have Recent Appointments</Text>
        </View>

        <Collapse>
          <CollapseHeader>
            <View style={styles.card1}>
              <View style={styles.header}>
                <Text style={styles.headtext1}>
                  Dr. Ram Kumar (RK Hospital){" "}
                </Text>
              </View>
              <View style={styles.title4}>
                <View style={styles.title7}>
                  <Text style={styles.headtext2}>Symptoms</Text>
                  <Text style={styles.headtext2}>Viral Fever</Text>
                </View>
                <View style={styles.title8}>
                  <Text style={styles.headtext2}>Appointment date</Text>
                  <Text style={styles.headtext2}>20/08/20 </Text>
                </View>
                <View style={styles.title6}>
                  <Text style={styles.headtext2}>Fees</Text>
                  <Text style={styles.headtext2}>Rs. 1000/- </Text>
                </View>
              </View>
            </View>
          </CollapseHeader>
          <CollapseBody style={styles.collapseheader}>
            <View style={styles.card2}>
              <View style={styles.collapseview}>
                <View style={styles.title4}>
                  <View style={styles.title7}>
                    <Text style={styles.headtext7}>Booking Date</Text>
                    <Text style={styles.headtext7}>20/08/20 </Text>
                  </View>
                  <View style={styles.title8}>
                    <Text style={styles.headtext7}>Status</Text>
                    <Text style={styles.header6}>Confirmed </Text>
                  </View>
                  <View style={styles.title6}>
                    <Text style={styles.headtext7}>Fees -</Text>
                    <Text style={styles.headtext7}>Rs. 1500/- </Text>
                  </View>
                </View>
                <View style={styles.title4}>
                  <TouchableOpacity activeOpacity={0.95} style={styles.btn}>
                    <Text style={styles.btntext}>Uploads Reports</Text>
                  </TouchableOpacity>
                  <TouchableOpacity activeOpacity={0.95} style={styles.btn}>
                    <Text style={styles.btntext}>View Prescription</Text>
                  </TouchableOpacity>
                </View>
                <View>
                  <Image source={logo} style={styles.img} />
                </View>
              </View>
            </View>
          </CollapseBody>
        </Collapse>

        <Collapse>
          <CollapseHeader>
            <View style={styles.card1}>
              <View style={styles.header}>
                <Text style={styles.headtext1}>Dr. Radhakrishna (Apollo) </Text>
              </View>
              <View style={styles.title4}>
                <View style={styles.title7}>
                  <Text style={styles.headtext2}>Symptoms</Text>
                  <Text style={styles.headtext2}>Cough and fever </Text>
                </View>
                <View style={styles.title8}>
                  <Text style={styles.headtext2}>Appointment date</Text>
                  <Text style={styles.headtext2}>20/08/20 </Text>
                </View>
                <View style={styles.title6}>
                  <Text style={styles.headtext2}>Fees -</Text>
                  <Text style={styles.headtext2}>Rs. 1000/- </Text>
                </View>
              </View>
            </View>
          </CollapseHeader>
          <CollapseBody style={styles.collapseheader}>
            <View style={styles.card2}>
              <View style={styles.collapseview}>
                <View style={styles.title4}>
                  <View style={styles.title7}>
                    <Text style={styles.headtext7}>Booking Date</Text>
                    <Text style={styles.headtext7}>20/08/20 </Text>
                  </View>
                  <View style={styles.title8}>
                    <Text style={styles.headtext7}>Status</Text>
                    <Text style={styles.header6}>Confirmed </Text>
                  </View>
                  <View style={styles.title6}>
                    <Text style={styles.headtext7}>Fees -</Text>
                    <Text style={styles.headtext7}>Rs. 1500/- </Text>
                  </View>
                </View>
                <View style={styles.title4}>
                  <TouchableOpacity activeOpacity={0.95} style={styles.btn}>
                    <Text style={styles.btntext}>Uploads Reports</Text>
                  </TouchableOpacity>
                  <TouchableOpacity activeOpacity={0.95} style={styles.btn}>
                    <Text style={styles.btntext}>View Prescription</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </CollapseBody>
        </Collapse>

        <Collapse>
          <CollapseHeader>
            <View style={styles.card1}>
              <View style={styles.header}>
                <Text style={styles.headtext1}>
                  Dr. Anurag Kashyap (AIIMS){" "}
                </Text>
              </View>
              <View style={styles.title4}>
                <View style={styles.title7}>
                  <Text style={styles.headtext2}>Symptoms</Text>
                  <Text style={styles.headtext2}>Stomach Ppain </Text>
                </View>
                <View style={styles.title8}>
                  <Text style={styles.headtext2}>Appointment date</Text>
                  <Text style={styles.headtext2}>20/08/20 </Text>
                </View>
                <View style={styles.title6}>
                  <Text style={styles.headtext2}>Fees -</Text>
                  <Text style={styles.headtext2}>Rs. 1500/- </Text>
                </View>
              </View>
            </View>
          </CollapseHeader>
          <CollapseBody style={styles.collapseheader}>
            <View style={styles.card2}>
              <View style={styles.collapseview}>
                <View style={styles.title4}>
                  <View style={styles.title7}>
                    <Text style={styles.headtext7}>Booking Date</Text>
                    <Text style={styles.headtext7}>20/08/20 </Text>
                  </View>
                  <View style={styles.title8}>
                    <Text style={styles.headtext7}>Status</Text>
                    <Text style={styles.header6}>Confirmed </Text>
                  </View>
                  <View style={styles.title6}>
                    <Text style={styles.headtext7}>Fees -</Text>
                    <Text style={styles.headtext7}>Rs. 1500/- </Text>
                  </View>
                </View>
                <View style={styles.title4}>
                  <TouchableOpacity activeOpacity={0.95} style={styles.btn}>
                    <Text style={styles.btntext}>Uploads Reports</Text>
                  </TouchableOpacity>
                  <TouchableOpacity activeOpacity={0.95} style={styles.btn}>
                    <Text style={styles.btntext}>View Prescription</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </CollapseBody>
        </Collapse>

        <Collapse>
          <CollapseHeader>
            <View style={styles.card1}>
              <View style={styles.header}>
                <Text style={styles.headtext1}>Dr. Shiva Kumar (Kailash) </Text>
              </View>
              <View style={styles.title4}>
                <View style={styles.title7}>
                  <Text style={styles.headtext2}>Symptoms</Text>
                  <Text style={styles.headtext2}>Red Eye infection </Text>
                </View>
                <View style={styles.title8}>
                  <Text style={styles.headtext2}>Appointment date</Text>
                  <Text style={styles.headtext2}>20/08/20 </Text>
                </View>
                <View style={styles.title6}>
                  <Text style={styles.headtext2}>Fees -</Text>
                  <Text style={styles.headtext2}>Rs. 1500/- </Text>
                </View>
              </View>
            </View>
          </CollapseHeader>
          <CollapseBody style={styles.collapseheader}>
            <View style={styles.card2}>
              <View style={styles.collapseview}>
                <View style={styles.title4}>
                  <View style={styles.title7}>
                    <Text style={styles.headtext7}>Booking Date</Text>
                    <Text style={styles.headtext7}>20/08/20 </Text>
                  </View>
                  <View style={styles.title8}>
                    <Text style={styles.headtext7}>Status</Text>
                    <Text style={styles.header6}>Confirmed </Text>
                  </View>
                  <View style={styles.title6}>
                    <Text style={styles.headtext7}>Fees -</Text>
                    <Text style={styles.headtext7}>Rs. 1500/- </Text>
                  </View>
                </View>
                <View style={styles.title4}>
                  <TouchableOpacity activeOpacity={0.95} style={styles.btn}>
                    <Text style={styles.btntext}>Uploads Reports</Text>
                  </TouchableOpacity>
                  <TouchableOpacity activeOpacity={0.95} style={styles.btn}>
                    <Text style={styles.btntext}>View Prescription</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </CollapseBody>
        </Collapse>
      </ScrollView>
      {/* <TouchableOpacity
        style={styles.footer}
        onPress={() => navigation.navigate("PrivacyPolicy")}
      >
        <Text style={styles.bottomtext}>Privacy Policy | Terms of use</Text>
      </TouchableOpacity> */}
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
  collapseheader: {
    marginBottom: 20,
  },
  footer: {
    backgroundColor: "#58DCFC",
    padding: 20,
    height: 40,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  bottomtext: {
    color: "#fff",
    fontSize: 15,
  },
  headtext: {
    color: "#2E76B6",
    fontSize: 30,
    fontWeight: "500",
    marginBottom: 20,
    borderColor: "#2E76B6",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 10,
  },
  headtext1: {
    color: "white",
    fontSize: 15,
    fontWeight: "500",
    marginVertical: 5,
  },
  btntext: {
    color: "white",
    fontSize: 15,
    padding: 10,
  },
  headtext2: {
    color: "#4E557C",
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 2,
    marginTop: 8,
    marginLeft: 2,
  },
  header6: {
    color: "green",
    fontSize: 14,
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
    fontSize: 15,
    fontWeight: "500",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 70,
  },
  header: {
    color: "white",
    backgroundColor: "#192161",
    fontSize: 15,
    fontWeight: "500",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  card: {
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
    paddingBottom: 10,
  },
  card1: {
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "#E5F0ED",
    shadowOffset: { width: 1, height: 1 },
    shadowColor: "#333",
    shadowOpacity: 0.3,
    shadowRadius: 2,
    marginHorizontal: 10,
    // alignItems: "center",
    // justifyContent: "center",
    marginBottom: 20,
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
    marginHorizontal: 10,
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
    fontSize: 15,
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
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  title5: {
    alignItems: "flex-start",
    justifyContent: "flex-start",
    marginLeft: 25,
    marginRight: 10,
    flexDirection: "column",
  },
  title6: {
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 30,
    flexDirection: "column",
  },
  title7: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  title8: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  title9: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
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
    marginTop: 15,
    elevation: 3,
    marginBottom: 15,
    marginLeft: 25,
  },
  img1: {
    marginBottom: 10,
    width: 90,
    padding: 15,
    marginTop: 10,
    width: 60,
    height: 60,
    borderRadius: 60 / 2,
  },
});
