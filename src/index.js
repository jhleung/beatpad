import React from 'react';
import ReactDOM from 'react-dom';

class Button extends React.Component {
  constructor(props) {
    super(props);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  handleKeyDown(event) {
    this.props.changeColor(this.props.index);
  }

  render() {
    return(
      <button style={{backgroundColor:this.props.sound.bgColor, width:'9%', paddingBottom:'6%'}} onKeyDown={this.handleKeyDown} onClick={this.handleClick}> {this.props.sound.label} </button>
    );
  }
}

class BeatPad extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      r1: [
        {label: 'q', bgColor: ""}, {label: 'w', bgColor: ""}, {label: 'e', bgColor: ""}, {label: 'r', bgColor: ""}, {label: 't', bgColor: ""},
        {label: 'y', bgColor: ""}, {label: 'u', bgColor: ""}, {label: 'i', bgColor: ""}, {label: 'o', bgColor: ""}, {label: 'p', bgColor: ""}],
      r2: [
        {label: 'a', bgColor: ""}, {label: 's', bgColor: ""}, {label: 'd', bgColor: ""}, {label: 'f', bgColor: ""}, {label: 'g', bgColor: ""},
        {label: 'h', bgColor: ""}, {label: 'j', bgColor: ""}, {label: 'k', bgColor: ""}, {label: 'l', bgColor: ""}, {label: ';', bgColor: ""}],
      r3: [
        {label: 'z', bgColor: ""}, {label: 'x', bgColor: ""}, {label: 'c', bgColor: ""}, {label: 'v', bgColor: ""}, {label: 'b', bgColor: ""},
        {label: 'n', bgColor: ""}, {label: 'm', bgColor: ""}, {label: ',', bgColor: ""}, {label: '.', bgColor: ""}, {label: '/', bgColor: ""}]
    }

    this.changeColor = this.changeColor.bind(this);

  }
  
  changeColor(index) {
    this.state.r1.map(function(sound, i){
      sound.bgColor = (index == i) ? 'blue' : '';
    });

    this.state.r2.map(function(sound, i){
      sound.bgColor = (index == i+10) ? 'blue' : '';
    });

    this.state.r3.map(function(sound, i){
      sound.bgColor = (index == i+20) ? 'blue' : '';
    });
    this.setState(this.state)
  }

  // TODO: space betwen buttons, maybe refactor the divs
  render() {
    const r1List = [this.state.r1.map((sound, i) => <Button changeColor={this.changeColor} sound={sound} index={i}/>)];
    const r2List = [this.state.r2.map((sound, i) => <Button changeColor={this.changeColor} sound={sound} index={i+10}/>)];
    const r3List = [this.state.r3.map((sound, i) => <Button changeColor={this.changeColor} sound={sound} index={i+20}/>)];
    
    return(
      <div>
        <div>{r1List}</div>
        <div style={{transform:"translateX(10px)"}}>{r2List}</div>
        <div style={{transform:"translateX(30px)"}}>{r3List}</div>
      </div>
    );
  }
}

ReactDOM.render(<BeatPad />, document.getElementById('app'));
