import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useEffect, useState } from "react";
import styled from "styled-components";

const TeamOnTheGround = styled.div`
  height: 700px;
  width: 220px;
  display: flex;
  align-items: center;
  ::-webkit-scrollbar {
    display: none; /* Chrome Safari */
  }
  flex-direction: column;
  flex-wrap: wrap;
  &:first-child {
    flex-wrap: wrap-reverse;
  }
  &:last-child {
  }
`;

const PlayerImg = styled.img`
  filter: ${(props) =>
    props.exchangePlayer
      ? null
      : props.selectTeam && props.activePlayer === props.index
      ? "drop-shadow(-15px 10px 5px rgba(0, 0, 0, 0.3))"
      : "drop-shadow(-10px 5px 3px rgba(0, 0, 0, 0.5))"};
  width: ${(props) => (props.exchangePlayer ? "90px" : "140px")};
  height: ${(props) => (props.exchangePlayer ? "70px" : "100px")};
  src: ${(props) => props.src};
  transition-duration: 0.5s;
  &:hover {
    width: ${(props) => (props.exchangePlayer ? "110px" : null)};
    height: ${(props) => (props.exchangePlayer ? "80px" : null)};
  }
`;

const PlayerNameBox = styled.div`
  width: 100%;
  text-align: center;
  font-size: ${(props) => (props.exchangePlayer ? "14px" : null)};
`;

const PlayerInsideBox = styled.div`
  background-position: center;
  background-size: cover;
  margin: 0 auto;
  height: 100px;
  width: ${(props) => (props.exchangePlayer ? "80px" : "120px")};
  border-radius: 100%;
  &:hover {
    transition-duration: 0.15s;
  }
  transition-duration: 0.4s;
`;

const PlayerOutsideBox = styled.div`
  height: 140px;
  width: ${(props) => (props.exchangePlayer ? "100px" : "190px")};
  text-align: center;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: cneter;
  transition-duration: 0.5s;
  border-radius: 5px;
  border: ${(props) =>
    props.selectTeam && props.activePlayer === props.index
      ? "8px ridge #ced4da"
      : "0.1px soild white"};
  box-shadow: ${(props) =>
    props.selectTeam && props.activePlayer === props.index
      ? "-12px 7px 7px 5px rgba(108,117,125, 0.4);"
      : "0px 0px 0px 0px rgba(108,117,125, 0.4);"};
`;

function TeamBox(props) {
  const [renderPlayers, setRenderPlayers] = useState();
  useEffect(() => {
    if (props.exchangePlayer === false) {
      setRenderPlayers(props.teamPlayers.slice(0, 5));
    } else {
      setRenderPlayers(props.teamPlayers);
    }
  }, [props.exchangePlayer, props.teamPlayers]);

  function handleOnDragEnd(result) {
    if (!result.destination) return;
    const items = Array.from([...props.teamPlayers]);
    const itemsLength = items.length;
    const [reorderedItemSource] = items.splice(result.source.index, 1);
    let reorderedItemDestination;
    if (result.destination.index === itemsLength - 1) {
      let reorderedItemDestinations = [
        ...items.splice(result.destination.index - 1, 1),
      ];
      reorderedItemDestination = reorderedItemDestinations[0];
    } else {
      let reorderedItemDestinations = [
        ...items.splice(result.destination.index, 1),
      ];
      reorderedItemDestination = reorderedItemDestinations[0];
    }
    items.splice(result.destination.index, 0, reorderedItemSource);
    items.splice(result.source.index, 0, reorderedItemDestination);
    props.setTeamPlayers(items);
  }

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId="team">
        {(provided) => (
          <TeamOnTheGround {...provided.droppableProps} ref={provided.innerRef}>
            {renderPlayers &&
              renderPlayers.map((player, index) => (
                <Draggable
                  key={player.name}
                  draggableId={player.name}
                  index={index}
                >
                  {(provided) => (
                    <PlayerOutsideBox
                      exchangePlayer={props.exchangePlayer}
                      selectTeam={props.selectTeam}
                      activePlayer={props.activePlayer}
                      index={index}
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <PlayerInsideBox exchangePlayer={props.exchangePlayer}>
                        <PlayerImg
                          exchangePlayer={props.exchangePlayer}
                          index={index}
                          src={player.pic}
                        />
                      </PlayerInsideBox>
                      <PlayerNameBox exchangePlayer={props.exchangePlayer}>
                        {player.id}
                      </PlayerNameBox>
                    </PlayerOutsideBox>
                  )}
                </Draggable>
              ))}
            {provided.placeholder}
          </TeamOnTheGround>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default TeamBox;
