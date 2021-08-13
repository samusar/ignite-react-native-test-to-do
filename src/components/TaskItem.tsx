import React, {useEffect, useState, useRef} from 'react';
import {
  View, 
  Text, 
  Image,
  TouchableOpacity, 
  StyleSheet,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import trashIcon from '../assets/icons/trash/trash.png'
import xIcon from '../assets/icons/x/X.png'
import penIcon from '../assets/icons/pen/pen.png'


export interface EditTaskProps {
  taskId: number;
  taskNewTitle: string;
}

export interface Task {
  id: number;
  title: string;
  done: boolean;
}

interface TaskItemProps {
  item: Task;
  index: number;
  toggleTaskDone: (id: number) => void;
  removeTask: (id: number) => void;
  editTask: (data: EditTaskProps) => void;
}

export function TaskItem({
  index, 
  item, 
  removeTask, 
  toggleTaskDone,
  editTask,
}: TaskItemProps) {
  const [isEditMode, setIsEditMode] = useState(false);
  const [editValue, setEditValue] = useState(item.title);
  const textInputRef = useRef<TextInput>(null);

  function handleStartEditing() {
    setIsEditMode(true);
  }

  function handleCancelEditing() {
    setEditValue(item.title);
    setIsEditMode(false);
  }

  function handleSubmitEditing() {
    editTask({
      taskId: item.id,
      taskNewTitle: editValue,
    });
    setIsEditMode(false);
  }

  useEffect(() => {
    if(isEditMode) {
      textInputRef.current?.focus();
    } else {
      textInputRef.current?.blur();
    }
  }, [isEditMode]);

  return (
    <>
    <View>
      <TouchableOpacity
        testID={`button-${index}`}
        activeOpacity={0.7}
        style={styles.taskButton}
        onPress={() => toggleTaskDone(item.id)}
      >
        <View 
          testID={`marker-${index}`}
          style={item.done ? styles.taskMarkerDone : styles.taskMarker}
        >
          { item.done && (
            <Icon 
              name="check"
              size={12}
              color="#FFF"
            />
          )}
        </View>

        <TextInput 
          style={item.done ? styles.taskTextDone : styles.taskText}
          value={editValue}
          onChangeText={setEditValue}
          editable={isEditMode}
          onSubmitEditing={handleSubmitEditing}
          ref={textInputRef}
        />
      </TouchableOpacity>
    </View>
    
    <View style={styles.containerButtons}>
      {isEditMode ? (
        <TouchableOpacity
          style={{ paddingLeft: 12 }}
          onPress={handleCancelEditing}
        >
          <Image source={xIcon} />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={{ paddingLeft: 12 }}
          onPress={handleStartEditing}
        >
          <Image source={penIcon} />
        </TouchableOpacity>
      )}
        <View style={styles.separator} />

        <TouchableOpacity
          testID={`trash-${index}`}
          style={{ paddingRight: 24 }}
          onPress={() => removeTask(item.id)}
        >
          <Image source={trashIcon} />
        </TouchableOpacity>
    </View>
    </>
  );
}


const styles = StyleSheet.create({
  taskButton: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 15,
    marginBottom: 4,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center'
  },
  taskMarker: {
    height: 16,
    width: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#B2B2B2',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  taskText: {
    color: '#666',
    fontFamily: 'Inter-Medium'
  },
  taskMarkerDone: {
    height: 16,
    width: 16,
    borderRadius: 4,
    backgroundColor: '#1DB863',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  taskTextDone: {
    color: '#1DB863',
    textDecorationLine: 'line-through',
    fontFamily: 'Inter-Medium'
  },
  containerButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  separator: {
    width: 1,
    height: 24,
    backgroundColor: 'rgba(196, 196, 196, 0.24)',
    marginHorizontal: 12,
  }
})