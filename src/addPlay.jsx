import React, { Component } from 'react';
import './App.css';


const AddPlay = (props) => (
  <div className = 'play'>
    <div className = 'runButtons'>
      <p><u>Run</u></p>
      <p><button style = {props.style('runLeft')} onClick = {props.onClick} id = 'runLeft'>Run Left</button></p>
      <p><button style = {props.style('runMiddle')} onClick = {props.onClick} id = 'runMiddle'>Run Middle</button></p>
      <p><button style = {props.style('runRight')} onClick = {props.onClick} id = 'runRight'>Run Right</button></p>
    </div>
    <div className = 'passButtons'>
      <p><u>Pass</u></p>
      <p><button style = {props.style('pass_0-5')} onClick = {props.onClick} id= 'pass_0-5'>0-5</button></p>
      <p><button style = {props.style('pass_5-15')} onClick = {props.onClick} id ='pass_5-15'>5-15</button></p>
      <p><button style = {props.style('pass_15+')} onClick = {props.onClick} id= 'pass_15+'>15+</button></p>
    </div>
  </div>
)


export default AddPlay
