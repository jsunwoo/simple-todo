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
    isEditing: false,
    isCompleted: false
  };

  render() {
    const { isCompleted, isEditing } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.column}>
          <TouchableOpacity onPress={this._toggleComplete}>
            <View
              style={[
                styles.circle,
                isCompleted ? styles.completedCircle : styles.uncompletedCircle
              ]}
            />
          </TouchableOpacity>
          <Text
            style={[
              styles.text,
              isCompleted ? styles.completedText : styles.uncompletedText
            ]}
          >
            Hello I'm a To Do
          </Text>
        </View>
        {isEditing ? (
          <View style={styles.actions}>
            <TouchableOpacity>
              <View style={styles.actionContainer}>
                <Text style={styles.actionText}>v</Text>
              </View>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.actions}>
            <TouchableOpacity>
              <View style={styles.actionContainer}>
                <Text style={styles.actionText}>e</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View style={styles.actionContainer}>
                <Text style={styles.actionText}>x</Text>
              </View>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  }
  _toggleComplete = () => {
    this.setState(prevState => {
      return {
        isCompleted: !prevState.isCompleted
      };
    });
  };
}
const styles = StyleSheet.create({
  container: {
    width: width - 50,
    borderBottomColor: "#bbb",
    borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  circle: {
    width: 24,
    height: 24,
    // borderRadius 는 크기는 항상 반지름
    borderRadius: 12,
    borderWidth: 4,
    marginRight: 12
  },
  completedCircle: {
    borderColor: "#bbb"
  },
  uncompletedCircle: {
    borderColor: "#F23657"
  },
  text: {
    fontWeight: "200",
    fontSize: 18,
    marginVertical: 15
  },
  completedText: {
    color: "#bbb",
    textDecorationLine: "line-through"
  },
  uncompletedText: {
    color: "#353839"
  },
  column: {
    flexDirection: "row",
    alignItems: "center",
    width: width / 2,
    justifyContent: "space-between"
  },
  actions: {
    flexDirection: "row"
  },
  actionContainer: {
    marginLeft: 15,
    marginRight: 15
  },
  actionText: {
    fontSize: 20
  }
});
