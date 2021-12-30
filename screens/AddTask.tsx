import React, { useContext, useState } from "react";
import { Pressable, Text, View, Keyboard } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { AppContext } from "../context/context";
import { FontAwesome } from "@expo/vector-icons";
import styled from "styled-components/native";

interface AddTaskProps {}

const allColours = {
  black: "black",
  red: "red",
  orange: "orange",
  yellow: "yellow",
  green: "green",
  blue: "blue",
  purple: "purlpe",
};

export const AddTask: React.FC<AddTaskProps> = ({ navigation }: any) => {
  const { addProject } = useContext(AppContext);
  const [text, onChangeText] = useState("");
  const [chosenColour, setchosenColour] = useState(allColours.black);

  const buttonClickListener = () => {
    if (text === "") return;
    onChangeText("");
    addProject(text, chosenColour);
    Keyboard.dismiss();
    navigation.goBack();
  };

  const handleColourChange = (colour: string) => {
    setchosenColour(colour);
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <TextInput
          onChangeText={onChangeText}
          value={text}
          autoFocus={true}
          clearTextOnFocus={true}
          placeholder="Project name"
        />
        <ColoursContainer>
          {Object.keys(allColours).map((key, index) => {
            return (
              <Pressable key={index} onPress={() => handleColourChange(key)}>
                <FontAwesome
                  name="circle"
                  size={40}
                  color={key}
                  style={{ margin: 5 }}
                />
              </Pressable>
            );
          })}
        </ColoursContainer>
        <View>
          <Pressable onPress={() => buttonClickListener()}>
            <Text style={{ fontSize: 40 }}>Add</Text>
          </Pressable>
        </View>
      </View>
      <View>
        <Pressable onPress={() => navigation.goBack()}>
          <Text style={{ fontSize: 40 }}>Cancel </Text>
        </Pressable>
      </View>
    </View>
  );
};

const ColoursContainer = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;
