import React, { useEffect } from "react";
import { View, Text } from "react-native";

interface ProjectProps {}

export const Project: React.FC<ProjectProps> = ({ navigation }: any) => {
  return (
    <View>
      <Text>{navigation.getParam("projectName")}</Text>
      <Text>{navigation.getParam("currentTimeSpent")}</Text>
    </View>
  );
};
