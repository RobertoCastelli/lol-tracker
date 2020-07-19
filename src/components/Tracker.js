import React from "react";

const Tracker = () => {
  return (
    <div className="card-wrapper">
      <form>
        <input type="text" placeholder="search summoner name" />
        <button type="submit">SEARCH</button>
      </form>
      <div className="card-icons">
        <img src="https://via.placeholder.com/100" alt="avatar" />
        <img src="https://via.placeholder.com/100" alt="icons" />
      </div>
      <fieldset className="card-body">
        <legend>Name</legend>
        <div className="card-info">
          <ul>
            <li>rank</li>
            <li>level</li>
            <li>score</li>
            <li>wins</li>
            <li>losses</li>
          </ul>
        </div>
        <div className="card-server">
          <ul>
            <li>location</li>
            <li>status</li>
          </ul>
        </div>
      </fieldset>
    </div>
  );
};

export default Tracker;
