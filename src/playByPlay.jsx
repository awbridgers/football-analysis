import React from 'react';
import './App.css';


const PlayByPlay = (props) => (
  <div>
    <table className= "playList">
      <tbody>
        {props.playArray.map((play)=>{
          return(
            <tr>
            <td>{play.down === 1 && `${play.down}st and ${play.distance} `}
                {play.down %2 ===0 && `${play.down}nd and ${play.distance} `}
                {play.down === 3 && `${play.down}rd and ${play.distance} `}
                {play.ballOn >= 50 && `on the Wake ${100 - play.ballOn}`}
                {play.ballOn < 50 && `on the ${props.opponent} ${play.ballOn}`}
              </td>
            {play.playType.includes('run') && <td style = {{width:'70%'}}>{play.ballCarrier} runs for a gain of {play.yardsGained}</td>}
            </tr>
          )})
        }

      </tbody>
    </table>
  </div>
)

export default PlayByPlay
