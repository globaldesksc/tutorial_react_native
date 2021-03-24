import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, Alert, TouchableWithoutFeedback, Keyboard } from 'react-native';
import AddTodo from './components/addTodo';
import Header from './components/header';
import Sandbox from './components/sandbox';
import TodoItem from './components/todoItem';

export default function App() {
  const [todos, setTodos] = useState([]);
  const [todoKey, setTodoKey] = useState(-1);

  const pressHandler = (key) => {
    setTodos((prevTodos) => {
      return prevTodos.filter(todo => todo.key != key);
    });
  }

  const submitHandler = (text) => {

    if(text.length > 3) {

      setTodoKey(todoKey + 1);
      
      setTodos((prevTodos) => {
        return [
          { text: text, key: todoKey.toString() },
          ...prevTodos
        ];
      });

    } else {
      Alert.alert('OOPS!', 'Todos must be over 3 characthers long!', [
        {text: 'OK', onPress: () => console.log('alert closed')}
      ])
    }
  }

  return (
    //<Sandbox />
    <TouchableWithoutFeedback onPress={() => {
      Keyboard.dismiss();
      console.log('dismissed keyboard')
    }}>
      <View style={styles.container}>
        <Header />
        <View style={styles.content}>
          <AddTodo submitHandler={submitHandler} />
          <View style={styles.list}>
            <FlatList
              data={todos}
              renderItem={({ item }) => (
                <TodoItem item={item} pressHandler={pressHandler} />
              )}
            />
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    padding: 40,
  },
  list: {
    flex: 1,
    marginTop: 20,
  },
});
