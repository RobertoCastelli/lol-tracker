import React, { useState, useEffect } from "react";

const Tracker = () => {
  //-------
  //GLOBALS
  //-------
  const apiKey = `RGAPI-f4722db3-2733-43be-b335-f2afdbfbd055`;
  const encryptedID = `WiRUurtB56WCPODVbWW-_WdGmndH5ZVemP-7_LIf57uNBAE`;
  const cors = `https://cors-anywhere.herokuapp.com/`;
  const version = `10.14.1`;
  const summonerUrl = `https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name`;
  const serverUrl = `https://euw1.api.riotgames.com/lol/status/v3/shard-data`;
  const scoreUrl = `https://euw1.api.riotgames.com/lol/league/v4/entries/by-summoner`;
  const iconUrl = `http://ddragon.leagueoflegends.com/cdn/${version}/img/profileicon`;

  //-----
  //STATE
  //-----
  const [name, setName] = useState("Feticcio");
  const [url, setUrl] = useState(
    `${cors}${summonerUrl}/${name}?api_key=${apiKey}`
  );
  const [loading, setLoading] = useState(false);
  const [level, setLevel] = useState("");
  const [id, setId] = useState(encryptedID);
  const [icon, setIcon] = useState("");
  const [status, setStatus] = useState("");
  const [server, setServer] = useState("");
  const [wins, setWins] = useState("");
  const [losses, setLosses] = useState("");
  const [tier, setTier] = useState("");
  const [queue, setQueue] = useState("");
  const [rank, setRank] = useState("");

  //-----
  //FETCH
  //-----
  useEffect(() => {
    // SUMMONER
    const fetchSummoner = async () => {
      setLoading(true);
      try {
        const fetchSummoner = await fetch(url);
        const summonerData = await fetchSummoner.json();
        console.log(summonerData);
        setName(summonerData.name);
        setLevel(summonerData.summonerLevel);
        setId(summonerData.id);
        setLoading(false);
        setIcon(summonerData.profileIconId);
      } catch (err) {
        console.log(`there is a problem: ${err.message}`);
      }
    };

    // SERVER
    const fetchServer = async () => {
      try {
        const fetchServer = await fetch(
          `${cors}${serverUrl}?api_key=${apiKey}`
        );
        const serverData = await fetchServer.json();
        console.log(serverData);
        setStatus(serverData.services[3].status);
        setServer(serverData.name);
      } catch (err) {
        console.log(`there is a problem: ${err.message}`);
      }
    };

    // SCORE
    const fetchScore = async () => {
      try {
        const fetchScore = await fetch(
          `${cors}${scoreUrl}/${id}?api_key=${apiKey}`
        );
        const scoreData = await fetchScore.json();
        console.log(scoreData);
        setQueue(scoreData[0].queueType);
        setWins(scoreData[0].wins);
        setLosses(scoreData[0].losses);
        setRank(scoreData[0].rank);
        setTier(scoreData[0].tier);
      } catch (err) {
        console.log(`there is a problem: ${err.message}`);
      }
    };
    fetchSummoner();
    fetchServer();
    fetchScore();
  }, [url]);

  //--------
  //HANDLERS
  //--------
  const showLoading = () => (loading ? <h4>Loading...</h4> : "");
  const handleChange = (e) => {
    setName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setUrl(`${cors}${summonerUrl}/${name}?api_key=${apiKey}`);
  };

  //------
  //RENDER
  //------
  return (
    <div className="card-wrapper">
      <form onSubmit={handleSubmit}>
        <input
          value={name}
          onFocus={(e) => (e.target.value = "")}
          onChange={handleChange}
          type="text"
          placeholder="search summoner"
        />
        <button type="submit">SEARCH</button>
      </form>
      <fieldset className="card-body">
        <legend>{name}</legend>
        <div className="card-info">
          <div className="card-images">
            <img
              classname="card-image-icon"
              src={`${iconUrl}/${icon}.png`}
              alt="icons"
            />
          </div>
          {showLoading()}
          <ul>
            <li>queue {queue}</li>
            <li>level {level}</li>
            <li>
              tier {tier} {rank}
            </li>
            <li>wins {wins}</li>
            <li>losses {losses}</li>
          </ul>
        </div>
        <div className="card-server">
          <ul>
            <li>region {server}</li>
            <li>status {status}</li>
          </ul>
        </div>
      </fieldset>
    </div>
  );
};

export default Tracker;
