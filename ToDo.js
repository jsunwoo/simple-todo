import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity
} from "react-native";

const { height, width } = Dimensions.get("window");

export default class ToDo extends Component {
  state = {
    isEditing: false
  };
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity>
          <View style={styles.circle} />
        </TouchableOpacity>
        <Text style={styles.text}>Hello I'm a To Do</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: width - 50,
    borderBottomColor: "#bbb",
    borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection: "row",
    alignItems: "center"
  },
  circle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    // borderRadius 는 크기는 항상 반지름
    borderColor: "red",
    borderWidth: 3,
    marginRight: 15
  },
  text: {
    fontWeight: "200",
    fontSize: 18,
    marginVertical: 15
  }
});
