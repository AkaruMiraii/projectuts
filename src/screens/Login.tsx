import React from "react";
import { Image, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from '@react-navigation/native';

const Login = () => {
  const navigation = useNavigation<any>();
  return (
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
                <TextInput style={styles.formControl} placeholder="Email"/>
                <TextInput style={styles.formControl} placeholder="Password" secureTextEntry = {true}/>
                <Text style = {{color : '#5D4038', textAlign : 'right', marginRight : 15, fontFamily : 'Poppins-Regular'}}>Forgot Password</Text>
                <Pressable style={styles.button} onPress={() => navigation.navigate('MainTab')}>
                  <Text style = {styles.label}>Login</Text>
                </Pressable>
            </View>
        </View>
    </SafeAreaView>
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