import React from 'react';
import ReactDOM from 'react-dom';

class Button extends React.Component {
   constructor(props) {
    super(props);
    this.state = {isToggleOn: true};

    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(prevState => ({
      isToggleOn: !prevState.isToggleOn
    }));
  }

  // TODO: space betwen buttons, maybe refactor the divs
  render() {
    var r1SoundLabels = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'];
    var r1SoundsList = [r1SoundLabels.map((key, i) => <button style={{width:'9%',paddingBottom:'6%'}} onClick={this.handleClick}>{key}</button>)];
    
    var r2SoundLabels = ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';'];
    var r2SoundsList = [r2SoundLabels.map((key, i) => <button style={{width:'9%',paddingBottom:'6%'}} onClick={this.handleClick}>{key}</button>)];
    
    var r3SoundLabels = ['z', 'x', 'c', 'v', 'b', 'n', 'm', '<', '>', '?'];
    var r3SoundsList = [r3SoundLabels.map((key, i) => <button style={{width:'9%',paddingBottom:'6%'}} onClick={this.handleClick}>{key}</button>)];

    return (
      <div>
        <div>{r1SoundsList}</div>
        <div style={{transform:'translateX(10px)'}}>{r2SoundsList}</div>
        <div style={{transform:'translateX(30px)'}}>{r3SoundsList}</div>
      </div>
    );
  }
}

ReactDOM.render(<Button />, document.getElementById('app'));
