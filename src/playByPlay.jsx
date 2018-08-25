import React, {Component} from 'react';
import './App.css';
import { Scrollbars } from 'react-custom-scrollbars';


export default class PlayByPlay extends Component {
  componentDidUpdate(){
    this.customScroll.scrollToBottom()
  }
  render(){
    return (
      <Scrollbars ref = {c=> {this.customScroll = c}}>
        <div>
          <table className= "playList">
            <tbody>
              {this.props.playArray.map((play,i)=>{
                return(
                  <tr key = {i}>
                  <td>{play.down === 1 && `${play.down}st and ${play.distance} `}
                      {play.down %2 ===0 && `${play.down}nd and ${play.distance} `}
                      {play.down === 3 && `${play.down}rd and ${play.distance} `}
                      {play.ballOn >= 50 && `on the Wake ${100 - play.ballOn}`}
                      {play.ballOn < 50 && `on the ${this.props.opponent} ${play.ballOn}`}
                    </td>
                  {play.playType.includes('run') && <td style = {{width:'70%'}}>{play.ballCarrier} runs for a
                  {play.yardsGained > 0 ? ' gain' : ' loss'} of {Math.abs(play.yardsGained)}</td>}
                  {play.playType.includes('pass') && <td style = {{width:'70%'}}>{play.qb.name} pass to {play.ballCarrier} is
                  {play.completePass && ` complete for a gain of ${play.yardsGained}`}
                  {!play.completePass && !play.interception && ` incomplete`}{play.interception && ` intercepted`}</td>}
                  {play.playType === 'sack' &&
                    <td style = {{width:  '70%'}}>{play.qb.name} is sacked for a loss of {Math.abs(play.yardsGained)}</td>}
                  </tr>
                )})
              }
            </tbody>
          </table>
        </div>
      </Scrollbars>
    )
  }
}
