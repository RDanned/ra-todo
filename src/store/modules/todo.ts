import AsyncStorage from '@react-native-async-storage/async-storage';

const PREFIX = 'todo.';

export const setItems = async (todos: TodoItem[]): Promise<void> => {
  try {
    const jsonValue = JSON.stringify(todos);
    await AsyncStorage.setItem(PREFIX + 'items', jsonValue);
  } catch (e) {
    console.log(e);
  }
};

export const getItems = async (): Promise<TodoItem[]> => {
  try {
    const jsonValue = await AsyncStorage.getItem(PREFIX + 'items');
    return jsonValue != null ? Array.from(JSON.parse(jsonValue)) : [];
  } catch (e) {
    console.log('getItems error');
    console.log(e);
    return [];
  }
};
