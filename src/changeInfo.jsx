import React from 'react';
import './App.css';

const ChangeInfo = (props) => (
  <div className = 'changeInfo'>
    <div style = {{display: 'inline-block', verticalAlign: 'top',width: '150px'}}>
      <p style = {{borderBottom: '2px solid black'}}>Down: {props.down}</p>
      <p><button onClick = {props.changeDown} id = '1'>1</button></p>
      <p><button onClick = {props.changeDown} id = '2'>2</button></p>
      <p><button onClick = {props.changeDown} id = '3'>3</button></p>
      <p><button onClick = {props.changeDown} id = '4'>4</button></p>
    </div>
    <div style = {{display: 'inline-block', verticalAlign: 'top',width: '150px'}}>
      <p style = {{borderBottom: '2px solid black'}}>Distance: {props.distance}</p>
      <p><button onClick = {props.changeDistance} id = '+'>+ 1</button></p>
      <p><button onClick = {props.changeDistance} id = '-'> - 1</button></p>
    </div>
    <div style = {{display: 'inline-block', verticalAlign: 'top', width:'250px'}}>
      <p style = {{borderBottom: '2px solid black'}}>Ball on: {props.ballOn >= 50 && `Own ${100 -props.ballOn}`}
        {props.ballOn < 50 && `${props.opponent} ${props.ballOn}`}</p>
      <p><label>Yard Line: </label>
        <input value = {props.yardLine} onChange = {props.onChange} type = 'text' size = '1'
        style = {{textAlign: 'center',marginRight:'20px'}}></input>
      </p>
      <p>
        <input type='radio' checked = {props.territory === 'own'} onChange = {props.changeRadio}
        name = 'territory' value = 'own' id ='own'/><label style = {{paddingRight: "20px"}}>Own</label>
        <input type='radio' checked = {props.territory === 'opponent'} onChange = {props.changeRadio}
        name = 'territory' value = 'opponent' id ='opponent'/><label>Opponent</label>
    </p>
    </div>
    <div>
      <button onClick = {props.accept}>Accept</button>
    </div>

  </div>
)

export default ChangeInfo
