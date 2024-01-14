import React, { useState, useEffect, useRef } from 'react';
import { View, TextInput, Modal, StyleSheet } from 'react-native';


interface AddEditTodoModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (todo: TodoItem) => void;
  todoItem?: TodoItem | null;
}

const AddEditTodoModal: React.FC<AddEditTodoModalProps> = (
  { visible, onClose, onSubmit, todoItem }
) => {
  const [title, setTitle] = useState('');
  const inputRef = useRef<TextInput>(null);
  const [isReadyToFocus, setIsReadyToFocus] = useState(false);

  useEffect(() => {
    if (visible) {
      setIsReadyToFocus(true);
    } else {
      setIsReadyToFocus(false);
    }
  }, [visible]);

  useEffect(() => {
    if (isReadyToFocus && inputRef.current) {
      inputRef.current.focus();
      setIsReadyToFocus(false);
    }
  }, [isReadyToFocus]);

  useEffect(() => {
    setTitle(todoItem ? todoItem.title : '');
  }, [todoItem]);

  const handleSubmit = () => {
    if (title) {
      const todo: TodoItem = todoItem ? { ...todoItem, title } : { id: Date.now().toString(), title, done: false };
      onSubmit(todo);
    }
    onClose();
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={() => {
        onClose();
        setTitle('');
      }}>
      <View style={styles.modalContent}>
        <View style={styles.modalView}>
          <TextInput
            autoFocus
            style={styles.modalText}
            placeholder="Enter Todo"
            value={title}
            onChangeText={setTitle}
            onSubmitEditing={() => {
              handleSubmit();
              setTitle('');
            }}
          />
        </View>
      </View>
    </Modal>
  );
};


const styles = StyleSheet.create({
  modalContent: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  modalView: {
    width: '100%',
    backgroundColor: 'white',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
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

export default AddEditTodoModal;
