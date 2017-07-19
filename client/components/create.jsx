import React, { Component } from 'react';


class Create extends Component {

  constructor(props) {
    super(props);
    this.state = {
      inputjsx: [],
      form: {inputs: []},
    };
  }

  subDisplay(location, keyArr) {
    var that = this;
    var options;
    switch (location.type) {
      case "text":
      case "yes/no":
        options = <select default="equals" className="condition type">
                    <option value="equals">Equals</option>
                  </select>
        break;
      case "number":
        options = <select default="equals" className="condition type">
                    <option value="equals">Equals</option>
                    <option value="greater than">Greater Than</option>
                    <option value="less than">Less Than</option>
                  </select>
        break;
      }
    var subInput = location.subs.map(function(input, idx){
      var tempKeyArr = keyArr.slice();
      tempKeyArr.push(idx);
      return(
      <div className="child" key={idx}>
        <div onChange={that.handleInputChange.bind(that, tempKeyArr)}>
          <div>Condition</div>
          {options}
          <input
            type="text"
            className="condition"
          />
          <div>Question</div>
          <input
            type="text"
            className="question"
          />
          <div>Type</div>
          <select default="text" className="type">
            <option value="text">Text</option>
            <option value="number">Number</option>
            <option value="yes/no">Yes / No</option>
          </select>

        </div>
        <div className="sub-button" onClick={that.handleAddSub.bind(that, tempKeyArr)}>
        Add Sub-Input
        </div>
        {that.subDisplay(location.subs[idx], tempKeyArr)}
      </div>)});
    return subInput;
  }

  handleInputChange(keyArr, e) {
    e.preventDefault();
    debugger;
    let newForm = Object.assign({}, this.state.form);
    var location = newForm.inputs[keyArr[0]]
    var i = 1
      while(i < keyArr.length) {
        location = location.subs[keyArr[i]];
        i += 1;
      }
    if(e.target.className==="question"){
      location.question = e.target.value;
    }
    else if(e.target.className==="type"){
      location.type = e.target.value;
    }
    else if(e.target.className==="condition type") {
      location.conditionType = e.target.value;
    }
    else if(e.target.className==="condition") {
      location.condition = e.target.value;
    }
    this.setState({form: newForm});
}

handleAddSub(keyArr, e){
    let newForm = Object.assign({}, this.state.form);
    var i = 1;
    var location = newForm.inputs[keyArr[0]];
    while(i < keyArr.length) {
      location = location.subs[keyArr[i]]
      i+=1;
    }
    location.subs.push({conditionType: "equals", condition: "", question: "", type: "text", subs: []})
    this.setState({ form: newForm });
  }

  handleAddInput(e){
    e.preventDefault();
    var currentFormInputs = this.state.form.inputs;
    currentFormInputs.push({question: "", type: "text", subs: []});
    this.setState({ form: {inputs: currentFormInputs}});
  }

  render(){
    var that = this;
    var form = this.state.form.inputs.map(function(input, idx){
      var keyArr = [];
      keyArr.push(idx);
      return(
      <div className="parent" key={idx}>
        <div onChange={that.handleInputChange.bind(that, keyArr)}>
          <div>Question</div>
          <input
            type="text"
            className="question"
          />
          <div>Type</div>
          <select default="text" className="type">
            <option value="text">Text</option>
            <option value="number">Number</option>
            <option value="yes/no">Yes / No</option>
          </select>

        </div>
        <div className="sub-button" onClick={that.handleAddSub.bind(that, keyArr)}>
        Add Sub-Input
        </div>
        {that.subDisplay(that.state.form.inputs[idx], keyArr)}
      </div>)});
    return(
      <div>
       {form}
        <div className="input-button" onClick={this.handleAddInput.bind(this)}>
          Add Input
        </div>
      </div>
    );
  }
}

export default Create;
