import {Text, View, Alert} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import React, {useEffect} from 'react';

async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    messaging()
      .getToken()
      .then(token => {
        console.log({token});
      });
  }
}

const App = () => {
  useEffect(() => {
    requestUserPermission();
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    return unsubscribe;
  }, []);
  return (
    <View>
      <Text>App</Text>
    </View>
  );
};

export default App;
