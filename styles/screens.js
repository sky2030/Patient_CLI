import {Navigation} from 'react-native-navigation';

export default function RegisterScreens() {
  Navigation.registerComponent('EnxJoinScreen', () => require('./App').default);
  Navigation.registerComponent('EnxConferenceScreen', () => require('./EnxConferenceScreen').default);
};