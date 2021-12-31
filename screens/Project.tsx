import React, { useContext, useState } from "react";
import { View, Text, Button } from "react-native";
import { AppContext } from "../context/context";
import styled from "styled-components/native";
import { Stopwatch } from "../components/Stopwatch";

interface ProjectProps {}

export const Project: React.FC<ProjectProps> = ({ navigation }: any) => {
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
  const { addCurrentTime, getCurrentTimeSpent } = useContext(AppContext);

  const add = () => {
    addCurrentTime(navigation.getParam("id"), 5);
    setCurrentTimeSpent(getCurrentTimeSpent(navigation.getParam("id")));
  };

  return (
    <View style={{ flex: 1 }}>
      <ProjectNameView>
        <ProjectNameTxt>{navigation.getParam("projectName")}</ProjectNameTxt>
      </ProjectNameView>
      <Card style={{ backgroundColor: navigation.getParam("colour") }}>
        <Stopwatch
          isActive={isActive}
          isPaused={isPaused}
          isReseted={isReseted}
          setIsReseted={setIsReseted}
        />
      </Card>
      <Card>
        <Text>Test</Text>
      </Card>
      <Card>
        <Button
          title="start"
          onPress={() => {
            handleStart();
          }}
        />
        <Button
          title="pause"
          onPress={() => {
            handlePause();
          }}
        />
        <Button
          title="reset"
          onPress={() => {
            handleReset();
          }}
        />
        <Text>Test</Text>
      </Card>
    </View>
  );
};

const ProjectNameTxt = styled.Text`
  font-size: 20px;
  font-weight: bold;
`;
const ProjectNameView = styled.View`
  align-items: center;
  justify-content: center;
  flex: 1;
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
