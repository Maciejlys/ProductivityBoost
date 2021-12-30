import React, { useContext } from "react";
import { Text, View, Pressable, FlatList } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import styled from "styled-components/native";
import { AppContext } from "../context/context";
import { FontAwesome } from "@expo/vector-icons";

export const HomeScreen = ({ navigation }: any) => {
  const { projects } = useContext(AppContext);
  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 4 }}>
        <FlatList
          data={projects}
          renderItem={({ item, index }: any) => (
            <ProjectItem
              onPress={() => {
                navigation.navigate("Project", item);
              }}>
              <FontAwesome
                key={index}
                name="circle"
                size={30}
                color={item.colour}
                style={{ margin: 5 }}
              />
              <ProjectText>{item.projectName}</ProjectText>
            </ProjectItem>
          )}
        />
      </View>
      <FooterAddButton>
        <Pressable onPress={() => navigation.navigate("AddTask")}>
          {/* <Ionicons name="add-circle" size={100} color="green" /> */}
          <AntDesign
            name="pluscircle"
            size={80}
            color="green"
            backgroundColor="007AFF"
          />
        </Pressable>
      </FooterAddButton>
    </View>
  );
};

const ProjectItem = styled.Pressable`
  align-items: center;
  flex-direction: row;
  border-radius: 6px;
  elevation: 3;
  background-color: #fff;
  box-shadow: 0 1px 1px #333;
  margin: 10px 15px;
  padding: 0 10px;
`;

const ProjectText = styled.Text`
  font-size: 30px;
  margin: 10px;
`;

const FooterAddButton = styled.View`
  position: absolute;
  justify-content: center;
  align-items: center;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: transparent;
  bottom: 0;
`;
