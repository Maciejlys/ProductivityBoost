import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AppContext = React.createContext({
  projects: [{}],
  addProject: (projectName: string, colour: string) => {},
  addCurrentTime: (id: string, timeSpent: number) => {},
  getCurrentTimeSpent: (id: string) => {},
  deleteProject: (id: string) => {},
});

export interface ProjectType {
  id: string;
  projectName: string;
  currentTimeSpent: number;
  colour: string;
}

const saveData = async (data: ProjectType[]) => {
  try {
    AsyncStorage.setItem("data", JSON.stringify(data));
  } catch (error) {
    alert(error);
  }
};

const getData = async (): Promise<ProjectType[]> => {
  try {
    const data = (await AsyncStorage.getItem("data")) || "[]";
    return JSON.parse(data) as ProjectType[];
  } catch (error) {
    alert(error);
  }
  return [];
};

const AppProvider = ({ children }: any) => {
  const [projects, setProjects] = useState<ProjectType[]>([]);

  useEffect(() => {
    getData().then((projects) => setProjects(projects));
  }, []);

  const addProject = (projectName: string, colour: string) => {
    if (projectName === "") return;
    const newList = [...projects];
    newList.push({
      id: Date.now().toString(),
      projectName: projectName,
      currentTimeSpent: 0,
      colour: colour,
    });
    setProjects(newList);
    saveData(newList);
  };

  const addCurrentTime = (id: string, timeSpent: number) => {
    const elementIndex = projects.findIndex((element) => element.id == id);
    let newArray = [...projects];
    newArray[elementIndex] = {
      ...newArray[elementIndex],
      currentTimeSpent: (newArray[elementIndex].currentTimeSpent += timeSpent),
    };
    saveData(newArray);
  };

  const getCurrentTimeSpent = (id: string) => {
    return projects.filter((project) => project.id === id)[0].currentTimeSpent;
  };

  const deleteProject = (id: string) => {
    const newList = projects.filter((task) => task.id !== id);
    setProjects(newList);
    saveData(newList);
  };

  return (
    <AppContext.Provider
      value={{
        getCurrentTimeSpent,
        projects,
        addProject,
        addCurrentTime,
        deleteProject,
      }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppProvider, AppContext };
