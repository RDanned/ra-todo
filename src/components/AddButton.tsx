import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import { useTodoContext } from '@/context/TodoContext';

function AddButton() {
  const { setModalVisible, modalVisible } = useTodoContext();

  const handleAddButtonPress = () => {
    setModalVisible(true);
  }

  if(modalVisible) return null;

  return (
    <TouchableOpacity
      style={styles.addButton}
      onPress={handleAddButtonPress}>
      <Text style={styles.addButtonText}>+</Text>
    </TouchableOpacity>
  )
}

const styles= StyleSheet.create({
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

export default AddButton;