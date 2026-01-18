import React, { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../contexts/AuthContext';
import api from '../services/api';
import CustomPopup from '../components/CustomPopup';

const Login = () => {
  const navigation = useNavigation<any>();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [popupVisible, setPopupVisible] = useState(false);
  const [popupTitle, setPopupTitle] = useState('');
  const [popupMessage, setPopupMessage] = useState('');
  const [popupType, setPopupType] = useState<'error' | 'success' | 'info'>('info');

  const handleLogin = async () => {
    if (!email || !password) {
      setPopupTitle('Error');
      setPopupMessage('Email atau password tidak valid');
      setPopupType('error');
      setPopupVisible(true);
      return;
    }

    setLoading(true);
    try {
      const response = await api.login({ email, password });
      login(response.user);
      navigation.navigate('MainTab');
    } catch {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      setPopupTitle('Login Gagal');
      setPopupMessage('Email atau password tidak valid');
      setPopupType('error');
      setPopupVisible(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <SafeAreaView style = {styles.container}>
        <View style = {styles.header}>
            <View style = {styles.brand}>
                <Text style= {styles.brandsmall}>Le</Text>
                <Text style= {styles.brandbig}>Croissant.</Text>
            </View>
        </View>

        <View style = {styles.body}>
            <Text style = {{color : '#5D4038',fontSize : 40, marginTop : 40, fontFamily : 'Poppins-Regular'}}> Login </Text>
            <View style = {styles.form}>
                <TextInput
                  style={styles.formControl}
                  placeholder="Email"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
                <TextInput
                  style={styles.formControl}
                  placeholder="Password"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={true}
                />
                <Text style = {{color : '#5D4038', textAlign : 'right', marginRight : 15, fontFamily : 'Poppins-Regular'}}>Forgot Password</Text>
                <Pressable style={styles.button} onPress={handleLogin} disabled={loading}>
                  <Text style = {styles.label}>{loading ? 'Logging in...' : 'Login'}</Text>
                </Pressable>
            </View>
        </View>
    </SafeAreaView>

    <CustomPopup
      visible={popupVisible}
      title={popupTitle}
      message={popupMessage}
      type={popupType}
      onClose={() => setPopupVisible(false)}
    />
    </>
  );
}

const styles = StyleSheet.create({
    container :{
        flex : 1,
        backgroundColor : '#5D4038',
    },
    header : {
    flex : 1,
    backgroundColor: '#5D4038',
    },
    brand: {
    position: 'absolute',
    marginTop: 40,
    marginLeft: 20,
  },
  brandsmall: {
    fontSize: 50,
    fontFamily: 'dancingScript',
    color: '#EFEBE8',
    marginBottom: -20,
  },
  brandbig: {
    fontSize: 50,
    fontFamily: 'Poppins-Regular',
    color: '#EFEBE8',
  },

  body :{
    height : 500,
    alignItems : 'center',
    backgroundColor : '#EFEBE9',
    borderTopLeftRadius : 100,
  },

  form : {
    flex : 1,
    marginTop : 30,
    gap : 20,
  },
  formControl : {
    borderRadius : 50,
    fontSize : 15,
    paddingLeft : 40,
    backgroundColor : 'white',
    width : 350,
    height : 70,
    color : '#5D4038',
  },
  button : {
    backgroundColor : '#5D4038',
    borderRadius : 50,
    width : 350,
    height : 70,
    justifyContent : 'center',
    alignItems : 'center',
    marginTop : 25,
  },

  label : {
    color : 'white',
    fontSize : 20,
    fontFamily : 'Poppins-Regular'
  },


})

export default Login;