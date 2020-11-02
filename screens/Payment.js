
/**
 * Payment
 * @ Mi-Xlab Anoop
 */
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Button,
  TextInput,
  View,
  Image,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Alert,
  Keyboard, ActivityIndicator
} from "react-native";
import Razorpay from "../assets/images/razorpay-logo.png";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import AsyncStorage from "@react-native-community/async-storage";
import RazorpayCheckout from 'react-native-razorpay';

const FETCHING_ORDERID = "Fetching payment information..."
const PAYMENT_SUCCESS_REPORT = "Processing payment..."
export default function PaymentGatway({ navigation, route }) {

  let appointment_id = ""
  const [order, setorder] = useState(Object)
  const [isLoading, setIsLoading] = useState(true)
  const [paymentButtonInfo, setPaymentButtonInfo] = useState(FETCHING_ORDERID)

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", async () => {
      setPaymentButtonInfo(FETCHING_ORDERID)
      setIsLoading(true)
      setorder(Object)
      appointment_id = ""
      if (route.params) {
        appointment_id = route.params.appointment_id

        getOrderID()
      }
    });
    return unsubscribe;
  }, [route.params]);

  const getOrderID = async () => {
    const userToken = await AsyncStorage.getItem("userToken");
    let URL = `${BASE_URL}order`;
    console.log(URL);
    let payLoad = {
      appointment_id: appointment_id
    }
    if (route.params && route.params.family_member_id) {
      payLoad.family_member_id = route.params.family_member_id
    }
    console.log("payLoad :", payLoad)
    fetch(URL, {
      method: "POST",
      headers: {
        Authorization: userToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payLoad),
    })
      .then((res) => res.json())
      .then((results) => {
        console.log(results.code, JSON.stringify(results));

        if (results.code == 200) {
          const stringVal = `Proceed To Pay ${results.data.merchant.amount} ${results.data.merchant.currency}`
          setPaymentButtonInfo(stringVal)
          setIsLoading(false)
          setorder(results.data)



        } else {
          Alert.alert(Alert_Title, results.message);
        }
      })
      .catch((err) => {
        Alert.alert(Alert_Title, SOMETHING_WENT_WRONG);
      });
  }
  const submitData = async () => {

    if (order && order.merchant && order.customer) {

      var options = {
        description: order.merchant.description,
        image: order.merchant.image,
        currency: order.merchant.currency,
        key: RAZORPAY_KEY,
        amount: order.merchant.amount,
        name: order.merchant.name,
        order_id: order.razorpay_order_id,
        prefill: {
          email: order.customer.email,
          contact: order.customer.mobile,
          name: order.customer.name
        },
        theme: { color: PRIMARY_COLOR }
      }
      console.log("Razor Pay :", options)
      RazorpayCheckout.open(options)
        .then((data) => {
          console.log("Payment data :", data)
          setPaymentButtonInfo(PAYMENT_SUCCESS_REPORT)
          setIsLoading(true)
          // handle success
          // Alert.alert(Alert_Title, `Success: ${data.razorpay_payment_id}`);
          submitPaymentSucess(data)
        })
        .catch((failure) => {
          // handle failure
          console.log(failure)
          if (failure && failure.error) {
            Alert.alert(Alert_Title, failure.error.description);
          }

        });
    }
  };
  const submitPaymentSucess = async (data) => {
    const userToken = await AsyncStorage.getItem("userToken");
    let URL = `${BASE_URL}order/paid`;
    console.log(URL);
    fetch(URL, {
      method: "POST",
      headers: {
        Authorization: userToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((results) => {
        console.log(JSON.stringify(results));

        setPaymentButtonInfo('')
        setIsLoading(false)
        setorder("")
        Alert.alert(Alert_Title, results.message);
        navigation.goBack()
      })
      .catch((err) => {
        setPaymentButtonInfo('')
        setIsLoading(false)
        setorder("")
        Alert.alert(Alert_Title, SOMETHING_WENT_WRONG);
        navigation.goBack()
      });
  }
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

        </View>
        <Image source={Razorpay}
          style={{ alignSelf: "center" }}
        />
        {
          isLoading == true && <View style={{
            justifyContent: 'center', alignItems: 'center', alignSelf: "center",

          }}>
            <ActivityIndicator size="large" />
          </View>
        }
        {
          <TouchableOpacity
            style={styles.Paymentbtn}
            activeOpacity={1}
            onPress={() => submitData()}
          >
            <Text style={styles.paymenttext}>{paymentButtonInfo}</Text>
          </TouchableOpacity>
        }
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: "center",
    backgroundColor: "#fff",
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
  Content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 50,
  },
  back: {
    padding: 10,
    color: "#009387",
  },
  head: {
    backgroundColor: "#fff",
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  Paymentbtn: {
    backgroundColor: "green",
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    position: "absolute",
    bottom: 1,
  },
  paymenttext: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  headtext: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#009387",
  },
});
