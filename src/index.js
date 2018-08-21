import React from 'react';
import ReactDOM from 'react-dom';

class Button extends React.Component {
  render() {
    return (
      <div>
        <div>
          <button style={{width:'9%',paddingBottom:'9%'}}></button>
          <button style={{width:'9%',paddingBottom:'9%'}}></button>
          <button style={{width:'9%',paddingBottom:'9%'}}></button>
          <button style={{width:'9%',paddingBottom:'9%'}}></button>
          <button style={{width:'9%',paddingBottom:'9%'}}></button>
          <button style={{width:'9%',paddingBottom:'9%'}}></button>
          <button style={{width:'9%',paddingBottom:'9%'}}></button>
          <button style={{width:'9%',paddingBottom:'9%'}}></button>
          <button style={{width:'9%',paddingBottom:'9%'}}></button>
          <button style={{width:'9%',paddingBottom:'9%'}}></button>
        </div>
        <div style={{transform: 'translateX(10px)'}}>
          <button style={{width:'9%',paddingBottom:'9%'}}></button>
          <button style={{width:'9%',paddingBottom:'9%'}}></button>
          <button style={{width:'9%',paddingBottom:'9%'}}></button>
          <button style={{width:'9%',paddingBottom:'9%'}}></button>
          <button style={{width:'9%',paddingBottom:'9%'}}></button>
          <button style={{width:'9%',paddingBottom:'9%'}}></button>
          <button style={{width:'9%',paddingBottom:'9%'}}></button>
          <button style={{width:'9%',paddingBottom:'9%'}}></button>
          <button style={{width:'9%',paddingBottom:'9%'}}></button>
          <button style={{width:'9%',paddingBottom:'9%'}}></button>
        </div>
        <div style={{transform: 'translateX(30px)'}}>
          <button style={{width:'9%',paddingBottom:'9%'}}></button>
          <button style={{width:'9%',paddingBottom:'9%'}}></button>
          <button style={{width:'9%',paddingBottom:'9%'}}></button>
          <button style={{width:'9%',paddingBottom:'9%'}}></button>
          <button style={{width:'9%',paddingBottom:'9%'}}></button>
          <button style={{width:'9%',paddingBottom:'9%'}}></button>
          <button style={{width:'9%',paddingBottom:'9%'}}></button>
          <button style={{width:'9%',paddingBottom:'9%'}}></button>
          <button style={{width:'9%',paddingBottom:'9%'}}></button>
          <button style={{width:'9%',paddingBottom:'9%'}}></button>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<Button />, document.getElementById('app'));
