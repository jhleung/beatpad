import React from 'react';
import ReactDOM from 'react-dom';
import * as Audio from './audio.js';

// TODO: move child components to another file?
class LayerButton extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.playbackLayer(this.props.layerIndex);
  }

  render() {
    return(
      <button onClick={this.handleClick}> </button>
    );
  }
}

class PlayTrackButton extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.playTrack();
  }

  render() {
    return(
      <button style={{backgroundColor:'green'}} onClick={this.handleClick}> </button>
    );
  }
}


class SoundButton extends React.Component {
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

// TODO: honestly this just looks wrong. im not doing react correctly arent i
class BeatPad extends React.Component {
  constructor(props) {
    super(props);
    // essentially using state as global variables, not sure how "React" this code is
    this.state = {
      mapLabelToColor: {'q':'', 'w':'', 'e':'', 'r':'', 't':'', 'y':'', 'u':'', 'i':'', 'o':'', 'p':'',
                        'a':'', 's':'', 'd':'', 'f':'', 'g':'', 'h':'', 'j':'', 'k':'', 'l':'', ';':'',
                        'z':'', 'x':'', 'c':'', 'v':'', 'b':'', 'n':'', 'm':'', ',':'', '.':'', '/':''},
      track: [],
      layers: [],
      currLayer: [],
      recording:  false,
      startRecordTime: null
    };
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.playbackLayer = this.playbackLayer.bind(this);
    this.playTrack = this.playTrack.bind(this);
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
    if (e.keyCode == 32) {
      this.state.startRecordTime = new Date();
      this.state.recording  = true;
      this.setState(this.state);
      return;
    }

    if (e.keyCode == 13) {
      this.state.recording = false;
      this.state.layers.push(this.state.currLayer);
      this.state.currLayer = [];
      this.setState(this.state);
      return;
    }
    
    if (this.state.recording) {
      var currTime = new Date();
      var elapsedTime = currTime - this.state.startRecordTime;
      this.state.currLayer.push([elapsedTime, e.key]);
      this.state.track.push([elapsedTime, e.key]);
    }

    this.state.mapLabelToColor[e.key] = '#F5EEF8';
    this.setState(this.state);
    Audio.woah(e.key);
    //Audio.wow(e.key);
  }

  handleKeyUp (e) {
    this.state.mapLabelToColor[e.key] = "";
    this.setState(this.state);
  }

  playbackLayer(i) {
    Audio.roof(this.state.layers[i]);
  }

  playTrack() {
    Audio.roof(this.state.track);
  }

  render() {
    const r1Labels = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'];
    const r1ButtonList = r1Labels.map((label) => 
      <SoundButton label={label} color={this.state.mapLabelToColor[label]}/>
    );
    
    const r2Labels = ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';'];
    const r2Buttonlist = r2Labels.map((label) => 
      <SoundButton label={label} color={this.state.mapLabelToColor[label]}/>
    );
    
    const r3Labels = ['z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/'];
    const r3ButtonList = r3Labels.map((label) => 
      <SoundButton label={label} color={this.state.mapLabelToColor[label]}/>
    );

    const layers = this.state.layers.map((l, i) => <LayerButton playbackLayer={this.playbackLayer} layerIndex={i}/>);
    return(
      <div>
        <div>{r1ButtonList}</div>
        <div style={{transform:"translateX(10px)"}}>{r2Buttonlist}</div>
        <div style={{transform:"translateX(30px)"}}>{r3ButtonList}</div>
        <div>{layers}</div>
        <div><PlayTrackButton playTrack={this.playTrack}/></div>
      </div>
    );
  }
}

ReactDOM.render(<BeatPad />, document.getElementById('app'));
