import React, { Component } from 'react';
import Create from '../create.jsx';
import Preview from '../preview.jsx';
import Export from '../export.jsx';

class IndexComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: 0,
    };
  }

  isActive(key) {
    return (key===this.state.active)
  }

  handleClick(key) {
    this.setState({active: key});

  }

  render() {
    var activeWindow;
    switch (this.state.active) {
      case 0:
        activeWindow = <Create />
        break;
      case 1:
        activeWindow = <Preview />
        break;
      case 2:
        activeWindow = <Export />
      }
    return (
      <div>
        <header>Form Builder</header>
        <div className="tabs">
          <div className={"tab " + this.isActive(0)}
               key={0}
               onClick={this.handleClick.bind(this, 0)}>
               Create
          </div>
          <div className={"tab " + this.isActive(1)}
               key={1}
               onClick={this.handleClick.bind(this, 1)}>
               Preview
          </div>
          <div className={"tab " + this.isActive(2)}
               key={2}
               onClick={this.handleClick.bind(this, 2)}>
               Export
          </div>
        </div>
        <div className="divide"/>
        {activeWindow}
      </div>
    );
  }
}

IndexComponent.defaultProps = {
  items: []
};

export default IndexComponent;
