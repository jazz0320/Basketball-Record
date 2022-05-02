function ContinueGame(props) {
  return (
    <div>
      <select>
        {props.everyLiveGames?.map((game) => (
          <option>{game}</option>
        ))}
      </select>
      恢復比賽紀錄？
    </div>
  );
}

export default ContinueGame;
