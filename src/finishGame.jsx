import React from 'react';
import './App.css';


const FinishGame = (props) => (
  <div className = 'allPlays'>
    <table className = 'playsTable'>
      <tbody>
        <tr>
          <th>Wake Score</th><th>Opp Score</th><th>Down</th><th>To Go</th><th>Ball On</th><th>QB</th><th>Play Type</th>
          <th>Ball Carrier</th><th>Yards</th><th>TD</th><th>Pass Complete</th><th>YAC</th><th>Drop</th><th>Int</th>
          <th>Fumble</th><th>Sack</th>
        </tr>
      </tbody>
    </table>
  </div>
)


export default FinishGame
