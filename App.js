import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, Alert } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import "./Global"
import { NavigationContainer } from '@react-navigation/native';
import { AuthContext } from './components/context';
import RootStackScreen from './screens/RootStackScreen';
import DrawerStackScreen from './screens/DrawerNav'



export default function App({ navigation }) {

  const [isLoading, setIsLoading] = React.useState(true);
  const [userToken, setUserToken] = React.useState(null);

  const initialLoginState = {
    isLoading: true,
    userName: null,
    userToken: null,

  };

  const loginReducer = (prevState, action) => {
    switch (action.type) {
      case 'RETRIEVE_TOKEN':
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGIN':
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGOUT':
        return {
          ...prevState,
          userName: null,
          userToken: null,
          isLoading: false,
        };
      case 'REGISTER':
        return {
          ...prevState,
          userName: action.id,
          isLoading: false,
        };
    }
  };

  const [loginState, dispatch] = React.useReducer(loginReducer, initialLoginState);

  const authContext = React.useMemo(() => ({

    signIn: (username, password) => {
      setIsLoading(true);

      let payload = {
        "mobile": username,
        "password": password,
        fcm_token: FCM_Token

      }
      console.log("Login :", `${BASE_URL}login`)
      console.log("Payload :", JSON.stringify(payload))
      fetch(`${BASE_URL}login`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      })
        .then(res => res.json())
        .then(async (data) => {
          console.log(JSON.stringify(data));
          if (data.code == 200) {
            await AsyncStorage.setItem('userToken', data.data.token)
            const userToken = AsyncStorage.getItem('userToken');
            dispatch({ type: 'LOGIN', id: username, token: userToken });
          }
          else {
            Alert.alert(Alert_Title, data.message);
          }
        })
        .catch(err => {
          Alert.alert(Alert_Title, SOMETHING_WENT_WRONG)
        })

    },
    signOut: async () => {
      setUserToken(null);
      setIsLoading(false);
      try {
        await AsyncStorage.removeItem('userToken');
      } catch (e) {
        console.log(e);
      }
      dispatch({ type: 'LOGOUT' });
    },
    signUp: (username, password, email, confirm_password) => {
      // setIsLoading(false);
      fetch(`${BASE_URL}signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          mobile: username,
          password,
          email,
          confirm_password,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(JSON.stringify(data));

          Alert.alert(Alert_Title, data.message);
          if (data.code == 500) {
            this.pros.navigation.navigate("SignInScreen");
          }

        })
        .catch((e) => {
          Alert.alert(Alert_Title, "something went wrong");
        });
    },

  }), []);

  const CheckToken = () => {

    setTimeout(async () => {
      setIsLoading(false);
      let checkToken;
      checkToken = null;
      try {
        checkToken = await AsyncStorage.getItem('userToken');
      } catch (e) {
        console.log(e);
      }

      dispatch({ type: 'RETRIEVE_TOKEN', token: checkToken });
    }, 1000);
  }

  useEffect(() => {
    CheckToken()
  }, []);

  if (loginState.isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        {loginState.userToken !== null ?

          <DrawerStackScreen />
          :
          <RootStackScreen />
        }
      </NavigationContainer>
    </AuthContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});