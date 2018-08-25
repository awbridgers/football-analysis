import React from 'react';
import './App.css';

const ChangePlayer = (props) => (
  <div className = 'changePlayer'>
    <div style = {{display: 'inline-block', verticalAlign: 'top', width:'300px'}}>
      <p style = {{width: '300px', borderBottom: "2px solid black"}}>Current QB: {props.qb.name}</p>
      {props.qbArray.map((qb,i)=>{
        return(
          <p key = {i}><button onClick = {props.changeQB} id = {qb.name}>{qb.name}</button></p>
        )
      })}
    </div>
    <div style = {{display: 'inline-block', verticalAlign: 'top', width:'300px'}}>
      <p style = {{width: '300px', borderBottom: "2px solid black"}}>Current HB: {props.hb.name}</p>
      {props.hbArray.map((hb,idgaf)=>{
        return(
          <p key ={idgaf}><button onClick = {props.changeHB} id = {hb.name}>{hb.name}</button></p>
        )
      })}
    </div>
    <div>
      <button onClick = {props.accept}>Accept</button>
    </div>
  </div>
)

export default ChangePlayer
