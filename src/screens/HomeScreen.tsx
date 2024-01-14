import React, { useState } from 'react';
import { Text, View, TextInput, Button, FlatList, StyleSheet, TouchableOpacity, Modal, Keyboard } from 'react-native';
import TodoItem from '../components/TodoItem';
import useTodo from '../hooks/useTodo';

interface Todo {
  id: string;
  title: string;
  done: boolean;
}

const HomeScreen: React.FC = () => {
  const {
    todoList,
    text,
    modalVisible,
    setText,
    handleAddButtonPress,
    addTodo,
    deleteTodo,
    toggleDone,
  } = useTodo();
  /*const defaultTodoList = [
    {
      id: '1',
      title: 'task 1',
      done: false,
    },
    {
      id: '2',
      title: 'task 2',
      done: false,
    },
    {
      id: '3',
      title: 'task 3',
      done: false,
    },
    {
      id: '4',
      title: 'task 4',
      done: true,
    },
    {
      id: '5',
      title: 'task 5',
      done: true,
    },
  ];
  
  const [toDoList, setToDoList] = useState<Todo[]>([...defaultTodoList]);
  const [text, setText] = useState<string>('');
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const handleAddButtonPress = (): void => {
    setModalVisible(true);
  };

  const addToDo = (): void => {
    const newToDo: Todo = {
      id: Date.now().toString(),
      title: text,
      done: false,
    };
    setToDoList([...toDoList, newToDo]);
    setText('');
    setModalVisible(false);
    Keyboard.dismiss();
  };

  const deleteToDo = (id: string): void => {
    setToDoList(toDoList.filter((item) => item.id !== id));
  };

  const toggleDone = (id: string): void => {
    setToDoList(
      toDoList.map((item) =>
        item.id === id ? { ...item, done: !item.done } : item
      )
    );
  };*/

  return (
    <View style={styles.screenContainer}>
      {/* Existing UI */}
      <FlatList
        data={todoList.filter(item => !item.done)}
        renderItem={({ item }) => (
          <TodoItem
            item={item}
            onDelete={deleteTodo}
            onToggleDone={toggleDone}
          />
        )}
        keyExtractor={(item) => item.id}
      />

      <TouchableOpacity
        style={styles.addButton}
        onPress={handleAddButtonPress}>
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          //setModalVisible(!modalVisible);
          setText('');
          handleAddButtonPress();
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TextInput
              autoFocus
              style={styles.modalText}
              placeholder="Enter new task"
              value={text}
              onChangeText={setText}
              onSubmitEditing={addTodo}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    marginTop: 40,
    padding: 20
  },
  addButton: {
    position: 'absolute',
    right: 30,
    bottom: 30,
    backgroundColor: 'blue',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalView: {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    width: '100%',
    borderBottomWidth: 1,
    borderColor: 'gray',
  },
});

export default HomeScreen;
