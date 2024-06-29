import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export interface Task {
  id: string;
  title: string;
  status: boolean; 
}

interface Props {
  setTaskList: React.Dispatch<React.SetStateAction<Task[]>>;
  taskList: Task[];
}

const AddTask: React.FC<Props> = ({ taskList, setTaskList }) => {
  const [title, setTitle] = useState('');

  const addTask = () => {
    if (title.trim() === '') return;
    const newTask: Task = {
      id: Math.random().toString(),
      title,
      status: false,
    };
    setTaskList([...taskList, newTask]);
    setTitle('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Add Task</Text>
      <View style={styles.inputContainer}>
        <TextInput 
          style={styles.textInput}
          placeholder='Enter Task Title'
          value={title}
          onChangeText={setTitle} 
        />
        <TouchableOpacity 
          style={styles.addButton} 
          onPress={addTask}
          disabled={title.trim() === ''}
        >
          <Text style={styles.buttonText}>Add Task</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  inputContainer: {
    alignItems: 'center',
  },
  textInput: {
    width: 300,
    padding: 10,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: '#2991DB',
    borderRadius: 5,
    padding: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
  },
});

export default AddTask;
