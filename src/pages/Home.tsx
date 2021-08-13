import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task } from '../components/TaskItem';
import { TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

interface EditToDoProps {
  taskId: number;
  taskNewTitle: string;
}

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const findTaskDuplicatedIndex = tasks.findIndex(task => task.title === newTaskTitle);
    
    if(findTaskDuplicatedIndex >= 0) {
      Alert.alert('Task já cadastrada', 'Você não pode cadastrar uma task com o mesmo nome');
      return;
    }

    setTasks(oldState => [...oldState, {
      id: new Date().getTime(),
      done: false,
      title: newTaskTitle,
    }]);
  }

  function handleToggleTaskDone(id: number) {
    setTasks(oldState => oldState.map(task => {
      if(task.id !== id) {
        return task;
      }

      return {
        ...task,
        done: !task.done,
      }
    }));
  }

  function handleEditTask({
    taskId,
    taskNewTitle,
  }: EditToDoProps) {
    setTasks(oldState => oldState.map(task => {
      if(task.id === taskId) {
        return {
          ...task,
          title: taskNewTitle,
        }
      }
      return task;
    }));
  }

  function handleRemoveTask(id: number) {
    Alert.alert('Remover item', 'Tem certeza que você deseja remover esse item?', 
      [
        {
          text: 'Não',
        },
        {
          text: 'Sim',
          onPress: () => {
            setTasks(oldState => oldState.filter(task => task.id !== id));
          }
        }
      ]
    )
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask} 
        editTask={handleEditTask} 
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})