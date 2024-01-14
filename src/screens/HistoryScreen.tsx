import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import {useTodoContext} from '@/context/TodoContext';
import TodoItem from '@/components/TodoItem';
import AddEditTodoModal from '@/components/AddEditTodoModal';

const HistoryScreen: React.FC = () => {
  const {
    todoList,
    modalVisible,
    deleteTodo,
    toggleDone,
    editingTodo,
    handleModalOpen,
    handleModalClose,
    submitTodo,
  } = useTodoContext();

  return (
    <View style={styles.screenContainer}>
      <FlatList
        data={todoList.filter(item => item.done)}
        renderItem={({ item }) => (
          <TodoItem
            item={item}
            onDelete={deleteTodo}
            onToggleDone={toggleDone}
            onEdit={() => handleModalOpen(item)}
          />
        )}
        keyExtractor={(item) => item.id}
      />

      <AddEditTodoModal
        visible={modalVisible}
        onClose={handleModalClose}
        onSubmit={submitTodo}
        todoItem={editingTodo}
      />
    </View>
  );
};

const styles= StyleSheet.create({
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
});

export default HistoryScreen;
