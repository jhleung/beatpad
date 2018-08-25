import React from 'react';
import ReactDOM from 'react-dom';
import * as Audio from './audio.js';

class Button extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    // TODO: refactor this absolute monster into an external css/css module if im feeling real cool
    return(
     <button style={{marginBottom:'1px', marginRight:'1px', borderRadius:10, backgroundColor:this.props.color, width:'8%', paddingTop:'3%', paddingBottom:'3%'}} disabled> {this.props.label} </button>
    );
  }
}

class BeatPad extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mapLabelToColor : {'q':'', 'w':'', 'e':'', 'r':'', 't':'', 'y':'', 'u':'', 'i':'', 'o':'', 'p':'',
                        'a':'', 's':'', 'd':'', 'f':'', 'g':'', 'h':'', 'j':'', 'k':'', 'l':'', ';':'',
                        'z':'', 'x':'', 'c':'', 'v':'', 'b':'', 'n':'', 'm':'', ',':'', '.':'', '/':''}
    };

    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
  }
  
  componentWillMount(){
    document.addEventListener("keydown", this.handleKeyDown);
    document.addEventListener("keyup", this.handleKeyUp);
  }

  componentWillUnMount(){
    document.removeEventListener("keydown", this.handleKeyDown);
    document.removeEventListener("keyup", this.handleKeyUp);
  }
  // todo: holding keydown doesnt re-trigger until keyup
  handleKeyDown(e) {
    this.state.mapLabelToColor[e.key] = '#F5EEF8';
    this.setState(this.state);
    Audio.wow(e.key);
  }

  handleKeyUp (e) {
    this.state.mapLabelToColor[e.key] = "";
    this.setState(this.state);
  }

  render() {
    const r1Labels = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'];
    const r1ButtonList = r1Labels.map((label) => 
      <Button label={label} color={this.state.mapLabelToColor[label]}/>
    );
    
    const r2Labels = ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';'];
    const r2Buttonlist = r2Labels.map((label) => 
      <Button label={label} color={this.state.mapLabelToColor[label]}/>
    );
    
    const r3Labels = ['z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/'];
    const r3ButtonList = r3Labels.map((label) => 
      <Button label={label} color={this.state.mapLabelToColor[label]}/>
    );
    return(
      <div>
        <div>{r1ButtonList}</div>
        <div style={{transform:"translateX(10px)"}}>{r2Buttonlist}</div>
        <div style={{transform:"translateX(30px)"}}>{r3ButtonList}</div>
      </div>
    );
  }
}

ReactDOM.render(<BeatPad />, document.getElementById('app'));
