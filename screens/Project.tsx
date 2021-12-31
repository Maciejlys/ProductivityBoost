import React, { useContext, useState, useEffect } from "react";
import { View, Text, Button, Pressable, Alert } from "react-native";
import { AppContext } from "../context/context";
import styled from "styled-components/native";
import { Stopwatch } from "../components/Stopwatch";
import { FontAwesome5 } from "@expo/vector-icons";
import { TotalTimeSpent } from "../components/TotalTimeSpent";

export const Project = ({ navigation }: any) => {
  const { addCurrentTime, getCurrentTimeSpent, deleteProject } =
    useContext(AppContext);

  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isReseted, setIsReseted] = useState(false);
  const [currentColor, setCurrentColor] = useState("black");
  const [currentTimeSpent, setCurrentTimeSpent] = useState(
    navigation.getParam("currentTimeSpent")
  );

  useEffect(() => {
    setCurrentColor(navigation.getParam("colour"));
  }, []);

  useEffect(() => {
    navigation.addListener("beforeRemove", (e: any) => {
      if (!isReseted) {
        // If we don't have unsaved changes, then we don't need to do anything
        return;
      }

      // Prevent default behavior of leaving the screen
      e.preventDefault();

      // Prompt the user before leaving the screen
      Alert.alert(
        "Discard changes?",
        "You have unsaved changes. Are you sure to discard them and leave the screen?",
        [
          { text: "Don't leave", style: "cancel", onPress: () => {} },
          {
            text: "Discard",
            style: "destructive",
            // If the user confirmed, then we dispatch the action we blocked earlier
            // This will continue the action that had triggered the removal of the screen
            onPress: () => navigation.dispatch(e.data.action),
          },
        ]
      );
    });
  }, [navigation]);

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

  const updateTotalTimeSpent = (amount: any) => {
    addCurrentTime(navigation.getParam("id"), amount);
    setCurrentTimeSpent(getCurrentTimeSpent(navigation.getParam("id")));
  };

  const handleDelete = () => {
    setIsPaused(true);
    setIsActive(false);
    Alert.alert(
      "Delete this project",
      "Are you sure you want to delete this project? All progress will be lost!",
      [
        { text: "cancel", style: "cancel", onPress: () => {} },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            deleteProject(navigation.getParam("id"));
            navigation.goBack();
          },
        },
      ]
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <ProjectNameView>
        <ProjectNameTxt>{navigation.getParam("projectName")}</ProjectNameTxt>
      </ProjectNameView>
      <DeleteButton onPress={() => handleDelete()}>
        <FontAwesome5 name="trash" size={24} color="red" />
      </DeleteButton>
      <Card style={{ backgroundColor: currentColor }}>
        <Stopwatch
          isActive={isActive}
          isPaused={isPaused}
          isReseted={isReseted}
          setIsReseted={setIsReseted}
          updateTotalTimeSpent={updateTotalTimeSpent}
        />
      </Card>
      <TotalTimeSpent time={currentTimeSpent} />
      <ControlButtonsContainer>
        {isActive ? (
          <ControlButtonsPress onPress={() => handlePause()}>
            <FontAwesome5 name="pause" size={48} color={currentColor} />
          </ControlButtonsPress>
        ) : (
          <ControlButtonsPress onPress={() => handleStart()}>
            <FontAwesome5 name="caret-right" size={70} color={currentColor} />
          </ControlButtonsPress>
        )}
        <ControlButtonsPress onPress={() => handleReset()}>
          <FontAwesome5 name="stop" size={48} color={currentColor} />
        </ControlButtonsPress>
      </ControlButtonsContainer>
    </View>
  );
};

const ControlButtonsPress = styled.Pressable`
  padding: 20px;
  margin: 10px;
  width: 30%;
  align-items: center;
`;

const ControlButtonsContainer = styled.Pressable`
  flex: 4;
  align-items: center;
  justify-content: center;
  padding: 5px 10px;
  flex-direction: row;
  border-radius: 50px;
  margin: 6px 6px;
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
  border-radius: 20px;
  margin: 15px 15px;
`;
