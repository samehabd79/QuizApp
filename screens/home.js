import { StyleSheet, Text, View,TouchableOpacity,Image } from 'react-native';
import React from 'react';
import Title from '../components/title'

const Home = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Title />
      <View style={styles.bannerContainer}>
        <Image source={require("../assets/splash_logo.png")}  style={styles.banner} resizeMode='contain' />
      </View>
      <TouchableOpacity onPress={() => navigation.navigate("Quiz")} style={styles.button} >
        <Text style={styles.buttonText}>Let's Play</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    backgroundColor:'#0395E2',
    paddingTop:40,
    paddingHorizontal:20,
    height:'100%',
  },
  banner: {
    height:500,
    width:500,
  },
  bannerContainer:{
    justifyContent: 'center',
    alignItems: 'center',
    flex:1,
    marginBottom:200,
  },

  button:{
    width:'100%',
    backgroundColor:'#FFFFFF',
    padding:16,
    borderRadius:16,
    alignItems: 'center',
    marginBottom:40,
  },
  buttonText:{
    fontSize:24,
    fontWeight:'bold',
    color:'#707070',
  }
});
