import React from "react";
import styled from "styled-components/native";

export const ProjectHeader = ({ title }: any) => {
  return (
    <Header>
      <TitleText>{title}</TitleText>
    </Header>
  );
};

const TitleText = styled.Text`
  color: white;
  font-size: 20px;
  font-weight: bold;
`;

const Header = styled.View`
  flex: 1;
  width: 100%;
  height: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;
