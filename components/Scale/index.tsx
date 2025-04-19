import { useCallback, useEffect, useState, useMemo } from "react";
import styled, { keyframes } from "styled-components";
import useWindowDimensions from "@/utils/useWindowDimensions";
import {
  ParticipantTile,
} from '@livekit/components-react';

// Declare keyframes at the top
const grow = keyframes`
  0% {
    transform: scale(0.00001);
  }
  1500% {
    transform: scale(1);
  }
`;

const ScaleStyle = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: url("/pin.png"), crosshair;
  animation: ${grow} 4.3s linear normal;

  .span {
    pointer-events: none;
  }
`;

interface ScaleProps {
  text: string;
  id: number;
  onClickHandler: (id: number) => void;
}

const Scale: React.FC<ScaleProps> = ({ text, id, onClickHandler }) => {
  const { height: windowHeight, width: windowWidth } = useWindowDimensions();

  const handleClick = useCallback(() => {
    onClickHandler(id);
  }, [id, onClickHandler]);

  return (
    <ScaleStyle style={{ width: windowWidth, height: windowHeight }} onClick={handleClick}>
      <span>
        <ParticipantTile />
      </span>
    </ScaleStyle>
  );
};

export default Scale;
