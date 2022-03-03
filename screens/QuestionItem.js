import  React ,{useEffect} from "react";
import { View, TouchableOpacity, Text, StyleSheet,Image } from 'react-native';

const QuestionItem = props => {


    const levelColors = () => {
        switch (props.questionItem.difficulty) {
            case 'hard':
                 return '#B93B23';
            case 'medium':
                return '#E9950E';  
            case 'easy':
                return '#7CB13F';      
            default:
                break;
        }
    }

    props.ifTimeOut()
    let i=props.currentQuestion
    let score = props.score
    if(i<21 ){
    return(
        
        <View>
            <View style={styles.header}>
                <Text style={styles.headerText}>Question:{props.questionItem.id+1}/20</Text>
                <Image style={styles.logo} source={require("../assets/logo.png")} />
            </View>
            <View tyle={styles.container}>
          <View style={styles.cat} >
              <Text style={styles.catTitle}>score: {score}</Text>
          <Text style={styles.catTitle}>Level: <Text style={{color:levelColors()}}>{(props.questionItem.difficulty).toUpperCase()}</Text></Text>
          </View>
            <Text style={styles.questTitle}>{props.questionItem.title}</Text>
            {
                props.questionItem.answers.map((answer,index) => (
                    <TouchableOpacity style={styles.btn} key={index} onPress={() => {
                        props.onNextQuestion(props.questionItem.id);
                        props.onAnswer(answer);
                    }}>
                        <Text style={styles.btn_text}>{answer.title}</Text>
                    </TouchableOpacity>
                ))
            }
            <View style={styles.timerText}>
                <View style={styles.timer2}>
                    <Text>
                        {props.timer}
                    </Text>
                </View>
            </View>
        </View>
        </View>
    )
        }
    else if(score>=10){
        return(
            
           <View>
               <View style={styles.headerWin}>
                 <Image style={styles.logo} source={require("../assets/logo.png")} />
               </View>
               <View style={styles.winContainer}>
                   <Text style={styles.winTitle}>GREAT JOB</Text>
                   <Text style={styles.winPar}>You answered {score} questions correctly</Text>
               </View>
               <View style={styles.bannerContainer}>
                <Image source={require("../assets/success_character.png")} style={styles.banner} resizeMode='contain'/>
               </View>
               {/* <TouchableOpacity onPress={() => navigation.navigate("Home")} style={styles.button} >
                    <Text style={styles.buttonText}>Back to Home</Text>
               </TouchableOpacity> */}
           </View>
        )
    }
    else if(score<=10){
        return(
            <View>

            <View style={styles.headerFaield}>
              <Image style={styles.logo} source={require("../assets/logo.png")} />
            </View>
            <View style={styles.winContainer}>
                <Text style={styles.faieldTitle}>FAILD</Text>
                <Text style={styles.winPar}>You need to answer 10 correct answers</Text>
            </View>
            <View style={styles.bannerContainer}>
             <Image source={require("../assets/failed_character.png")} style={styles.banner} resizeMode='contain'/>
            </View>
                {/* <TouchableOpacity onPress={() => props.navigation.navigate("Home")} style={styles.button} >
                    <Text style={styles.buttonText}>Back to Home</Text>
               </TouchableOpacity> */}
        </View>
        )
    }
}

const styles = StyleSheet.create({
    btn:{
        width:'100%',
        backgroundColor:'#EEEAE9',
        padding:15,
        borderRadius:12,
        marginBottom:12,
        shadowColor: '#000000',
        shadowOpacity:0.1,
        shadowOffset: {width:0, height:3},
        shadowRadius: 2, elevation:5,
    },
    btn_text: {
      fontSize:22,
      textAlign: 'center',
    },
    score:{
      fontSize:15,
      color:'#707070',
      marginBottom:30,
      paddingLeft:10,
      
    },
    questTitle: {
      fontSize:28,
      marginBottom:40,
      color:'#707070',
      margin:10,
      textAlign: 'center',
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        padding:50,
        margin:10
    },
    cat:{
        paddingLeft:10,
        alignItems: 'center',

    },
    header:{
        backgroundColor:'#0395E2',
        height:80,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerWin:{
        backgroundColor:'#7CB13F',
        height:80,
        justifyContent:'flex-end',
        flexDirection: 'row',
        alignItems: 'center',
    },
    banner: {
        height:500,
        width:500,
      },
      bannerContainer:{
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom:200,
      },
    logo: {
        width:50,
        height:50,
        marginRight:10,
    },
    headerText:{
        marginLeft:10,
        fontSize:15,
        color:'#fff',
    },
    timerText:{
        alignSelf:'center',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop:30,
        borderRadius:180,
        width:150,
        height:150,
        backgroundColor:'#0395E2',
    },
    timer2:{
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius:180,
        width:125,
        height:125,
        backgroundColor:'#F2F2F2',
    },
    winContainer:{
        justifyContent: 'center',
        alignItems: 'center' 
    },
    winTitle:{
        fontSize:80,
        fontWeight: 'bold',
        color: '#7CB13F',
    },
    winPar:{
        fontSize:25,
    },
    faieldTitle:{
        fontSize:80,
        fontWeight: 'bold',
        color: '#B93B23',
    },
    faieldPar:{
        fontSize:25,
    },
    headerFaield:{
        backgroundColor:'#B93B23',
        height:80,
        justifyContent: 'flex-end',
        flexDirection: 'row',
        alignItems: 'center',
    },
    button:{
        width:'100%',
        backgroundColor:'#FFFFFF',
        padding:16,
        borderRadius:16,
        alignItems: 'center',
        marginBottom:10,
      },
      buttonText:{
        fontSize:24,
        fontWeight:'bold',
        color:'#707070',
      },
      catTitle:{
        fontSize:20,
        fontWeight:'bold',

      },
});

export default QuestionItem;