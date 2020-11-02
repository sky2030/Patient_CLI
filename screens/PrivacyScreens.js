import * as React from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";

import MaterialIcons from "react-native-vector-icons/MaterialIcons";

export default function PrivacyPolicy({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.head}>
        <MaterialIcons
          name="navigate-before"
          size={28}
          onPress={() => navigation.goBack()}
          style={styles.back}
        />

        <Text style={styles.headtext}>Privacy Procedures</Text>
      </View>

      <View style={styles.headerTop}>
        <Text style={styles.headtext1}>
          Read the Terms & Condition Carefully{" "}
        </Text>
      </View>
      <ScrollView>
        <View style={styles.card}>
          <View style={styles.header}>
            <Text style={styles.headtext1}>Step 1 (Introduction) </Text>
          </View>
          <View style={styles.title1}>
            <View style={styles.title2}>
              {/* <Image 
                        source={logo5}
                        style={styles.img1}/> */}
            </View>
            <View style={styles.title9}>
              <Text style={styles.bodytext}>
                These Website Standard Terms and Conditions written on this
                webpage shall manage your use of our website, Webiste Name
                accessible at Website.com.
              </Text>
              {/* <Text style={styles.bodytext}>
                        meeting 3-5 minutes before it starts.
                        </Text> */}
            </View>
          </View>
        </View>

        <View style={styles.card}>
          <View style={styles.header}>
            <Text style={styles.headtext1}>Step 2 (Introduction) </Text>
          </View>
          <View style={styles.title1}>
            <View style={styles.title2}>
              {/* <Image 
                        source={logo}
                        style={styles.img1}/> */}
            </View>
            <View style={styles.title9}>
              <Text style={styles.bodytext}>
                These Terms will be applied fully and affect to your use of this
                Website. By using this Website, you agreed to accept all terms
                and conditions written in here. You must not use this Website if
                you disagree with any of these Website Standard Terms and
                Conditions.
              </Text>
              {/* <Text style={styles.bodytext}>
                        chewing sound when the speaker
                        </Text>
                        <Text style={styles.bodytext}>
                        not in mute.
                        </Text> */}
            </View>
          </View>
        </View>

        <View style={styles.card}>
          <View style={styles.header}>
            <Text style={styles.headtext1}>Step 3 (Introduction)</Text>
          </View>
          <View style={styles.title1}>
            <View style={styles.title2}>
              {/* <Image 
                        source={logo1}
                        style={styles.img1}/> */}
            </View>
            <View style={styles.title9}>
              <Text style={styles.bodytext}>
                Minors or people below 18 years old are not allowed to use this
                Website.
              </Text>
              {/* <Text style={styles.bodytext}>
                         virtual meeting.
                        </Text> */}
            </View>
          </View>
        </View>

        <View style={styles.card}>
          <View style={styles.header}>
            <Text style={styles.headtext1}>
              Step 4 (Intellectual Property Rights){" "}
            </Text>
          </View>
          <View style={styles.title1}>
            <View style={styles.title2}>
              {/* <Image 
                        source={logo2}
                        style={styles.img1}/> */}
            </View>
            <View style={styles.title9}>
              <Text style={styles.bodytext}>
                Other than the content you own, under these Terms, Company Name
                and/or its licensors own all the intellectual property rights
                and materials contained in this Website.
              </Text>
              <Text style={styles.bodytext}>
                You are granted limited license only for purposes of viewing the
                material contained on this Website.
              </Text>
              {/* <Text style={styles.bodytext}>
                        When you want to speak, 
                        </Text>
                        <Text style={styles.bodytext}>
                        Please click on raise hand sign.
                        </Text> */}
            </View>
          </View>
        </View>

        <View style={styles.card}>
          <View style={styles.header}>
            <Text style={styles.headtext1}>Step 5 (Restrictions) </Text>
          </View>
          <View style={styles.title1}>
            <View style={styles.title2}>
              {/* <Image 
                        source={logo3}
                        style={styles.img1}/> */}
            </View>
            <View style={styles.title9}>
              <Text style={styles.bodytext}>
                You are specifically restricted from all of the following:
              </Text>
              <Text style={styles.bodytext}>
                publishing any Website material in any other media; selling,
                sublicensing and/or otherwise commercializing any Website
                material; publicly performing and/or showing any Website
                material; using this Website in any way that is or may be
                damaging to this Website; using this Website in any way that
                impacts user access to this Website; using this Website contrary
                to applicable laws and regulations, or in any way may cause harm
                to the Website, or to any person or business entity; engaging in
                any data mining, data harvesting, data extracting or any other
                similar activity in relation to this Website; using this Website
                to engage in any advertising or marketing. Certain areas of this
                Website are restricted from being access by you and Company Name
                may further restrict access by you to any areas of this Website,
                at any time, in absolute discretion. Any user ID and password
                you may have for this Website are confidential and you must
                maintain confidentiality as well.
              </Text>
              {/* <Text style={styles.bodytext}>
                        control external noise as much 
                        </Text>
                        <Text style={styles.bodytext}>
                        as possible.
                        </Text> */}
            </View>
          </View>
        </View>

        <View style={styles.card}>
          <View style={styles.header}>
            <Text style={styles.headtext1}>Step 6 (Assignment) </Text>
          </View>
          <View style={styles.title1}>
            <View style={styles.title2}>
              {/* <Image 
                        source={logo6}
                        style={styles.img1}/> */}
            </View>
            <View style={styles.title9}>
              <Text style={styles.bodytext}>
                The Company Name is allowed to assign, transfer, and subcontract
                its rights and/or obligations under these Terms without any
                notification. However, you are not allowed to assign, transfer,
                or subcontract any of your rights and/or obligations under these
                Terms.
              </Text>
              {/* <Text style={styles.bodytext}>
                         a request from the organizer of 
                        </Text>
                        <Text style={styles.bodytext}>
                         the meeting to switch on your video.
                        </Text> */}
            </View>
          </View>
        </View>

        <View style={styles.card}>
          <View style={styles.header}>
            <Text style={styles.headtext1}>Step 7 (Entire Agreement) </Text>
          </View>
          <View style={styles.title1}>
            <View style={styles.title2}>
              {/* <Image 
                        source={logo7}
                        style={styles.img1}/> */}
            </View>
            <View style={styles.title9}>
              <Text style={styles.bodytext}>
                These Terms constitute the entire agreement between Company Name
                and you in relation to your use of this Website, and supersede
                all prior agreements and understandings.
              </Text>
              {/* <Text style={styles.bodytext}>
                        while the meeting is in process.
                        </Text> */}
            </View>
          </View>
        </View>

        <View style={styles.card}>
          <View style={styles.header}>
            <Text style={styles.headtext1}>
              Step 8 (Governing Law & Jurisdiction){" "}
            </Text>
          </View>
          <View style={styles.title1}>
            <View style={styles.title2}>
              {/* <Image 
                        source={logo8}
                        style={styles.img1}/> */}
            </View>
            <View style={styles.title9}>
              <Text style={styles.bodytext}>
                These Terms will be governed by and interpreted in accordance
                with the laws of the State of Country, and you submit to the
                non-exclusive jurisdiction of the state and federal courts
                located in Country for the resolution of any disputes.
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
      {/* <View style={styles.footer}>
              <Text style={styles.bottomtext}>Privacy Policy | Terms of use</Text>
             </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 5,
    width: "100%",
    justifyContent: "center",
    alignContent: "center",
  },
  back: {
    width: 35,
    height: 35,
    marginLeft: 20,
    color: "#077464",
  },
  head: {
    backgroundColor: "#fff",
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
  },
  headtext: {
    fontSize: 30,
    fontWeight: "bold",
    paddingHorizontal: 40,
    color: "#077464",
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

  bodytext: {
    color: "#4E557C",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 2,
    marginLeft: 2,
    width: "95%",
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
    width: "95%",
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
    marginLeft: 1,
    flexDirection: "column",
    marginRight: 10,
    width: 360,
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
