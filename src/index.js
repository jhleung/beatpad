import React from 'react';
import ReactDOM from 'react-dom';
import * as Audio from './audio.js';
import Metronome from './Metronome';

class Unit extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    // TODO: refactor this absolute monster into an external css/css module if im feeling real cool
    var percentage = (this.props.elapsedTime*(this.props.bpm/60.0)*100)/(1000 * this.props.bars * 4);
    return(
      <button style={{position:'absolute',height:'4%',padding:'0.5px',marginLeft:percentage+'%'}} disabled></button>
    )
  }
}

// TODO: move child components to another file?
class PlayTrackButton extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <button style={{backgroundColor:this.props.color}} disabled></button>
    );
  }
}


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

// TODO: honestly this just looks wrong. im not doing react correctly arent i
class BeatPad extends React.Component {
  constructor(props) {
    super(props);
    // essentially using state as global variables, not sure how "React" this code is apparently this is redux so this is fine
    this.state = {
      mapLabelToColor: {'1':'', '2':'', '3':'', '4':'', '5':'', '6':'', '7':'', '8':'', '9':'', '0':'',
                        'q':'', 'w':'', 'e':'', 'r':'', 't':'', 'y':'', 'u':'', 'i':'', 'o':'', 'p':'',
                        'a':'', 's':'', 'd':'', 'f':'', 'g':'', 'h':'', 'j':'', 'k':'', 'l':'', ';':'',
                        'z':'', 'x':'', 'c':'', 'v':'', 'b':'', 'n':'', 'm':'', ',':'', '.':'', '/':''},
      track: [],
      layers: [],
      currLayer: [],
      numLayers: 0,
      recording:  false,
      playing: 'green',
      startRecordTime: null,
      sources: [],
      bpm: 100,
      bars: 4
    };
    // TODO: actually not sure if i need to bind all these
    this.startRecord = this.startRecord.bind(this);
    this.stopRecord = this.stopRecord.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.liveLoop = this.liveLoop.bind(this);
    this.playTrack = this.playTrack.bind(this);
    this.stopTrack = this.stopTrack.bind(this);
    this.trackLength = this.trackLength.bind(this);
    this.setBPM = this.setBPM.bind(this);
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
    var keyCode = e.keyCode;
    var key = e.key; 
    if (keyCode >= 48 && keyCode <=57) {
      this.liveLoop(key, keyCode);
      return;
    }

    if (keyCode == 32) {
      this.state.recording ? this.stopRecord() : this.startRecord();
      this.setState(this.state);
      return;
    }

    if (keyCode == 13) {
      this.state.playing == 'red' ? this.stopTrack() : this.playTrack();
      return;
    }

    if (this.state.recording) {
      var currTime = new Date();
      var elapsedTime = currTime - this.state.startRecordTime;
      this.state.currLayer.push([elapsedTime, key]);
      this.state.layers[this.state.numLayers] = this.state.currLayer;
      this.state.track.push([elapsedTime, key]);
    }

    this.state.mapLabelToColor[key] = '#F5EEF8';
    this.setState(this.state);
    Audio.wow(key);
  }

  stopRecord() {
    this.state.recording = false;
    this.state.layers[this.state.numLayers] = this.state.currLayer;
    this.state.numLayers++;
    this.state.currLayer = [];
  }

  startRecord() {
    this.state.recording = true;
    this.state.startRecordTime = new Date();
  }

  handleKeyUp (e) {
    var key = e.key;
    this.state.mapLabelToColor[key] = "";
    this.setState(this.state);
  }

  liveLoop(key, keyCode) {
    this.state.mapLabelToColor[key] = 'green';
    this.setState(this.state);
    var key = parseInt(String.fromCharCode(keyCode));
    var index = keyCode > 48 ? key - 1 : key; 
    Audio.playback(this.state.layers[index]);
  }


  playTrack() {
    this.state.playing = 'red';
    this.state.sources = Audio.playback(this.state.track);
    var trackLength = this.trackLength();
    this.setState(this.state);
    // TODO: maybe figure out how to loop instead of stop, this would require more...thinking, a resource i am low on
    setTimeout(function(){this.stopTrack()}.bind(this), trackLength + 1000);
  }

  stopTrack() {
    this.state.playing = 'green';
    this.state.sources.map((source) => source.then(src=>src.stop()));
    this.state.sources = [];
    this.setState(this.state);
  }

  trackLength() {
    var max = 0;
    this.state.track.map((sound) =>
      max = sound[0] > max ? sound[0] : max
    );
    return max;
  }

  setBPM(bpm) {
    this.state.bpm = bpm;
    this.setState(this.state);
  }

  render() {
    const r0Labels = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
    const r0ButtonList = r0Labels.map((label) => 
      <Button label={label} color={this.state.mapLabelToColor[label]}/>
    );
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
    
    const unitsList = this.state.layers.map((layer, i) =>
      {
        var layer = layer.map((unit) =>
          <Unit elapsedTime={unit[0]} bpm={this.state.bpm} bars={this.state.bars}/>
        );
        return (<div>{layer}<br /></div>);
      }
    );
    
    const graph = [];
    for (var i = 1; i <= this.state.bars * 4; i++) {
      graph.push(<div style={{width:'1px',backgroundColor:'#ECF1F5',position:'absolute',top:'48.5%',bottom:'0',left:(i*100)/(this.state.bars*4)+'%'}}></div>)
    }
    return(
      <div>
        <div style={{transform:"translateX(30px)"}}>{r1ButtonList}</div>
        <div style={{transform:"translateX(40px)"}}>{r2Buttonlist}</div>
        <div style={{transform:"translateX(70px)"}}>{r3ButtonList}</div>
        <div style={{display:'inline-block'}}><PlayTrackButton color={this.state.playing}/></div><Metronome setBPM={this.setBPM}/>
        <div style={{width:'100%'}}>{graph}</div>
        <div style={{width:'100%'}}>{unitsList}</div>
      </div>
    );
  }
}

ReactDOM.render(<BeatPad />, document.getElementById('app'));
