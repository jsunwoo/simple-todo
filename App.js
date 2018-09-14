import React from "react";
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  Dimensions,
  Platform,
  AsyncStorage
} from "react-native";
import {
  TextInput,
  ScrollView
} from "./node_modules/react-native-gesture-handler";
import ToDo from "./ToDo";
import { AppLoading } from "expo";
import uuidv1 from "uuid/v1";

const { height, width } = Dimensions.get("window");

export default class App extends React.Component {
  state = {
    newToDo: "",
    loadedToDos: false,
    toDos: {}
  };

  componentDidMount = () => {
    this._loadToDos();
  };

  render() {
    const { newToDo, loadedToDos, toDos } = this.state;
    // 얘는 object console.log(toDos);
    // 얘는 array console.log(Object.values(toDos));

    if (!loadedToDos) {
      return <AppLoading />;
    }
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <Text style={styles.title}>Simple to do</Text>
        <View style={styles.card}>
          <TextInput
            style={styles.input}
            placeholder={"New To Do"}
            value={newToDo}
            onChangeText={this._controlNewToDo}
            placeholderTextColor={"#999"}
            //ios 키보드에서 엔터키를 done 키로 바꿈
            //returnKeyType={"done"}
            //ios 키보드에서 자동수정을 끔
            //autoCorrect={false}
            //제출할때 실행되는 함수
            onSubmitEditing={this._addToDo}
          />
          <ScrollView
            contentContainerStyle={styles.toDos}
            // contentContainerStyle 은 ScrollView 안에 스타일을 적용하는 방법
            // 그냥 style 로 하니까 안됨
          >
            {Object.values(toDos).map(toDo => (
              <ToDo
                key={toDo.id}
                deleteToDo={this._deleteToDo}
                uncompleteToDo={this._uncompleteToDo}
                completeToDo={this._completeToDo}
                updateToDo={this._updateToDo}
                {...toDo}
              />
            ))}
          </ScrollView>
        </View>
      </View>
    );
  }

  _controlNewToDo = text => {
    this.setState({
      newToDo: text
    });
  };

  _loadToDos = async () => {
    try {
      const toDos = await AsyncStorage.getItem("toDos");
      const parsedToDos = JSON.parse(toDos);
      this.setState({
        loadedToDos: true,
        toDos: parsedToDos
      });
    } catch (err) {
      console.log(err);
    }
  };

  _addToDo = () => {
    const { newToDo } = this.state;
    if (newToDo !== "") {
      this.setState(prevState => {
        const ID = uuidv1();
        const newToDoObject = {
          [ID]: {
            id: ID,
            isCompleted: false,
            text: newToDo,
            createdAt: Date.now
          }
        };
        const newState = {
          ...prevState,
          newToDo: "",
          toDos: {
            ...prevState.toDos,
            ...newToDoObject
          }
        };
        this._saveToDos(newState.toDos);
        return { ...newState };
      });
    }
  };

  _deleteToDo = id => {
    this.setState(prevState => {
      const toDos = prevState.toDos;
      delete toDos[id];
      const newState = {
        ...prevState,
        ...toDos
      };
      this._saveToDos(newState.toDos);
      return { ...newState };
    });
  };

  _uncompleteToDo = id => {
    this.setState(prevState => {
      const newState = {
        ...prevState,
        toDos: {
          ...prevState.toDos,
          [id]: {
            ...prevState.toDos[id],
            isCompleted: false
          }
        }
      };
      this._saveToDos(newState.toDos);
      return { ...newState };
    });
  };

  _completeToDo = id => {
    this.setState(prevState => {
      const newState = {
        ...prevState,
        toDos: {
          ...prevState.toDos,
          [id]: {
            ...prevState.toDos[id],
            isCompleted: true
          }
        }
      };
      this._saveToDos(newState.toDos);
      return { ...newState };
    });
  };

  _updateToDo = (id, text) => {
    this.setState(prevState => {
      const newState = {
        ...prevState,
        toDos: {
          ...prevState.toDos,
          [id]: {
            ...prevState.toDos[id],
            text: text
          }
        }
      };
      this._saveToDos(newState.toDos);
      return { ...newState };
    });
  };

  _saveToDos = newToDos => {
    console.log(JSON.stringify(newToDos));
    const saveToDos = AsyncStorage.setItem("toDos", JSON.stringify(newToDos));
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F23657",
    alignItems: "center"
  },
  title: {
    color: "white",
    fontSize: 30,
    marginTop: 50,
    fontWeight: "100",
    marginBottom: 30
  },
  card: {
    backgroundColor: "white",
    flex: 1,
    width: width - 25,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    // 다음과 같이 platform 을 이용하여 ios, android 를 혼용할 수 있음
    ...Platform.select({
      ios: {
        shadowColor: "rgb(50, 50, 50)",
        shadowOpacity: 0.5,
        shadowRadius: 5,
        shadowOffset: {
          height: -1,
          width: 0
        }
      },
      android: {
        elevation: 3
      }
    })
  },
  input: {
    padding: 15,
    borderBottomColor: "#bbb",
    borderBottomWidth: StyleSheet.hairlineWidth,
    fontSize: 20
  },
  toDos: {
    alignItems: "center"
  }
});
