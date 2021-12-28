import React, { useState } from "react";

const AppContext = React.createContext({
  projects: [{ id: "test", title: "test" }],
  addProject: (task: string) => {},
  deleteProject: (id: string) => {},
});

export interface ProjectType {
  id: string;
  title: string;
}

const AppProvider = ({ children }: any) => {
  const [projects, setProjects] = useState<ProjectType[]>([]);

  const addTask = (task: string) => {
    if (task === "") return;
    const newList = [...projects];
    newList.push({ id: Date.now().toString(), title: task });
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
        addProject: addTask,
        deleteProject: deleteProject,
      }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppProvider, AppContext };
