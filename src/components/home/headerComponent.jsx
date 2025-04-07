import {FlatList, Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {ArrowCircleRight2} from 'iconsax-react-native';
import {tasks} from '../../utils/data';
import {AppColors} from '../../theme/color';

const HeaderComponent = ({ongoing, pending, complated, cancel}) => {
  // tasks dizisine ilgili count değerlerini ekle
  const updatedTasks = tasks.map(task => {
    let count = 0;
    if (task.id === 1) count = ongoing;
    if (task.id === 2) count = pending;
    if (task.id === 3) count = complated;
    if (task.id === 4) count = cancel;

    return {...task, count}; // Yeni count değerini ekleyerek güncelle
  });
  const Task = ({item}) => {
    return (
      <Pressable style={[styles.container, {backgroundColor: item.color}]}>
        {item.icon}
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.count}>{item.count} Task</Text>
          </View>
          <View>
            <ArrowCircleRight2
              size="30"
              color={AppColors.ICON}
              variant="Bold"
            />
          </View>
        </View>
      </Pressable>
    );
  };

  return (
    <View>
      <FlatList
        numColumns={2}
        data={updatedTasks}
        renderItem={({item}) => <Task item={item} />}
      />
      <View>
        <Text style={styles.text}>All Tasks</Text>
      </View>
    </View>
  );
};
export default HeaderComponent;

const styles = StyleSheet.create({
  container: {
    width: '45%',
    padding: 10,
    margin: 10,
    borderRadius: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  title: {
    fontSize: 18,
    color: '#EEEDEB',
    fontWeight: '600',
    marginVertical: 5,
  },
  count: {
    fontSize: 14,
    color: '#EEEDEB',
    fontWeight: '500',
    marginVertical: 10,
  },
  text: {
    fontSize: 20,
    fontWeight: '600',
    margin: 10,
    marginHorizontal: 20,
  },
});
