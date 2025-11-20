import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import {Image, Pressable, StyleSheet, Text, View } from 'react-native';

const LoginScreen = () => {
    return (
        <SafeAreaView style={styles.container}>
            
        <View style = {styles.header}>
             <View  style = {styles.backgroundImageWrapper}>
                <Image 
                source={require('../assets/bg1.png')}
                style = {styles.backgroundImage}/>
            </View>
            <View style = {styles.brand}>
                <Text style= {styles.brandsmall}>Le</Text>
                <Text style= {styles.brandbig}>Croissant.</Text>
            </View>
        </View>

            <View style = {styles.formstart}>
                <View style = {styles.textWrapper}>
                    <Text style ={{fontSize : 30}}>Welcome</Text>
                    <Text>crafted with love & butter</Text>
                </View>

                <Pressable style={styles.button}>
                    <Text style = {styles.label}>Login</Text>
                </Pressable>

                <Pressable style= {{...styles.button, backgroundColor : '#FFFF', marginTop : 10}}>
                    <Text style = {{...styles.label, color: '#5D4038'}}>Sign Up</Text>
                </Pressable>
                
            </View>

        </SafeAreaView>
        
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },

  header: {
    flex: 1,
    backgroundColor: 'white',
  },

  backgroundImageWrapper: {
    width: '100%',
    height: '100%',
  },

  backgroundImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    top: 90,
  },

  brand: {
    position: 'absolute',
    marginTop: 40,
    marginLeft: 20,
  },

  brandsmall: {
    fontSize: 50,
    fontFamily: 'Times New Roman',
    color: '#8C6E63',
    marginBottom: -20,
  },

  brandbig: {
    fontSize: 50,
    fontFamily: 'Poppins-Bold',
    color: '#8C6E63',
  },
  
  formstart: {
    alignItems: 'center',
    height : 250,
    width: '100%',
    backgroundColor: '#EFEBE9',
    borderTopLeftRadius: 100,
  },
  textWrapper: {  
    alignItems: 'center',
    marginTop: 20,
  },
  button :{
    alignItems : 'center',
    justifyContent : 'center',
    marginTop : 20,
    backgroundColor : '#5D4038',
    width : 350,
    height : 60,
    borderRadius : 50,
    paddingHorizontal : 40,
    paddingVertical : 10,
  },
  label : {
    color : 'white',
    fontSize : 20,
  },
  


});
export default LoginScreen;