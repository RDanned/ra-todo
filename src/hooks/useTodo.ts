import {useState, useCallback, useEffect} from 'react';
import { Keyboard } from 'react-native';
import { TodoStore } from '../store';

interface todo {
  id: string;
  title: string;
  done: boolean;
}

const useTodo = () => {
  const defaultTodoList = [
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

  const [todoList, setTodoList] = useState<todo[]>(defaultTodoList);
  const [text, setText] = useState<string>('');
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  useEffect(() => {
    TodoStore.setItems(todoList);
  }, [todoList]);

  const handleAddButtonPress = useCallback((): void => {
    setModalVisible(true);
  }, []);

  const addTodo = useCallback((): void => {
    const newToDo: todo = {
      id: Date.now().toString(),
      title: text,
      done: false,
    };
    setTodoList([...todoList, newToDo]);
    setText('');
    setModalVisible(false);
    Keyboard.dismiss();
  }, [text, todoList]);

  const deleteTodo = useCallback((id: string): void => {
    setTodoList(todoList.filter((item) => item.id !== id));
  }, [todoList]);

  const toggleDone = useCallback((id: string): void => {
    setTodoList(
      todoList.map((item) =>
        item.id === id ? { ...item, done: !item.done } : item
      )
    );
  }, [todoList]);

  return {
    todoList,
    handleAddButtonPress,
    addTodo,
    deleteTodo,
    toggleDone,

    text,
    modalVisible,
    setText,
  };
};

export default useTodo;
