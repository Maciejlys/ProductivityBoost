import React, { useContext } from "react";
import { Text, View, Pressable, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styled from "styled-components/native";
import { AppContext } from "../context/context";

export const HomeScreen = ({ navigation }: any) => {
  const { projects } = useContext(AppContext);
  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 4 }}>
        <FlatList
          data={projects}
          renderItem={({ item }: any) => (
            <Pressable onPress={() => navigation.navigate("Project", item)}>
              <Text>{item.title}</Text>
            </Pressable>
          )}
        />
      </View>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Pressable onPress={() => navigation.navigate("AddTask")}>
          <Ionicons name="add-circle" size={100} color="green" />
        </Pressable>
      </View>
    </View>
  );
};
