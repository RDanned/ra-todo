import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Checkbox from '@/components/ui/Checkbox';

interface TodoItemProps {
  item: TodoItem;
  onDelete: (id: string) => void;
  onToggleDone: (id: string) => void;
  onEdit: (todoItem: TodoItem) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ item, onDelete, onToggleDone, onEdit }) => {
  return (
    <View style={styles.itemContainer}>
      <Checkbox defaultValue={item.done} onChange={(value) => {
        onToggleDone(item.id)
      }} />
      <Text style={[styles.itemText, item.done && styles.done]}>
        {item.title}
      </Text>
      <View style={styles.actions}>
        <TouchableOpacity onPress={() => onDelete(item.id)}>
          <Icon name={'delete'} style={styles.action}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onEdit(item)}>
          <Icon name={'square-edit-outline'} style={styles.action}/>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  itemText: {
    fontSize: 20
  },
  actions: {
    marginLeft: 'auto',
    flexDirection: 'row',
    gap: 16,
  },
  action: {
    fontSize: 24
  },
  done: {
    textDecorationLine: 'line-through',
  },
});

export default TodoItem;
