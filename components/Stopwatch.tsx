import React, { useState, useRef, useEffect } from "react";
import { Text } from "react-native";
import styled from "styled-components/native";

interface StopwatchProps {
  isActive: boolean;
  isPaused: boolean;
  isReseted: boolean;
  setIsReseted: (flag: boolean) => void;
}

export const Stopwatch: React.FC<StopwatchProps> = ({
  isActive,
  isPaused,
  isReseted,
  setIsReseted,
}) => {
  const [timer, setTimer] = useState(0);
  const countRef = useRef<any>();

  const formatTime = () => {
    const getSeconds = `0${timer % 60}`.slice(-2);
    const minutes: any = `${Math.floor(timer / 60)}`;
    const getMinutes = `0${minutes % 60}`.slice(-2);
    const getHours = `0${Math.floor(timer / 3600)}`.slice(-2);

    return `${getHours} : ${getMinutes} : ${getSeconds}`;
  };

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

  return <StopwatchStyles>{formatTime()}</StopwatchStyles>;
};

const StopwatchStyles = styled.Text`
  font-size: 40px;
  color: white;
  font-weight: bold;
`;
