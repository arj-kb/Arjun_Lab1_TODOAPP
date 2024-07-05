import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { collection, addDoc } from 'firebase/firestore';
import { db } from './firebaseconfig';

export interface Task {
  id: string;
  title: string;
  status: boolean;
}

interface Props {
  taskList: Task[];
  setTaskList: React.Dispatch<React.SetStateAction<Task[]>>;
}

const AddTask: React.FC<Props> = ({ taskList, setTaskList }) => {
  const [title, setTitle] = useState('');

  const addTask = async () => {
    if (title.trim() === '') return;
    const newTask: Omit<Task, 'id'> = {
      title,
      status: false,
    };
    try {
      const docRef = await addDoc(collection(db, 'tasks'), newTask);
      setTaskList([...taskList, { id: docRef.id, ...newTask }]);
      setTitle('');
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  };

  return (
    <View>
      <Text style={styles.heading}>Add Task</Text>
      <View>
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
  heading: {
    fontSize: 20,
    color: '#560401',
    textAlign: 'center',
    fontWeight: 'bold',
    margin: 20,
  },
  textInput: {
    padding: 10,
    borderColor: '#1A5276',
    borderWidth: 2,
    borderRadius: 5,
    margin: 10,
    width: 300,
  },
  addButton: {
    backgroundColor: '#1A5276',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
    width: 100,
    textAlign: 'center',
    alignSelf: 'center', // Center the button
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
  },
});

export default AddTask;
