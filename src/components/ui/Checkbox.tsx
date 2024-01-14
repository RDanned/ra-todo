import React, { useState } from 'react';
import {View, StyleSheet, Pressable} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface CheckboxProps {
  defaultValue: boolean;
  onChange: (value: boolean) => void;
}

const Checkbox: React.FC<CheckboxProps> = ({ defaultValue, onChange }) => {
  const [localValue, setLocalValue] = useState<boolean>(defaultValue || false);

  return (
    <Pressable onPress={() => {
      const newValue = !localValue;
      setLocalValue(newValue);
      onChange(newValue)
    }}>
      <View style={styles.container}>
        { localValue ? <View style={styles.iconWrapper}><Icon name={'check'} style={styles.icon}/></View> : null }
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    width: 30,
    height: 30,
    borderWidth: 1,
    borderColor: 'green',
    borderRadius: 8,
  },
  iconWrapper: {
    width: '90%',
    height: '90%',
    justifyContent:'center',
    marginLeft:'auto',
    marginRight:'auto',
  },
  icon: {
    fontSize: 25
  }
})

export default Checkbox;