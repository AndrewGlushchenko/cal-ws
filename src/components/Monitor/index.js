import React from "react";
import styled from "styled-components";

const MonWrapper = styled('div')`
  display: flex;
  justify-content: space-between;
  background-color: #1E1F21;
  color: #DCDDDD;
  padding: 16px;
`;

const TextWrapper = styled('span')`
  font-size: 32px;
`;

const MonthWrapper = styled(TextWrapper)`
  font-weight: bold;
  margin: 8px;
`;

const ButWrapper = styled('button')`
  border: unset;
  background-color: #565759;
  height: 20px;
  margin-right: 2px;
  border-radius: 4px;
  color: #E6E6E6;
  outline: unset;
  cursor: pointer;
`;

const TodayWrapper =styled(ButWrapper)`
  padding-right: 16px;
  padding-left: 16px;
  font-weight: bold;
`;

const ButBlockWrapper = styled('div')`
  display: flex;
  align-items: center;
`;

const Monitor = ({today, prevHandler,todayHandler, nextHandler}) => {

    return(
      <MonWrapper>
          <div>
              <MonthWrapper>{today.format('MMMM')}</MonthWrapper>
              <TextWrapper>{today.format('YYYY')}</TextWrapper>
          </div>
          <ButBlockWrapper>
              <ButWrapper onClick={prevHandler} >&lt;</ButWrapper>
              <TodayWrapper onClick={todayHandler} >Today</TodayWrapper>
              <ButWrapper onClick={nextHandler} >&gt;</ButWrapper>
          </ButBlockWrapper>
      </MonWrapper>
    );
};

export { Monitor };