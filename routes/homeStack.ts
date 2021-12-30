import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import { HomeScreen } from "../screens/HomeScreen";
import { Project } from "../screens/Project";
import { AddTask } from "../screens/AddTask";

const screens = {
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      title: "Projects",
    },
  },
  Project: {
    screen: Project,
  },
  AddTask: {
    screen: AddTask,
    navigationOptions: {
      title: "Add new project",
    },
  },
};

const HomeStack = createStackNavigator(screens, {
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: "green",
    },
    headerTitleAlign: "center",
  },
});

export default createAppContainer(HomeStack);
