import React, { Component } from 'react';

class Metronome extends Component {
  constructor(props) {
    super(props);

    this.state = {
      playingMetronome: false,
      count: 0,
      bpm: 100,
      beatsPerMeasure: 4
    };

    // Create Audio objects with the files Webpack loaded,
    // and we'll play them later.
    this.click1 = new Audio('/assets/click1.wav');
    this.click2 = new Audio('/assets/click2.wav');
  }

  playClick = () => {
    const { count, beatsPerMeasure } = this.state;

    // The first beat will have a different sound than the others
    if(count % beatsPerMeasure === 0) {
      this.click2.play();
    } else {
      this.click1.play();
    }

    // Keep track of which beat we're on
    this.setState(state => ({
      count: (state.count + 1) % state.beatsPerMeasure
    }));
  }

  startStop = () => {
    if(this.state.playingMetronome) {
      // Stop the timer
      clearInterval(this.timer);
      this.setState({
        playingMetronome: false
      });
    } else {
      // Start a timer with the current BPM
      this.timer = setInterval(this.playClick, (60 / this.state.bpm) * 1000);
      this.setState({
        count: 0,
        playingMetronome: true
        // Play a click "immediately" (after setState finishes)
      }, this.playClick);
    }
  }

  handleBpmChange = event => {
    const bpm = event.target.value;

    if(this.state.playingMetronome) {
      // Stop the old timer and start a new one
      clearInterval(this.timer);
      this.timer = setInterval(this.playClick, (60 / bpm) * 1000);

      // Set the new BPM, and reset the beat counter
      this.setState({
        count: 0,
        bpm
      });
    } else {
      // Otherwise just update the BPM
      this.setState({ bpm });
    }
    this.props.setBPM(bpm);
  }

  render() {
    const { playingMetronome, bpm } = this.state;
    return (
      <div style={{display:'inline-block',float:'right'}}>
        <button style={{display:'inline-block',width:'65px',height:'14px'}} onMouseDown={this.startStop}>{bpm} bpm</button>
        <input style={{display:'inline-block',width:'70px'}} type="range" min="60" max="240" value={bpm} onChange={this.handleBpmChange} />
      </div>
    );
  }
}

export default Metronome;
