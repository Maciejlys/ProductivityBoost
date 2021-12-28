import React, { useContext, useState } from "react";
import { Pressable, Text, View, Keyboard } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { AppContext } from "../context/context";

interface AddTaskProps {}

export const AddTask: React.FC<AddTaskProps> = ({ navigation }: any) => {
  const { addProject } = useContext(AppContext);
  const [text, onChangeText] = useState("");

  const buttonClickListener = () => {
    onChangeText("");
    addProject(text);
    Keyboard.dismiss();
    navigation.goBack();
  };
  return (
    <View>
      <View>
        <TextInput
          onChangeText={onChangeText}
          value={text}
          autoFocus={true}
          clearTextOnFocus={true}
          placeholder="Project name"
        />
        <View>
          <Pressable onPress={() => buttonClickListener()}>
            <Text style={{ fontSize: 40 }}>Add</Text>
          </Pressable>
        </View>
      </View>
      <View>
        <Pressable>
          <Text style={{ fontSize: 40 }}>Cancel </Text>
        </Pressable>
      </View>
    </View>
  );
};
