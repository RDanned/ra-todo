import React, {createContext, useCallback, useContext, useEffect, useState} from 'react';
import {TodoStore} from '@/store';


interface TodoContextType {
  todoList: TodoItem[];
  text: string;
  modalVisible: boolean;
  editingTodo: TodoItem | null;
  setTodoList: (todos: TodoItem[]) => void;
  setText: (text: string) => void;
  setModalVisible: (isVisible: boolean) => void;
  addTodo: (todoItem: TodoItem) => void;
  deleteTodo: (id: string) => void;
  editTodo: (todoItem: TodoItem) => void;
  toggleDone: (id: string) => void;
  handleModalOpen: (todoItem?: TodoItem) => void;
  handleModalClose: () => void;
  submitTodo: (todoItem: TodoItem) => void;
}

const TodoContext = createContext<TodoContextType | undefined>(undefined);

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

export const TodoProvider: React.FC<{ children: React.ReactElement }> = ({ children }) => {
  const [todoList, setTodoList] = useState<TodoItem[]>([]);
  const [text, setText] = useState<string>('');
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [editingTodo, setEditingTodo] = useState<TodoItem | null>(null);

  useEffect(() => {
    const loadTodoList = async () => {
      try {
        const storedTodoList = await TodoStore.getItems();
        if (storedTodoList.length) {
          setTodoList(storedTodoList);
        } else {
          setTodoList(defaultTodoList);
        }
      } catch (error) {
        console.error('Failed to load todo list:', error);
        setTodoList(defaultTodoList);
      }
    };

    loadTodoList();
  }, []);

  useEffect(() => {
    TodoStore.setItems(todoList);
  }, [todoList]);

  const handleModalOpen = (todoItem?: TodoItem): void => {
    setEditingTodo(todoItem || null);
    setText(todoItem ? todoItem.title : '');
    setModalVisible(true);
  };

  const handleModalClose = (): void => {
    setEditingTodo(null);
    setText('');
    setModalVisible(false);
  };

  const addTodo = (todoItem: TodoItem): void => {
    const newTodo: TodoItem = {
      ...todoItem
    };
    setTodoList([...todoList, newTodo]);
    setEditingTodo(null);
    handleModalClose();
  };

  const editTodo = (todoItem: TodoItem): void => {
    if(editingTodo) {
      setTodoList(
        todoList.map((todo) =>
          todo.id === editingTodo.id ? { ...todo, ...todoItem } : todo
        )
      );
      handleModalClose();
    }
  };

  const deleteTodo = useCallback((id: string): void => {
    setTodoList(todoList.filter((item) => item.id !== id));
  }, [todoList]);

  const submitTodo = (todoItem: TodoItem): void => {
    if (editingTodo) {
      editTodo(todoItem);
    } else {
      addTodo(todoItem);
    }
  };

  const toggleDone = useCallback((id: string): void => {
    setTodoList(
      todoList.map((item) =>
        item.id === id ? { ...item, done: !item.done } : item
      )
    );
  }, [todoList]);

  return (
    <TodoContext.Provider value={{
      todoList,
      setTodoList,
      addTodo,
      deleteTodo,
      editTodo,
      toggleDone,
      text,
      setText,
      modalVisible,
      editingTodo,

      handleModalOpen,
      handleModalClose,
      setModalVisible,
      submitTodo,
    }}>
      {children}
    </TodoContext.Provider>
  );
};

export const useTodoContext = (): TodoContextType => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error('useTodoContext must be used within a TodoProvider');
  }

  return context;
};

export default TodoContext;
