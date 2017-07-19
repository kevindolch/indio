import React, { Component } from 'react';


class Export extends Component {
  constructor(props) {
    super(props);
  }
  componentWillReceiveProps(props) {
    this.forceUpdate();
  }

  render(){
    debugger;
    return(
      <div>
      <textarea className="json-display" readOnly="true" value={JSON.stringify(this.props.form)} />
      </div>
    );
  }
}

export default Export;
