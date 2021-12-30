import React, { useState } from "react";

const AppContext = React.createContext({
  projects: [{}],
  addProject: (projectName: string, colour: string) => {},
  deleteProject: (id: string) => {},
});

export interface ProjectType {
  id: string;
  projectName: string;
  currentTimeSpent: number;
  colour: string;
}

const AppProvider = ({ children }: any) => {
  const [projects, setProjects] = useState<ProjectType[]>([]);

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
  };

  const deleteProject = (id: string) => {
    const newList = projects.filter((task) => task.id !== id);
    setProjects(newList);
  };

  return (
    <AppContext.Provider
      value={{
        projects: projects,
        addProject: addProject,
        deleteProject: deleteProject,
      }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppProvider, AppContext };
