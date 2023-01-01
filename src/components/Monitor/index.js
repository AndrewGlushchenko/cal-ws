import React from "react";
import styled from "styled-components";
import {DISPLAY_MODE_DAY, DISPLAY_MODE_MONTH} from "../../tools/constants";

const MonWrapper = styled('div')`
  display: flex;
  justify-content: space-between;
  background-color: #1E1F21;
  color: #DCDDDD;
  padding: 16px;
  position: relative;
`;

const TextWrapper = styled('span')`
  font-size: 32px;
`;

const MonthWrapper = styled(TextWrapper)`
  font-weight: bold;
  margin-right: 8px;
  margin-left: 8px;
`;

const ButBlockWrapper = styled('div')`
  display: flex;
  align-items: center;
`;

const ButtonCenterWrapper = styled(ButBlockWrapper)`
  position: absolute;
  top: 50%;
  right: 50%;
  transform: translate(50%,-50%);
`;

const ButtonWrapper = styled('button')`
  border: unset;
  background-color: ${props => props.unPressed ? '#27282A' : '#565759'};
  border: 1px solid #565759;
  height: 20px;
  border-radius: 4px;
  color: ${props => props.unPressed ? '#A4A6A9' : '#E6E6E6'};
  outline: unset;
  cursor: pointer;
  &:not(:last-child){
    margin-right: 2px;
  }
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TodayWrapper =styled(ButtonWrapper)`
  padding-right: 16px;
  padding-left: 16px;
  font-weight: bold;
`;

const Monitor = ({today, prevHandler,todayHandler, nextHandler, setDisplayMode, displayMode}) => {

    return(
      <MonWrapper>
          <div>
              {
                  displayMode === DISPLAY_MODE_DAY ? (
                      <TextWrapper>{today.format('DD')}</TextWrapper>
                  ) : null
              }
              <MonthWrapper>{today.format('MMMM')}</MonthWrapper>
              <TextWrapper>{today.format('YYYY')}</TextWrapper>
          </div>
          <ButtonCenterWrapper>
              <ButtonWrapper unPressed={displayMode === DISPLAY_MODE_DAY } onClick=
                  {() => setDisplayMode(DISPLAY_MODE_DAY)} >Day</ButtonWrapper>
              <ButtonWrapper unPressed={displayMode === DISPLAY_MODE_MONTH} onClick=
                  {() => setDisplayMode(DISPLAY_MODE_MONTH)} >Month</ButtonWrapper>
          </ButtonCenterWrapper>
          <ButBlockWrapper>
              <ButtonWrapper onClick={prevHandler} >&lt;</ButtonWrapper>
              <TodayWrapper onClick={todayHandler} >Today</TodayWrapper>
              <ButtonWrapper onClick={nextHandler} >&gt;</ButtonWrapper>
          </ButBlockWrapper>
      </MonWrapper>
    );
};

export { Monitor };