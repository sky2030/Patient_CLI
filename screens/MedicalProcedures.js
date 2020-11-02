import * as React from "react";
import { StyleSheet, View, Text, Image, ScrollView } from "react-native";

import logo from "../assets/images/no-food.jpg";
import logo1 from "../assets/images/virtual.png";
import logo5 from "../assets/images/medicalappointment1.png";
import logo2 from "../assets/images/microphone.png";
import logo3 from "../assets/images/noise.jpg";
import logo6 from "../assets/images/tie.png";
import logo7 from "../assets/images/distraction.jpg";
import logo8 from "../assets/images/keyboard.jpg";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function MedicalProcedures({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.head}>
        <MaterialIcons
          name="navigate-before"
          size={28}
          onPress={() => navigation.goBack()}
          style={styles.back}
        />

        <Text style={styles.headtext}>Medical Procedures</Text>
        <MaterialCommunityIcons
          name="home-plus"
          size={30}
          color="white"
          onPress={() => navigation.navigate("Hospital")}
          style={{ position: "absolute", right: 10 }}
        />
      </View>

      <View style={styles.headerTop}>
        <Text style={styles.headtext1}>
          Read the Medical Procedures Carefully{" "}
        </Text>
      </View>
      <ScrollView>
        <View style={styles.card}>
          <View style={styles.header}>
            <Text style={styles.headtext1}>Step 1 </Text>
          </View>
          <View style={styles.title1}>
            <View style={styles.title2}>
              <Image source={logo5} style={styles.img1} />
            </View>
            <View style={styles.title9}>
              <Text style={styles.headtext2}>
                Stay Steated and be present in the
              </Text>
              <Text style={styles.headtext2}>
                meeting 3-5 minutes before it starts.
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.card}>
          <View style={styles.header}>
            <Text style={styles.headtext1}>Step 2 </Text>
          </View>
          <View style={styles.title1}>
            <View style={styles.title2}>
              <Image source={logo} style={styles.img1} />
            </View>
            <View style={styles.title9}>
              <Text style={styles.headtext2}>
                No food allowed due to annoying
              </Text>
              <Text style={styles.headtext2}>
                chewing sound when the speaker
              </Text>
              <Text style={styles.headtext2}>not in mute.</Text>
            </View>
          </View>
        </View>

        <View style={styles.card}>
          <View style={styles.header}>
            <Text style={styles.headtext1}>Step 3</Text>
          </View>
          <View style={styles.title1}>
            <View style={styles.title2}>
              <Image source={logo1} style={styles.img1} />
            </View>
            <View style={styles.title9}>
              <Text style={styles.headtext2}>Speak up when you join any</Text>
              <Text style={styles.headtext2}>virtual meeting.</Text>
            </View>
          </View>
        </View>

        <View style={styles.card}>
          <View style={styles.header}>
            <Text style={styles.headtext1}>Step 4 </Text>
          </View>
          <View style={styles.title1}>
            <View style={styles.title2}>
              <Image source={logo2} style={styles.img1} />
            </View>
            <View style={styles.title9}>
              <Text style={styles.headtext2}>
                Mute your microphone when you
              </Text>
              <Text style={styles.headtext2}>are not talking.</Text>
              <Text style={styles.headtext2}>When you want to speak,</Text>
              <Text style={styles.headtext2}>
                Please click on raise hand sign.
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.card}>
          <View style={styles.header}>
            <Text style={styles.headtext1}>Step 5 </Text>
          </View>
          <View style={styles.title1}>
            <View style={styles.title2}>
              <Image source={logo3} style={styles.img1} />
            </View>
            <View style={styles.title9}>
              <Text style={styles.headtext2}>
                Be aware of your surroundings and
              </Text>
              <Text style={styles.headtext2}>
                control external noise as much
              </Text>
              <Text style={styles.headtext2}>as possible.</Text>
            </View>
          </View>
        </View>

        <View style={styles.card}>
          <View style={styles.header}>
            <Text style={styles.headtext1}>Step 6 </Text>
          </View>
          <View style={styles.title1}>
            <View style={styles.title2}>
              <Image source={logo6} style={styles.img1} />
            </View>
            <View style={styles.title9}>
              <Text style={styles.headtext2}>
                Dress appropriately as there may be
              </Text>
              <Text style={styles.headtext2}>
                a request from the organizer of
              </Text>
              <Text style={styles.headtext2}>
                the meeting to switch on your video.
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.card}>
          <View style={styles.header}>
            <Text style={styles.headtext1}>Step 7 </Text>
          </View>
          <View style={styles.title1}>
            <View style={styles.title2}>
              <Image source={logo7} style={styles.img1} />
            </View>
            <View style={styles.title9}>
              <Text style={styles.headtext2}>
                Don't be distracted with other work
              </Text>
              <Text style={styles.headtext2}>
                while the meeting is in process.
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.card}>
          <View style={styles.header}>
            <Text style={styles.headtext1}>Step 8</Text>
          </View>
          <View style={styles.title1}>
            <View style={styles.title2}>
              <Image source={logo8} style={styles.img1} />
            </View>
            <View style={styles.title9}>
              <Text style={styles.headtext2}>Dont type while muted.</Text>
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <Text style={styles.bottomtext}>Privacy Policy | Terms of use</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignContent: "center",
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
  collapseheader: {
    marginBottom: 20,
  },
  footer: {
    backgroundColor: "#077464",
    padding: 20,
    height: 40,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 5,
  },
  bottomtext: {
    color: "#fff",
    fontSize: 15,
  },
  headtext1: {
    color: "white",
    fontSize: 15,
    fontWeight: "bold",
  },

  headtext2: {
    color: "#4E557C",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 2,
    marginLeft: 2,
    width: 350,
  },
  header: {
    color: "#077464",
    backgroundColor: "#077464",
    fontSize: 15,
    fontWeight: "bold",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: 30,
  },
  headerTop: {
    color: "white",
    backgroundColor: "#AB0631",
    fontSize: 15,
    fontWeight: "bold",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: 30,
    marginTop: 5,
  },

  card: {
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "#E5F0ED",
    shadowOffset: { width: 1, height: 1 },
    shadowColor: "#333",
    shadowOpacity: 0.3,
    shadowRadius: 2,
    marginHorizontal: 8,
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 10,
    marginTop: 10,
    width: 400,
  },
  title1: {
    flexDirection: "row",
    marginRight: 20,
  },
  title2: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 15,
    marginLeft: 80,
  },
  title9: {
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 20,
    flexDirection: "column",
    marginRight: 10,
    width: 350,
  },

  img1: {
    marginBottom: 5,
    padding: 30,
    width: 60,
    height: 60,
    borderRadius: 60 / 2,
  },
  collapseview: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
});
