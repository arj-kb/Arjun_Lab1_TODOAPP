import React, { useState } from 'react';
import { FlatList, SafeAreaView, StyleSheet } from 'react-native';
import Header from './src/components/Header';
import AddTask, { Task } from './src/components/AddItem';
import TaskItem from './src/components/Item';

const App = () => {
  const [taskList, setTaskList] = useState<Task[]>([]);

  return (
    <SafeAreaView style={styles.container}>
      <Header title='ToDo List'/>
      <AddTask 
        taskList={taskList}
        setTaskList={setTaskList}/>
      <FlatList
        data={taskList}
        renderItem={({ item }) => (
          <TaskItem 
            task={item}
            taskList={taskList}
            setTaskList={setTaskList}
          />
        )}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    alignItems: 'center',
    fontWeight: 'bold'
  },
});

export default App;
