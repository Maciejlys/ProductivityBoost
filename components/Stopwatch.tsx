import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components/native";
import { formatTime } from "../Utils/timeUtil";

interface StopwatchProps {
  isActive: boolean;
  isPaused: boolean;
  isReseted: boolean;
  setIsReseted: (flag: boolean) => void;
  updateTotalTimeSpent: (amount: any) => void;
}

export const Stopwatch: React.FC<StopwatchProps> = ({
  isActive,
  isPaused,
  isReseted,
  setIsReseted,
  updateTotalTimeSpent,
}) => {
  const [timer, setTimer] = useState(0);
  const countRef = useRef<any>();

  const handleStart = () => {
    countRef.current = setInterval(() => {
      setTimer((timer) => timer + 1);
    }, 1000);
  };

  const handlePause = () => {
    clearInterval(countRef.current);
  };

  const handleReset = () => {
    clearInterval(countRef.current);
    updateTotalTimeSpent(timer);
    setTimer(0);
    // save the time later
  };

  useEffect(() => {
    if (isActive) {
      handleStart();
    }
  }, [isActive]);

  useEffect(() => {
    if (isPaused) {
      handlePause();
    }
  }, [isPaused]);

  useEffect(() => {
    if (isReseted) {
      handleReset();
      setIsReseted(false);
    }
  }, [isReseted]);

  return <StopwatchStyles>{formatTime(timer)}</StopwatchStyles>;
};

const StopwatchStyles = styled.Text`
  font-size: 40px;
  color: white;
  font-weight: bold;
`;
