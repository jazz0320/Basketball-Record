import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

function TeamBox(props) {
  function handleOnDragEnd(result) {
    if (!result.destination) return;
    const items = Array.from([...props.aTeamPlayers]);
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
    props.setATeamPlayers(items);
  }
  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId="teamA">
        {(provided) => (
          <div
            id="teambox"
            // style={{ display: "flex" }}
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {props.aTeamPlayers &&
              props.aTeamPlayers.map((player, index) => (
                <Draggable
                  key={player.name}
                  draggableId={player.name}
                  index={index}
                >
                  {(provided) => (
                    <div
                      // key={index}
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <div
                        style={{
                          backgroundSize: "cover",
                          height: "100px",
                          width: "130px",
                          backgroundImage: `url(${player.pic})`,
                        }}
                      ></div>
                      {player.name}
                    </div>
                  )}
                </Draggable>
              ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default TeamBox;
