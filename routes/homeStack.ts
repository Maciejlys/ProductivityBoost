import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import { HomeScreen } from "../screens/HomeScreen";
import { Project } from "../screens/Project";
import { AddTask } from "../screens/AddTask";

const screens = {
  Home: {
    screen: HomeScreen,
  },
  Project: {
    screen: Project,
  },
  AddTask: {
    screen: AddTask,
  },
};

const HomeStack = createStackNavigator(screens);

export default createAppContainer(HomeStack);
