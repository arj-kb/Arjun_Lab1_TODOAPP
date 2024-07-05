import React, { useEffect, useState } from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { collection, getDocs } from 'firebase/firestore';
import { db } from './src/components/firebaseconfig';
import Header from './src/components/Header';
import AddTask, { Task } from './src/components/AddItem';
import TaskItem from './src/components/Item';

const App = () => {
  const [taskList, setTaskList] = useState<Task[]>([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const querySnapshot = await getDocs(collection(db, 'tasks'));
      const tasks: Task[] = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      })) as Task[];
      setTaskList(tasks);
    };

    fetchTasks();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Header title='To-Do List' />
      <AddTask taskList={taskList} setTaskList={setTaskList} />
      <FlatList
        data={taskList}
        renderItem={({ item }) => (
          <TaskItem task={item} taskList={taskList} setTaskList={setTaskList} />
        )}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    alignItems: 'center',
  },
});

export default App;
