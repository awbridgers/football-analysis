import React from 'react';
import './App.css';


const PlayerStats = (props) => (
  <div>
    <table className = 'statsTable'>
      <tbody>
        <tr><th colSpan ='2'>Passing</th></tr>
        {props.players.map((player,i)=>{
          if(player.passesAttempted() > 0 && !isNaN(player.passesAttempted())){
            return(
              <tr key = {i}>
                <td className = 'statsName'>{player.name}</td>
                <td>{player.totalCompletions()}-{player.passesAttempted()}
                  , {player.passingYards} yards, {player.passingTDs} TD, {player.interceptions} Int, {player.sacked} sack</td>
            </tr>
            )
          }
          else{
            return (null)
          }
        })}
        <tr><th colSpan ='2'>Rushing</th></tr>
        {props.players.map((player,i)=>{
          if(player.rushAttempts > 0){
            return (
              <tr key ={i}>
                <td className = 'statsName'>{player.name}</td>
                <td>{player.rushAttempts} rush, {player.rushYards} yards, {player.rushingTDs} TD, {player.fumbles} fumbles</td>
              </tr>
            )
          }
          else{
            return (null);
          }
        })}
        <tr><th colSpan = '2'>Receiving</th></tr>
        {props.players.map((player,i)=>{
          if(player.receptions > 0){
            return(
              <tr key = {i}>
                <td className = 'statsName'>{player.name}</td>
                <td>{player.receptions} rec
                  , {player.receivingYards} yards, {player.receivingTDs} TD
                  , {player.yardsAfterCatch} YAC, {player.drops} drops, {player.fumbles} fumbles</td>
              </tr>
            )
          }
          else{
            return (null)
          }
        })}
      </tbody>
    </table>
  </div>

)

export default PlayerStats
