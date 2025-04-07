import {FlatList, RefreshControl, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import HeaderComponent from '../../components/home/headerComponent';
import FloatActionButton from '../../components/UI/floatActionButton';
import {SCREENS} from '../../utils/routes';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TaskCard from '../../components/home/taskCard';

const {ADDTASKS, TASKDETAIL, TASKS} = SCREENS;

const Home = ({navigation}) => {
  const [tasks, setTasks] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [ongoing, setOngoing] = useState(0);
  const [pending, setPending] = useState(0);
  const [complated, setComplated] = useState(0);
  const [cancel, setCancel] = useState(0);

  const getTask = async () => {
    try {
      const savedTask = await AsyncStorage.getItem('tasks');
      if (savedTask) {
        const parsedTasks = JSON.parse(savedTask);
        setTasks(parsedTasks);

        let complatedCount = 0;
        let ongoingCount = 0;
        let pendingCount = 0;
        let cancelCount = 0;

        for (const task of parsedTasks) {
          console.log('Task:', task);
          if (task.status === 1) {
            ongoingCount++;
          } else if (task.status === 2) {
            pendingCount++;
          } else if (task.status === 3) {
            complatedCount++;
          } else if (task.status === 4) {
            cancelCount++;
          }
        }

        setOngoing(ongoingCount);
        setPending(pendingCount);
        setComplated(complatedCount);
        console.log('cancelCount:', cancelCount);

        setCancel(cancelCount);
      } else {
        setTasks([]);
        setOngoing(0);
        setPending(0);
        setComplated(0);
        setCancel(0);
      }
    } catch (error) {
      console.log('getTask error:', error);
    }
  };

  //const clearAllData = async () => {
  // try {
  //  await AsyncStorage.clear();
  //  } catch (error) {
  //    console.log(error);
  // }
  // };

  const onRefresh = () => {
    setRefreshing(true);
    getTask().finally(() => setRefreshing(false));
  };
  useEffect(() => {
    //clearAllData();
    getTask();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        ListHeaderComponent={
          <HeaderComponent
            ongoing={ongoing}
            pending={pending}
            complated={complated}
            cancel={cancel}
          />
        }
        data={tasks}
        renderItem={({item}) => <TaskCard item={item} />}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />

      <FloatActionButton onPress={() => navigation.navigate(ADDTASKS)} />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
