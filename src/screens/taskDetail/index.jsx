import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {AppColors} from '../../theme/color';
import {taskValues, status} from '../../utils/constant';
import moment from 'moment';
import {setCategory} from '../../utils/functions';
import {Button} from '@ui-kitten/components';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TaskDetail = ({route}) => {
  const {item} = route?.params;
  console.log(item);

  const deleteTask = async () => {
    try {
      // mevcut görevleri al
      const savedTasks = await AsyncStorage.getItem('tasks');
      if (savedTasks === null) {
        return; //kayıtlı görev yoksa fonksiyonu sonlandırıyor
      }
      const tasks = JSON.parse(savedTasks);
      // silinecek görevi filtrele
      const filteredTasks = tasks.filter(task => task.id !== item.id);
      // filtrelenmiş görevleri depola
      await AsyncStorage.setItem('tasks', JSON.stringify(filteredTasks));
      console.log('görev silindi');
    } catch (error) {
      console.error('Görev silinirken hata oluştu', error);
    }
  };

  const updateTask = async newStatus => {
    try {
      // mevcut görevleri al
      const savedTasks = await AsyncStorage.getItem('tasks');
      if (savedTasks === null) {
        return; //kayıtlı görev yoksa fonksiyonu sonlandırıyor
      }
      const tasks = JSON.parse(savedTasks);
      console.log('TASKS', tasks);
      //güncellenecek görevi bul
      const updatedTasks = tasks.map(task => {
        if (task.id === item.id) {
          return {
            ...task,
            status: newStatus,
          };
        }
        return task;
      });
      // güncellenecek görevi depola
      await AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));
      console.log('görev güncellendi');
    } catch (error) {
      console.error('Görev güncellenirken hata oluştu', error);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.title}> Title: </Text>
          <Text style={styles.title2}> {item.title}</Text>
        </View>
        <View style={styles.header}>
          <Text style={styles.title}> Description: </Text>
          <Text style={styles.title2}> {item.description}</Text>
        </View>
        <View style={styles.header}>
          <Text style={styles.title}> Start Date: </Text>
          <Text style={styles.title2}>
            {' '}
            {moment(item.startDate).format('MMMM D, YYYY')}
          </Text>
        </View>
        <View style={styles.header}>
          <Text style={styles.title}> End Date: </Text>
          <Text style={styles.title2}>
            {' '}
            {moment(item.endDate).format('MMMM D, YYYY')}
          </Text>
        </View>
        <View style={styles.header}>
          <Text style={styles.title}> Category: </Text>
          <Text style={styles.title2}> {setCategory(item.category)}</Text>
        </View>
        <View style={styles.header}>
          <Text style={styles.title}> Status: </Text>
          <Text style={styles.title2}>
            {' '}
            {taskValues.find(task => task.status === item?.status).title}
          </Text>
        </View>
      </ScrollView>
      <View style={styles.button}>
        <Button onPress={() => updateTask(status.PENDING)} status="info">
          START
        </Button>
        <Button onPress={() => updateTask(status.COMPLATED)} status="warning">
          COMPLATED
        </Button>
        <Button onPress={() => updateTask(status.CANCEL)} status="success">
          CANCEL
        </Button>
        <Button onPress={deleteTask} status="danger">
          DELETE
        </Button>
      </View>
    </View>
  );
};

export default TaskDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.WHITE,
    padding: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 14,
    borderBottomWidth: 0.2,
    borderBottomColor: 'light-gray',
    width: '100%',
  },
  title: {
    fontSize: 17,
    fontWeight: '700',
  },
  title2: {
    fontSize: 15,
    fontWeight: '400',
  },
  button: {
    bottom: 25,
    gap: 10,
  },
  underline: {
    textDecorationLine: 'underline',
    textDecorationColor: 'gray',
  },
});
