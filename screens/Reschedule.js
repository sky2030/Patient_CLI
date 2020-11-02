/**
 * Reschedule Appointments
 * @ Mi-Xlab Anoop
 */
import React, { useState, useEffect } from "react";
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Image,
    Alert,
    ScrollView,
    FlatList,
    Dimensions,
} from "react-native";
import moment from "moment-timezone";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import AsyncStorage from "@react-native-community/async-storage";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
const screenWidth = Math.round(Dimensions.get("window").width);

const AVALABLE_COLOR = "#3CB371";
const BOOKED_COLOR = "#2F4F4F";
const CANCELED_COLOR = "#FA6072";
const TRANSIENT_COLOR = "#F72";
const COMPLETED_COLOR = "#0099ff";
const IS_AVAILABLE = "available";
const IS_BOOKED = "booked";
const IS_CANCELED = "cancelled";
const IS_TRANSIENT = "transient";
const IS_COMPLETED = "completed"
const NOT_AVAILABLE = "NOT AVAILABLE"
let startDate = 0;
let endDate = 0;
const Reschedule = ({ navigation, route }) => {
    // let { deptcode } = route.params.item
    const [slotDate, setslotDate] = useState(moment().format("ll"));

    const [isDatePickerAvailable, setDatePickerAvailable] = useState(false);
    const [slotsData, setSlotsData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [appointmentItem, setappointmentItem] = useState({ doctor: {}, hospital: {}, department: {} })

    const fetchData = async () => {
        const userToken = await AsyncStorage.getItem("userToken");
        console.log(userToken);
        let URL = `${BASE_URL}doctorslots?code=${route.params.item.hospital.code}&did=${route.params.item.doctor.id}&day_from=${startDate}&day_to=${endDate}`;
        console.log(URL);
        fetch(URL, {
            method: "GET",
            headers: { Authorization: userToken },
        })
            .then((res) => res.json())
            .then((results) => {
                setLoading(false)
                // console.log(JSON.stringify(results));
                if (results.code == 200) {
                    setSlotsData(results.data);
                } else {
                    Alert.alert(Alert_Title, results.message);
                }

                // setLoading(false)
            })
            .catch((err) => {
                setLoading(false)
                Alert.alert(Alert_Title, SOMETHING_WENT_WRONG);
            });
    };

    const updateStartEndDate = async (sdate) => {
        startDate = moment(sdate).startOf("day").format("x");
        endDate = moment(sdate).endOf("day").format("x");
        var iscurrentDate = moment().isSame(sdate, "day");
        if (iscurrentDate) {
            startDate = moment().format("x");
        }
        setslotDate(moment(sdate).format("ll"));
    };
    useEffect(() => {
        const unsubscribe = navigation.addListener("focus", async () => {

            setLoading(true)
            setappointmentItem(route.params.item)
            updateStartEndDate(new Date());
            fetchData();
        });
        return unsubscribe;
    }, [route.params]);

    const bookSlot = async (item) => {

        const userToken = await AsyncStorage.getItem("userToken");

        let URL = `${BASE_URL}appointment/reschedule`;
        let payLoad = {
            from_appointment_id: appointmentItem.id,
            to_appointment_id: item.id
        }

        console.log("", URL, payLoad)
        fetch(URL, {
            method: "PUT",
            headers: {
                Authorization: userToken,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payLoad),
        })
            .then((res) => res.json())
            .then((results) => {
                console.log(results);
                if (results.code != 200) {
                    Alert.alert(Alert_Title, results.message);
                } else {
                    navigation.goBack()
                }
            })
            .catch((err) => {
                Alert.alert(Alert_Title, SOMETHING_WENT_WRONG);
            });

    };

    const slotPressed = (item, index) => {
        if (item.status == IS_AVAILABLE || item.status == IS_TRANSIENT) {
            Alert.alert(
                "Reschedule your appointment",
                `Would you like to book ${StringFromTime(item.time_millis)} slot ?`,
                [
                    {
                        text: "Cancel",
                        style: "cancel",
                    },
                    {
                        text: "OK",
                        onPress: () => {
                            bookSlot(item);
                            // navigation.navigate("Appointment")
                        },
                    },
                ]
            );
        }
    };
    const displayBGSlot = (item) => {
        if (item == IS_BOOKED) {
            return BOOKED_COLOR;
        } else if (item == IS_CANCELED) {
            return CANCELED_COLOR;
        }
        else if (item == IS_TRANSIENT) {
            return TRANSIENT_COLOR;
        }
        else if (item == IS_COMPLETED) {
            return COMPLETED_COLOR;
        }
        return AVALABLE_COLOR;
    };
    const handleDatePicker = (date) => {
        updateStartEndDate(date);
        setDatePickerAvailable(false);
        setLoading(true)
        fetchData();
    };
    const statusText = (item) => {

        if (item.status == IS_BOOKED) {
            if (item.is_your_slots == false) {
                return NOT_AVAILABLE
            }
        }
        else if (item.status != IS_AVAILABLE && item.is_your_slots == false) {
            return NOT_AVAILABLE
        }

        return item.status.toUpperCase()
    }
    const renderItem = (item, index) => {
        let statusForSlot = statusText(item)
        return (
            <View
                style={{
                    width: (screenWidth - 20) / 3,
                    aspectRatio: 1.3,
                    paddingHorizontal: 5,
                    paddingVertical: 5
                    // justifyContent: "center",
                }}
            >
                <TouchableOpacity
                    disabled={statusForSlot == NOT_AVAILABLE ? true : false}
                    activeOpacity={1}
                    onPress={() => slotPressed(item, index)}
                    style={{
                        paddingHorizontal: 5,
                        backgroundColor: displayBGSlot(item.status),
                        flex: 1,


                        justifyContent: "center",
                    }}
                >
                    <View style={{
                        flex: 0.7, justifyContent: "flex-end",

                    }}>
                        <Text style={{
                            alignSelf: "center", fontSize: 13,
                            color: "#eee"
                        }}>
                            {StringFromTime(item.time_millis)}
                        </Text>
                    </View>
                    <View style={{
                        flex: 1, alignItems: "center",
                        justifyContent: "center"
                    }}>
                        <Text
                            style={{
                                flex: 1,
                                alignSelf: "center",
                                fontSize: 14,
                                color: "#eee",
                                marginTop: 6,
                                textAlign: "center"
                            }}
                        >
                            {statusForSlot}
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    };
    const StringFromTime = (timevalue) => {
        if (timevalue <= 0) {
            return "";
        }
        const time = Number(timevalue) / 60000;
        let sdate = new Date();
        sdate.setHours(Math.floor(time / 60));
        sdate.setMinutes(time % 60);
        var returnValue = moment(sdate.getTime(), "x").format("hh:mm A");
        // DeviceInfo.is24Hour() ? "HH:mm" : "hh:mm A"

        return returnValue;
    };
    return (

        <View style={styles.container}>
            <View style={styles.headTop}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={styles.back}
                >
                    <MaterialIcons name="navigate-before" color={"#fff"} size={30} />
                </TouchableOpacity>

                <Text style={styles.headtextTop}>Booking Slot's </Text>
                <MaterialCommunityIcons
                    name="home-plus"
                    size={30}
                    color="white"
                    onPress={() => navigation.navigate("Hospital")}
                    style={{ position: "absolute", right: 10 }}
                />
            </View>


            <View style={styles.card}>

                <View style={styles.Drhead}>
                    <Text style={styles.DrName}>
                        Dr. {appointmentItem.doctor.name}
                    </Text>
                </View>

                <View style={styles.Drinfo}>
                    <View style={{ padding: 10 }}>
                        <Image source={{ uri: appointmentItem.doctor.picture }} style={styles.img} />
                    </View>
                    <View>
                        <Text style={styles.SlotDate}>{appointmentItem.doctor.designation}</Text>
                        <Text style={styles.headtext}>{appointmentItem.doctor.degree}</Text>
                        <Text style={styles.headtext}>
                            Consultation Fees: Rs.{appointmentItem.doctor.fee}{" "}
                        </Text>
                    </View>
                </View>

            </View>

            <View style={styles.MiddleCard}>
                <View style={styles.offline}>
                    <Text style={styles.headtext}>Next Available OPD on :</Text>
                    <Text style={styles.SlotDate}> {slotDate}</Text>
                </View>
                <TouchableOpacity
                    style={{
                        color: "#08211c",
                        fontSize: 15,
                        fontWeight: "500",
                        flexDirection: "row",
                    }}
                    onPress={() => setDatePickerAvailable(true)}
                >
                    <Text style={[styles.headtext, { marginRight: 5 }]}>
                        Choose Another Date{" "}
                    </Text>
                    <AntDesign name="calendar" size={20} color="black" />
                </TouchableOpacity>
                {/* <Text style={styles.headtext}>Consultation Type</Text> */}
                <View style={styles.typestyle}>
                    {/* <TouchableOpacity activeOpacity={0.95}
            onPress={() => Alert.alert('Simple Button pressed')} style={styles.consulttype} >
            <Text style={styles.btntext}>Self</Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.95}
            onPress={() => Alert.alert('Simple Button pressed')} style={styles.consulttype} >
            <Text style={styles.btntext}>For Family</Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.95}
            onPress={() => Alert.alert('Simple Button pressed')} style={styles.consulttype} >
            <Text style={styles.btntext}>Offline</Text>
          </TouchableOpacity> */}
                </View>
            </View>

            <View style={styles.Bookinghead}>
                <Text style={styles.Bookingheadtext}>Booking Slots Status</Text>
            </View>

            <View
                style={{
                    width: screenWidth - 20,
                    flex: 1,
                    alignSelf: "center",
                }}
            >
                <FlatList
                    data={slotsData}
                    renderItem={({ item, index }) => renderItem(item, index)}
                    keyExtractor={(item, index) => item.id}
                    numColumns={3}
                    onRefresh={() => fetchData()}
                    refreshing={loading}
                />
            </View>



            <DateTimePickerModal
                isVisible={isDatePickerAvailable}
                mode="date"
                onConfirm={handleDatePicker}
                onCancel={() => setDatePickerAvailable(false)}
            />

        </View>
    );
};

export default Reschedule;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    back: {
        padding: 10,
        color: "white",
    },

    headTop: {
        backgroundColor: "#21ada2",
        flexDirection: "row",
        height: 50,
        width: "100%",
        alignItems: "center",
    },
    paytext: {
        flex: 1,
        fontSize: 30,
        fontWeight: "500",
        color: "#fff",
        textAlign: "center",
        margin: 10,
    },
    headtextTop: {
        color: "white",
        fontSize: 21,
        fontWeight: "500",
        textAlign: "center",
        width: "80%",
    },
    offline: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },

    selectDoctor: {
        height: 175,
    },
    head: {
        backgroundColor: "#58DCFC",
        padding: 15,
        height: 60,
        width: "100%",
    },
    dateselect: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#e1e",
    },
    calendar: {
        marginLeft: 20,
    },
    typestyle: {
        flexDirection: "row",
        marginTop: 10,
    },
    consulttype: {
        backgroundColor: "#009387",
        alignItems: "center",
        justifyContent: "center",
        width: "30%",
        height: 30,
        padding: 5,
        elevation: 2,
        borderRadius: 4,
        marginLeft: 5,
    },

    btntext: {
        color: "white",
        fontSize: 16,
        fontWeight: "500",
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
    row1: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    headtext: {
        color: "#08211c",
        marginBottom: 5,
        fontSize: 15,
        fontWeight: "500",
    },
    SlotDate: {
        color: "#074a44",
        marginBottom: 5,
        fontSize: 17,
        fontWeight: "500",
    },
    DrName: {
        color: "white",
        fontSize: 18,
        marginVertical: 3,
        fontWeight: "500",
    },
    Drhead: {
        width: "100%",
        backgroundColor: "#009387",
        alignItems: "center",
    },
    Drinfo: {
        flexDirection: "row",
        alignItems: "center",
    },
    headtext2: {
        color: "black",
        marginBottom: 5,
        fontSize: 15,
        fontWeight: "500",
    },

    card: {
        borderRadius: 4,
        elevation: 3,
        backgroundColor: "#e6ffe6",
        shadowOffset: { width: 1, height: 1 },
        shadowColor: "#333",
        shadowOpacity: 0.3,
        shadowRadius: 2,
        marginHorizontal: 10,
        marginVertical: 10,
        // alignItems: 'center',
        // justifyContent: 'center',
    },
    MiddleCard: {
        borderRadius: 4,
        elevation: 3,
        backgroundColor: "#e6ffe6",
        shadowOffset: { width: 1, height: 1 },
        shadowColor: "#333",
        shadowOpacity: 0.3,
        shadowRadius: 2,
        alignItems: "center",
        justifyContent: "center",
        paddingBottom: 10,
        paddingTop: 10,
        marginHorizontal: 10,
    },

    timers: {
        borderRadius: 4,
        elevation: 3,
        backgroundColor: "#e6ffe6",
        shadowOffset: { width: 1, height: 1 },
        shadowColor: "#333",
        shadowOpacity: 0.3,
        shadowRadius: 2,
        marginHorizontal: 20,
        marginVertical: 15,
        alignItems: "center",
        justifyContent: "center",
        padding: 15,
    },

    cardContent: {
        marginHorizontal: 20,
        marginVertical: 10,
    },

    input3: {
        marginBottom: 15,
        marginTop: 15,
    },
    Bookinghead: {
        alignItems: "center",
    },
    Bookingheadtext: {
        marginVertical: 5,
        fontSize: 22,
        color: "#074a44",
        fontWeight: "600",
    },
    img: {
        width: 100,
        aspectRatio: 1,
        borderRadius: 50,
        borderColor: "gray",
        borderWidth: 0.1,
    },
    watches: {
        width: 50,
        height: 50,
    },
});
