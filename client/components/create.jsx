import React, { Component } from 'react';


class Create extends Component {

  constructor(props) {
    super(props);
  }

  subDisplay(location, keyArr) {
    var that = this;
    var subInput = location.subs.map(function(input, idx){
      var tempKeyArr = keyArr.slice();
      tempKeyArr.push(idx);
      return(
      <div className="child" key={idx}>
        <div className="sub-box" >
          <div className="condition-title">Condition</div>
          {location.type==="number" ?
            <select default="equals" className="condition-type" value={input.conditionType} onChange={that.handleInputChange.bind(that, tempKeyArr)}>
              <option value="equals">Equals</option>
              <option value="greater than">Greater Than</option>
              <option value="less than">Less Than</option>
            </select> :
            <select default="equals" className="condition-type">
              <option value="equals">Equals</option>
            </select>}
          {location.type==="yes/no" ?
          <select className="condition" default="yes" value={input.condition} onChange={that.handleInputChange.bind(that, tempKeyArr)}>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
          :<input
            value={input.condition}
            type="text"
            className="condition"
            onChange={that.handleInputChange.bind(that, tempKeyArr)}
          />}
          <div className="question-title">Question</div>
          <input
            value={input.question}
            type="text"
            className="question"
            onChange={that.handleInputChange.bind(that, tempKeyArr)}
          />
          <div className="type-title">Type</div>
          <select default="text" className="type" value={input.type} onChange={that.handleInputChange.bind(that, tempKeyArr)}>
            <option value="text">Text</option>
            <option value="number">Number</option>
            <option value="yes/no">Yes / No</option>
          </select>
          <div className="sub-button" onClick={that.handleAddSub.bind(that, tempKeyArr)}>
          Add Sub-Input
          </div>
          <div className="delete-button" onClick={that.handleDelete.bind(that, tempKeyArr)}>
          Delete
          </div>
        </div>
        {that.subDisplay(location.subs[idx], tempKeyArr)}
      </div>)});
    return subInput;
  }

  handleDelete(keyArr, e) {
    e.preventDefault();
    let newForm = Object.assign({}, this.props.form);
    if(keyArr.length === 1) {
      newForm.inputs.splice(keyArr[0], 1);
    }
    else {
      var location = newForm.inputs[keyArr[0]];
    var i = 1;
    while(i < keyArr.length-1) {
      location = location.subs[keyArr[i]];
      i += 1;
    }
    location.subs.splice(keyArr[i], 1);
  }
    this.props.update(newForm);
  }

  handleInputChange(keyArr, e) {
    e.preventDefault();
    let newForm = Object.assign({}, this.props.form);
    var location = newForm.inputs[keyArr[0]];
    var i = 1;
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
    else if(e.target.className==="condition-type") {
      location.conditionType = e.target.value;
    }
    else if(e.target.className==="condition") {
      location.condition = e.target.value;
    }
    this.props.update(newForm);
}

handleAddSub(keyArr, e){
    let newForm = Object.assign({}, this.props.form);
    var i = 1;
    var location = newForm.inputs[keyArr[0]];
    while(i < keyArr.length) {
      location = location.subs[keyArr[i]]
      i+=1;
    }
    var condition = location.type === "yes/no" ? "yes" : ""
    location.subs.push({conditionType: "equals", condition: condition, question: "", type: "text", show: false, subs: []})
    this.props.update(newForm);
  }

  handleAddInput(e){
    e.preventDefault();
    let newForm = Object.assign({}, this.props.form);
    var currentFormInputs = newForm.inputs;
    currentFormInputs.push({question: "", type: "text", subs: [], show: true});
    this.props.update(newForm);
  }

  componentWillReceiveProps(props){
    this.forceUpdate();
  }

  render(){
    var that = this;
    var form = this.props.form.inputs.map(function(input, idx){
      var keyArr = [];
      keyArr.push(idx);
      return(
      <div className="parent" key={idx}>
        <div className="input-box">
          <div className="question-title">Question</div>
          <input
            onChange={that.handleInputChange.bind(that, keyArr)}
            value={input.question}
            type="text"
            className="question"
          />
          <div className="type-title">Type</div>
          <select default="text" className="type" value={input.type} onChange={that.handleInputChange.bind(that, keyArr)}>
            <option value="text">Text</option>
            <option value="number">Number</option>
            <option value="yes/no">Yes / No</option>
          </select>
        <div>
          <div className="sub-button" onClick={that.handleAddSub.bind(that, keyArr)}>
          Add Sub-Input
          </div>
          <div className="delete-button" onClick={that.handleDelete.bind(that, keyArr)}>
          Delete
          </div>
        </div>
      </div>
        {that.subDisplay(that.props.form.inputs[idx], keyArr)}
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
