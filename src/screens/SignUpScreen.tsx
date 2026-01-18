import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from '../contexts/AuthContext';
import api from '../services/api';
import CustomPopup from '../components/CustomPopup';

const SignUpScreen = () => {
    const navigation = useNavigation<any>();
    const { login } = useAuth();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [popupVisible, setPopupVisible] = useState(false);
    const [popupTitle, setPopupTitle] = useState('');
    const [popupMessage, setPopupMessage] = useState('');
    const [popupType, setPopupType] = useState<'error' | 'success' | 'info'>('info');

    const handleSignUp = async () => {
        if (!name || !email || !password || !confirmPassword) {
            setPopupTitle('Error');
            setPopupMessage('Data Invalid');
            setPopupType('error');
            setPopupVisible(true);
            return;
        }

        if (password !== confirmPassword) {
            setPopupTitle('Error');
            setPopupMessage('Password tidak cocok');
            setPopupType('error');
            setPopupVisible(true);
            return;
        }

        setLoading(true);
        try {
            const response = await api.register({
                name,
                email,
                password
            });
            login(response.user);
            navigation.navigate('MainTab');
        } catch (error) {
            setPopupTitle('Sign Up Gagal');
            setPopupMessage(error instanceof Error ? error.message : 'Terjadi kesalahan');
            setPopupType('error');
            setPopupVisible(true);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
        <SafeAreaView style={styles.container}>
             <View style = {styles.header}>
                         <View style = {styles.brand}>
                             <Text style= {styles.brandsmall}>Le</Text>
                             <Text style= {styles.brandbig}>Croissant.</Text>
                         </View>
                     </View>

                <View style = {styles.body}>
                    <Text style = {{color : '#5D4038',fontSize : 40, marginTop : 50, fontFamily : 'Poppins-Regular'}}> Sign Up </Text>
                    <View style = {styles.form}>
                        <TextInput
                            style={styles.formControl}
                            placeholder="Full Name"
                            value={name}
                            onChangeText={setName}
                        />
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
                        <TextInput
                            style={styles.formControl}
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                            secureTextEntry={true}
                        />
                         <Pressable style={styles.button} onPress={handleSignUp} disabled={loading}>
                            <Text style = {styles.label}>{loading ? 'Signing up...' : 'Sign Up'}</Text>
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
container : {
    flex : 1,
    backgroundColor : '#5D4038'
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

  body : {
     height : 650,
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




});


export default SignUpScreen;