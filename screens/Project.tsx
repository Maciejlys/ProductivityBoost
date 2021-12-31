import React, { useContext, useState } from "react";
import { View, Text, Button, Pressable } from "react-native";
import { AppContext } from "../context/context";
import styled from "styled-components/native";
import { Stopwatch } from "../components/Stopwatch";
import { FontAwesome5 } from "@expo/vector-icons";

export const Project = ({ navigation }: any) => {
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isReseted, setIsReseted] = useState(false);

  const handleStart = () => {
    setIsPaused(false);
    setIsActive(true);
  };

  const handlePause = () => {
    setIsActive(false);
    setIsPaused(true);
  };

  const handleReset = () => {
    setIsActive(false);
    setIsPaused(true);
    setIsReseted(true);
  };

  const [currentTimeSpent, setCurrentTimeSpent] = useState(
    navigation.getParam("currentTimeSpent")
  );
  const { addCurrentTime, getCurrentTimeSpent, deleteProject } =
    useContext(AppContext);

  const add = () => {
    addCurrentTime(navigation.getParam("id"), 5);
    setCurrentTimeSpent(getCurrentTimeSpent(navigation.getParam("id")));
  };

  const handleDelete = () => {
    deleteProject(navigation.getParam("id"));
    navigation.goBack();
  };

  return (
    <View style={{ flex: 1 }}>
      <ProjectNameView>
        <ProjectNameTxt>{navigation.getParam("projectName")}</ProjectNameTxt>
      </ProjectNameView>
      <DeleteButton onPress={() => handleDelete()}>
        <FontAwesome5 name="trash" size={24} color="red" />
      </DeleteButton>
      <Card style={{ backgroundColor: navigation.getParam("colour") }}>
        <Stopwatch
          isActive={isActive}
          isPaused={isPaused}
          isReseted={isReseted}
          setIsReseted={setIsReseted}
        />
      </Card>
      <Card></Card>
      <Card>
        {isActive ? (
          <ControlButtons onPress={() => handlePause()}>
            <FontAwesome5 name="pause" size={48} color="black" />
          </ControlButtons>
        ) : (
          <ControlButtons onPress={() => handleStart()}>
            <FontAwesome5 name="caret-right" size={70} color="black" />
          </ControlButtons>
        )}
        <ControlButtons onPress={() => handleReset()}>
          <FontAwesome5 name="stop" size={48} color="black" />
        </ControlButtons>
      </Card>
    </View>
  );
};

const ControlButtons = styled.Pressable`
  padding: 20px;
  margin: 10px;
`;

const DeleteButton = styled.Pressable`
  position: absolute;
  top: 0;
  right: 0;
  padding: 10px;
`;

const ProjectNameTxt = styled.Text`
  font-size: 20px;
  font-weight: bold;
`;
const ProjectNameView = styled.View`
  align-items: center;
  justify-content: center;
  flex: 1;
  flex-direction: row;
`;

const Card = styled.View`
  flex: 4;
  align-items: center;
  justify-content: center;
  padding: 5px 10px;
  flex-direction: row;
  border-radius: 50px;
  margin: 6px 6px;
`;
