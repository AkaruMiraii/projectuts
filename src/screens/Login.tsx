import React from "react";
import { Image, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Login = () => {
  return (
    <SafeAreaView style = {styles.container}>
        <View style = {styles.header}>
            <View style = {styles.brand}>
                <Text style= {styles.brandsmall}>Le</Text>
                <Text style= {styles.brandbig}>Croissant.</Text>
            </View>
        </View>

        <View style = {styles.body}>
            <Text style = {{fontSize : 40, marginTop : 40}}> Login </Text>
            <View style = {styles.form}>
                <TextInput style={styles.formControl} placeholder="Email"/>
                <TextInput style={styles.formControl} placeholder="Password"/>
                <Text style = {{color : '#5D4038', textAlign : 'right', marginRight : 15}}>Forgot Password</Text>
                <Pressable style={styles.button}>
                    <Text style = {styles.label}>Login</Text>
                </Pressable>

                <View style = {styles.textFooterWrapper}>
                    <View style = {styles.line}></View>
                        <Text style={{color : '#5D4038' }}>Or login with</Text>
                            <View style = {styles.line}></View>
                </View>

                <View style = {styles.sosmed}>
                    <Image 
                    source={require ('../assets/google.png')} 
                    style ={styles.icon} />

                     <Image 
                    source={require ('../assets/apple-logo.png')} 
                    style ={styles.icon} />

                        <Image 
                    source={require ('../assets/facebook.png')} 
                    style ={styles.icon} />

                </View>

                <View style = {styles.textFooterBottom}> 
                    <Text>Dont have account?</Text>
                    <Text>Sign Up</Text>
                </View>

                
            
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
    fontFamily: 'Times New Roman',
    color: '#EFEBE8',
    marginBottom: -20,
  },
  brandbig: {
    fontSize: 50,
    fontFamily: 'Poppins-Bold',
    color: '#EFEBE8',
  },

  body :{
    height : 650,
    alignItems : 'center',
    backgroundColor : '#EFEBE9',
    borderTopLeftRadius : 100,
  },

  form : {
    flex : 1,
    marginTop : 50,
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
    marginTop : 30,
  },

  label : {
    color : 'white',
    fontSize : 20,
  },

textFooterWrapper : {
    flexDirection : 'row',
    alignItems : 'center',
    justifyContent : 'center',
    gap : 10,
    marginTop : 30,
},
line : {
    width : 115,
    height : 1.5,
    backgroundColor : '#5D4038',
},
textFooterBottom :{
    color : '#5D4038',
    flexDirection : 'row',
    justifyContent : 'center',
    gap : 5,
    marginTop : 5,
},

sosmed : {
    flexDirection : 'row',
    justifyContent : 'center',
    gap : 30,
    marginTop : 5,
},

icon : {
    width : 30,
    height : 30,
},

})

export default Login;