import React from "react";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Dimensions,
  Platform
} from "react-native";
import {
  TextInput,
  ScrollView
} from "./node_modules/react-native-gesture-handler";
import ToDo from "./ToDo";

const { height, width } = Dimensions.get("window");

export default class App extends React.Component {
  state = {
    newToDo: ""
  };

  render() {
    const { newToDo } = this.state;
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <Text style={styles.title}>Simple to do</Text>
        <View style={styles.card}>
          <TextInput
            style={styles.input}
            placeholder={"New To Do"}
            placeholderTextColor={"#999"}
            value={newToDo}
            onChangeText={this._controlNewToDo}

            //ios 키보드에서 엔터키를 done 키로 바꿈
            //returnKeyType={"done"}
            //ios 키보드에서 자동수정을 끔
            //autoCorrect={false}
          />
          <ScrollView
            contentContainerStyle={styles.toDos}
            // contentContainerStyle 은 ScrollView 안에 스타일을 적용하는 방법
            // 그냥 style 로 하니까 안됨
          >
            <ToDo />
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
