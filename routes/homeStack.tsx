import React from "react";
import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import { HomeScreen } from "../screens/HomeScreen";
import { Project } from "../screens/Project";
import { AddTask } from "../screens/AddTask";
import { ProjectHeader } from "../components/ProjectHeader";

const screens = {
  Home: {
    screen: HomeScreen,
    navigationOptions: () => {
      return {
        headerTitle: () => <ProjectHeader title={"Home"} />,
      };
    },
  },
  Project: {
    screen: Project,
    navigationOptions: ({ navigation }: any) => {
      return {
        headerTitle: () => (
          <ProjectHeader title={navigation.getParam("projectName")} />
        ),
        headerLeft: () => null,
      };
    },
  },
  AddTask: {
    screen: AddTask,
    navigationOptions: () => {
      return {
        headerTitle: () => <ProjectHeader title={"Add a new project"} />,
      };
    },
  },
};

const HomeStack = createStackNavigator(screens, {
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: "green",
    },
    headerTitleAlign: "center",
    headerTitleStyle: {
      color: "white",
    },
  },
});

export default createAppContainer(HomeStack);
