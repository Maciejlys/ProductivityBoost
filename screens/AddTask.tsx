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
  green: "green",
  blue: "blue",
  purple: "purlpe",
  pink: "pink",
};

export const AddTask: React.FC<AddTaskProps> = ({ navigation }: any) => {
  const { addProject } = useContext(AppContext);
  const [text, onChangeText] = useState("");
  const [chosenColour, setchosenColour] = useState(allColours.green);

  const buttonClickListener = () => {
    if (text === "") return;
    Keyboard.dismiss();
    setTimeout(() => {
      onChangeText("");
      addProject(text, chosenColour);
      navigation.goBack();
    }, 100);
  };

  const handleCanceled = () => {
    Keyboard.dismiss();
    setTimeout(() => {
      navigation.goBack();
    }, 100);
  };

  const handleColourChange = (colour: string) => {
    setchosenColour(colour);
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <Input
          onChangeText={onChangeText}
          value={text}
          maxLength={30}
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
          <AddButton
            style={{ backgroundColor: chosenColour }}
            onPress={() => buttonClickListener()}>
            <ButtonAddText>Add this project</ButtonAddText>
          </AddButton>
        </View>
        <View>
          <CancelButton>
            <Pressable onPress={() => handleCanceled()}>
              <ButtonCancelText>Cancel </ButtonCancelText>
            </Pressable>
          </CancelButton>
        </View>
      </View>
    </View>
  );
};

const ColoursContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const AddButton = styled.Pressable`
  align-items: center;
  justify-content: center;
  padding: 5px 10px;
  flex-direction: row;
  border-radius: 50px;
  elevation: 3;
  box-shadow: 0 1px 1px #333;
  margin: 6px 6px;
`;

const CancelButton = styled.Pressable`
  align-items: center;
  justify-content: center;
  padding: 5px 10px;
  flex-direction: row;
  border-radius: 50px;
  background-color: transparent;
  margin: 6px 6px;
`;

const ButtonAddText = styled.Text`
  color: white;
  font-size: 25px;
  padding: 10px;
`;

const ButtonCancelText = styled.Text`
  color: green;
  font-size: 20px;
  padding: 10px;
`;

const Input = styled.TextInput`
  padding: 10px 10px;
  flex-direction: row;
  border-radius: 6px;
  elevation: 3;
  background-color: #fff;
  box-shadow: 0 1px 1px #333;
  margin: 40px 6px;
  font-size: 20px;
`;
