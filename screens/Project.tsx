import React, { useContext, useState, useEffect } from "react";
import { useKeepAwake } from "expo-keep-awake";
import { View, Alert, Platform, BackHandler, Pressable } from "react-native";
import AwesomeAlert from "react-native-awesome-alerts";
import { AppContext } from "../context/context";
import styled from "styled-components/native";
import { Stopwatch } from "../components/Stopwatch";
import { FontAwesome5 } from "@expo/vector-icons";
import { TotalTimeSpent } from "../components/TotalTimeSpent";

export const Project = ({ navigation }: any) => {
  useKeepAwake();
  const { addCurrentTime, getCurrentTimeSpent, deleteProject } =
    useContext(AppContext);

  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [showAlertGoBack, setshowAlertGoBack] = useState(false);
  const [showAlertDelete, setshowAlertDelete] = useState(false);
  const [isReseted, setIsReseted] = useState(false);
  const [currentColor, setCurrentColor] = useState("black");
  const [currentTimeSpent, setCurrentTimeSpent] = useState(
    navigation.getParam("currentTimeSpent")
  );

  useEffect(() => {
    setCurrentColor(navigation.getParam("colour"));
    const backHandler = BackHandler.addEventListener("hardwareBackPress", () =>
      handleReturn()
    );
    return () => backHandler.remove();
  }, []);

  const handleReturn = () => {
    if (!isActive && !isPaused) {
      navigation.goBack();
      return;
    }
    setshowAlertGoBack(!showAlertGoBack);
    return true;
  };

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
    setIsPaused(false);
    setIsReseted(true);
  };

  const updateTotalTimeSpent = (amount: any) => {
    addCurrentTime(navigation.getParam("id"), amount);
    setCurrentTimeSpent(getCurrentTimeSpent(navigation.getParam("id")));
  };

  return (
    <View style={{ flex: 1 }}>
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
      <GoBackButton>
        <Pressable onPress={handleReturn}>
          <GoBackButtonText>Go back</GoBackButtonText>
        </Pressable>
      </GoBackButton>
      <GoBackButton>
        <Pressable onPress={() => setshowAlertDelete(true)}>
          <DeleteButtonText>Delete</DeleteButtonText>
        </Pressable>
      </GoBackButton>
      <AwesomeAlert
        show={showAlertGoBack}
        showProgress={false}
        title="Are you sure?"
        message="All of the progress will be lost!"
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        showCancelButton={true}
        showConfirmButton={true}
        cancelText="No, cancel"
        confirmText="Yes, go back"
        confirmButtonColor="#DD6B55"
        onCancelPressed={() => {
          setshowAlertGoBack(!showAlertGoBack);
        }}
        onConfirmPressed={() => {
          setshowAlertGoBack(!showAlertGoBack);
          setIsActive(false);
          setIsPaused(false);
          setIsReseted(false);
          navigation.goBack();
        }}
      />
      <AwesomeAlert
        show={showAlertDelete}
        showProgress={false}
        title="Delete this project?"
        message="All of the progress will be lost!"
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        showCancelButton={true}
        showConfirmButton={true}
        cancelText="No, cancel"
        confirmText="Yes, delete it"
        confirmButtonColor="#DD6B55"
        onCancelPressed={() => {
          setshowAlertDelete(!showAlertDelete);
        }}
        onConfirmPressed={() => {
          setshowAlertDelete(!showAlertDelete);

          deleteProject(navigation.getParam("id"));
          navigation.goBack();
        }}
      />
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
  bottom: 0;
  right: 0;
  padding: 10px;
`;

const GoBackButton = styled.View`
  align-items: center;
  justify-content: center;
  flex: 1;
  margin-bottom: 30px;
  flex-direction: row;
`;

const GoBackButtonText = styled.Text`
  color: green;
  font-size: 30px;
`;
const DeleteButtonText = styled.Text`
  color: red;
  font-size: 15px;
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
