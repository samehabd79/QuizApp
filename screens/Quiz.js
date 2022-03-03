import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import QuestionItem from './QuestionItem';

const Quiz =  (props)=> {

  let tempQuestionsArr = [];

  const [questions, setQuestions] = useState([]);
  const [nextQuestion, setNextQuestion] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [timer, setTimer] = useState(30);
  const [isRunning, setIsRunning] = useState(true);
  const [intervalId, setIntervalId] = useState();
  const [score, setScore] = useState(0);


  useEffect(async () => {
    const url = 'https://opentdb.com/api.php?amount=20&category=18';
    const response = await fetch(url, { method: 'get' });
    const response_data = await response.json();
   
    let questionId = 0;
   
    response_data.results.forEach(question => {
      let answers = [];

      //CORRECT
      const correct_answer = { title: question.correct_answer, isCorrect: true };
      answers.push(correct_answer);
      //INCORRECT
      question.incorrect_answers.forEach(item => {
        const incorrect_answer = { title: item, isCorrect: false };
        answers.push(incorrect_answer);
      })

      const formatted_question = {
        id: questionId++,
        title: question.question,
        type: question.type,
        category: question.category,
        difficulty: question.difficulty,
        answers: shuffle(answers)
      }
      tempQuestionsArr.push(formatted_question);
    })
    // console.log(JSON.stringify(tempQuestionsArr));
    setQuestions(tempQuestionsArr);
      if(isRunning){
        const id=setInterval(() => {
          if(!props.navigation.isFocused()){
            return clearInterval(id)
          }
          else{
            
            setTimer(timer=>timer-1)
          }
            
    }, 1000); 
    setIntervalId(id)
    }else{
        clearInterval(intervalId)
    }

  }, [isRunning])

  const shuffle = (arr) => {
    let currentIndex = arr.length, randomIndex;
    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [arr[currentIndex], arr[randomIndex]] = [arr[randomIndex],arr[currentIndex]];
    }
    return arr;
  }

  const ifTimeOut=()=>{
    if(currentQuestion<21){
    if(timer==0){
        setIsRunning(false);
        setTimer(30)
        setIsRunning(true);
        //next question
        if(currentQuestion<questions.length){
          let number=currentQuestion;
          number++;
          setCurrentQuestion(number);
          let nextQuest = questions[currentQuestion].id;
          setNextQuestion(nextQuest);
        }
        else {
          return <QuestionItem 
         // score={score}
        />
        }
     }
    }
}


  // next question
  const onNextQuestion = () => {
    let number = currentQuestion;
    number++;
    setCurrentQuestion(number);
    let nextQuest = questions[currentQuestion].id;
    setNextQuestion(nextQuest);
  }


  const onAnswer = (answer) => {
    if(answer.isCorrect){
      setScore(score=>score+1)
    }
    setIsRunning(false);
    setTimer(30)
    setIsRunning(true);
    //next question
    let number=currentQuestion;
    number++;
    setCurrentQuestion(number);
    let nextQuest = questions[currentQuestion].id;
    setNextQuestion(nextQuest);
  }

  const questionsUI = questions.map((question, index) => {
    if (nextQuestion == question.id) {
      return <QuestionItem 
        key={index} 
        questionItem={question}
        onNextQuestion={onNextQuestion}
        onAnswer={onAnswer}
        timer={timer}
        ifTimeOut={ifTimeOut}
        score={score}
        currentQuestion={currentQuestion}
      />
    }
  })


  return (
    <View>
      {
        questions.length > 0 ? (questionsUI) : (<Text style={{textAlign: 'center',fontWeight:'bold',fontSize:25,margin:'20%'}} >Loading...</Text>)
      }
    </View>
  );

  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    //alignItems: 'center',
    //justifyContent: 'center',
    padding:50
  },
  loaddata:{
    justifyContent: 'center',
    alignItems: 'center',
    fontSize:25,
    fontWeight: 'bold',
  }
});

export default Quiz