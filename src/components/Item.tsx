import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Switch } from 'react-native';
import { doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { Task } from './AddItem';
import { db } from './firebaseconfig';

interface Props {
  task: Task;
  taskList: Task[];
  setTaskList: React.Dispatch<React.SetStateAction<Task[]>>;
}

const TaskItem: React.FC<Props> = ({ task, taskList, setTaskList }) => {
  const toggleStatus = async () => {
    const taskRef = doc(db, 'tasks', task.id);
    await updateDoc(taskRef, { status: !task.status });
    setTaskList(
      taskList.map(t =>
        t.id === task.id ? { ...t, status: !t.status } : t
      )
    );
  };

  const deleteTask = async () => {
    const taskRef = doc(db, 'tasks', task.id);
    await deleteDoc(taskRef);
    setTaskList(taskList.filter(t => t.id !== task.id));
  };

  return (
    <View style={styles.task}>
      <View style={styles.taskInfo}>
        <Text style={styles.taskTitle}>{task.title}</Text>
        <Text style={[styles.taskStatus, task.status ? styles.taskDone : styles.taskDue]}>
          {task.status ? 'Done' : 'Due'}
        </Text>
      </View>
      <View style={styles.actions}>
        <Switch
          value={task.status}
          onValueChange={toggleStatus}
        />
        <TouchableOpacity onPress={deleteTask} style={styles.deleteButton}>
          <Text style={styles.deleteButtonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  task: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    width: '100%',
  },
  taskInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  taskTitle: {
    fontSize: 18,
    marginRight: 10,
  },
  taskStatus: {
    fontSize: 14,
  },
  taskDue: {
    color: 'red',
  },
  taskDone: {
    color: 'green',
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  deleteButton: {
    marginLeft: 10,
    backgroundColor: '#ff6347',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: '#FFF',
  },
});

export default TaskItem;
