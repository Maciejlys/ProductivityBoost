import React from "react";
import styled from "styled-components/native";
import { formatTime } from "../Utils/timeUtil";

interface TotalTimeSpentProps {
  time: number;
}

export const TotalTimeSpent: React.FC<TotalTimeSpentProps> = ({ time }) => {
  return (
    <TotalTimeSpentView>
      <TotalTimeSpentTxt>Total time spent</TotalTimeSpentTxt>
      <TotalTimeSpentTxt>{formatTime(time)}</TotalTimeSpentTxt>
    </TotalTimeSpentView>
  );
};

const TotalTimeSpentTxt = styled.Text`
  font-size: 30px;
`;

const TotalTimeSpentView = styled.View`
  flex: 4;
  align-items: center;
  justify-content: center;
  padding: 5px 10px;
  flex-direction: row;
  border-radius: 50px;
  margin: 6px 6px;
  flex-direction: column;
`;
