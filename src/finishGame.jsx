import React from 'react';
import './App.css';
import { Scrollbars } from 'react-custom-scrollbars';


const FinishGame = (props) => (
  <div className = 'allPlays'>
    <div className = 'backButton'><button onClick = {props.goBack}>&#x1F878; Back</button></div>
    <Scrollbars>
      <table className = 'playsTable'>
        <tbody>
          <tr>
            <th>Wake</th><th>Opp</th><th>Down</th><th>To Go</th><th>Ball On</th><th>QB</th><th>Play Type</th>
            <th>Ball Carrier</th><th>Yards</th><th>TD</th><th>Comp</th><th>YAC</th><th>Drop</th><th>Int</th>
            <th>Fmbl</th><th>Sack</th>
          </tr>
          {props.driveArray.map((drive)=>{
            return(
              drive.map((plays,i)=>{
                return(
                  <tr key = {i}>
                    <td>{plays.wakeScore}</td><td>{plays.oppScore}</td><td>{plays.down}</td><td>{plays.distance}</td>
                    <td>{plays.ballOn >50 && `Wake ${100 -plays.ballOn}`}
                        {plays.ballOn < 50 && `Opp ${plays.ballOn}`}
                        {plays.ballOn === 50 && `50`}
                    </td>
                    <td>{plays.qb.name}</td><td>{plays.playType}</td><td>{plays.ballCarrier}</td><td>{plays.yardsGained}</td>
                    <td>{plays.touchdown && <div>&#x2714;</div>}{!plays.touchdown && <div>&#x2716;</div>}</td>
                    <td>{plays.completion && <div>&#x2714;</div>}{!plays.completion && <div>&#x2716;</div>}</td><td>{plays.yac}</td>
                    <td>{plays.drop && <div>&#x2714;</div>}{!plays.drop && <div>&#x2716;</div>}</td>
                    <td>{plays.interception && <div>&#x2714;</div>}{!plays.interception && <div>&#x2716;</div>}</td>
                    <td>{plays.fumble && <div>&#x2714;</div>}{!plays.fumble && <div>&#x2716;</div>}</td>
                    <td>{plays.sacked && <div>&#x2714;</div>}{!plays.sacked && <div>&#x2716;</div>}</td>
                  </tr>
                )
              })
            )
          })}
        </tbody>
      </table>
    </Scrollbars>
  </div>
)


export default FinishGame
