import React from 'react';
import Home from '../screens/home';
import QuestionItem from '../screens/QuestionItem';
import Quiz from '../screens/Quiz';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="Home"
        component={Home}
      />
      <Stack.Screen
        name="QuestionItem"
        component={QuestionItem}
      />
      <Stack.Screen
        name="Quiz"
        component={Quiz}
      />
    </Stack.Navigator>
  );
}

export default MyStack;
