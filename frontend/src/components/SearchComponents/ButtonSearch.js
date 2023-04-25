import React from 'react';

class ButtonSearch extends React.Component {
    constructor() {
      super();
      this.state = {
        darkBtn: "btn1"
      };
    }
  
    changeColor = (btn) => {
      this.setState({ darkBtn: btn });
    };
  
    addDarkClass = (btn) => {
      if (this.state.darkBtn === btn) return "blackButton";
      else return "whiteButton";
    };
  }
  
export default ButtonSearch;
  