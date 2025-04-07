import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {AppColors} from '../../theme/color';
import moment from 'moment';
import {taskValues} from '../../utils/constant';
import {useNavigation} from '@react-navigation/native';
import {SCREENS} from '../../utils/routes';
import {setCategory} from '../../utils/functions';

const TaskCard = ({item}) => {
  const navigation = useNavigation();
  return (
    <Pressable
      style={styles.container}
      onPress={() => navigation.navigate(SCREENS.TASKDETAIL, {item: item})}>
      <View style={styles.header}>
        <View
          style={{
            backgroundColor: taskValues.find(
              task => task.status === item?.status,
            )?.color,
            padding: 5,
            borderRadius: 15,
            marginRight: 10,
          }}>
          {taskValues.find(task => task.status === item.status)?.icon}
        </View>

        <View>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.description}>{item.description}</Text>
          <Text style={styles.moment}>
            {moment(item.startDate).format('MMMM D, YYYY')} -
            {moment(item.endDate).format('MMMM D, YYYY')}
          </Text>
          <Text>{setCategory(item.category)}</Text>
        </View>
      </View>
    </Pressable>
  );
};

export default TaskCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 10,
    margin: 5,
    borderRadius: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  title: {
    paddingVertical: 5,
    gap: 5,
    fontSize: 16,
    fontWeight: '700',
    color: AppColors.CANCEL,
  },
  moment: {
    fontSize: 14,
    fontWeight: '600',
    color: 'gray',
    marginVertical: 3,
  },
  description: {
    fontSize: 14,
    fontWeight: '600',
    color: AppColors.CANCEL,
  },
});
