import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../screens/home';
import AddTask from '../screens/addTask';
import TaskDetail from '../screens/taskDetail';
import {SCREENS} from '../utils/routes';

const {TASKS, ADDTASKS, TASKDETAIL} = SCREENS;

const Stack = createNativeStackNavigator();
const RootNavigation = () => {
  return (
    <Stack.Navigator initialRouteName={TASKS}>
      <Stack.Screen name={TASKS} component={Home} />
      <Stack.Screen name={ADDTASKS} component={AddTask} />
      <Stack.Screen name={TASKDETAIL} component={TaskDetail} />
    </Stack.Navigator>
  );
};

export default RootNavigation;
