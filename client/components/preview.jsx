import React, { Component } from 'react';


class Preview extends Component {
  constructor(props) {
    super(props);
  }

  subDisplay(input, keyArr){
    var that = this;
    var subQuestions = input.subs.map(function(sub, idx){
    var question = "NO QUESTION ENTERED"
    if (/\S/.test(sub.question)) {
      question = sub.question;
    }
    var tempKeyArr = keyArr.slice();
      tempKeyArr.push(idx);
      if (sub.show === true) {
        return(<div key={idx} className="question-display">
          <div>
            {question}
          </div>

          {sub.type==="yes/no" ? <select className="answer" onChange={that.testConditions.bind(that, tempKeyArr)}>
                      <option value="...">...</option>
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                      </select>
                      : <input type="text" className="answer" onChange={that.testConditions.bind(that, tempKeyArr)} />}
          {that.subDisplay(sub, tempKeyArr)}
        </div>)
      }
    });
    return subQuestions;
  }

  testConditions(keyArr, e) {
    e.preventDefault();
    let newForm = Object.assign({}, this.props.form);
    var location = newForm.inputs[keyArr[0]];
    var i = 1;
    while(i < keyArr.length) {
      location = location.subs[keyArr[i]];
      i += 1;
    }
    var j = 0;
    while (j<location.subs.length) {
      var subInput = location.subs[j];
      if (location.type === "number"){
        if(subInput.conditionType === "equals" && parseInt(e.target.value) === parseInt(subInput.condition)) {
          subInput.show = true;
        }
        else if(subInput.conditionType === "greater than" && parseInt(e.target.value) > parseInt(subInput.condition)) {
          subInput.show = true;
        }
        else if(subInput.conditionType === "less than" && parseInt(e.target.value) < parseInt(subInput.condition)) {
          subInput.show = true;
        }
        else{
          subInput.show = false;
        }
      }
      else {
        if (e.target.value === subInput.condition) {
          subInput.show = true;
        }
        else{
          subInput.show = false;
        }
      }
      j += 1;
    }
    this.props.update(newForm);

  }

  resetShow(input) {
    var j = 0;
    while(j<input.subs.length){
      input.subs[j].show = false;
      this.resetShow(input.subs[j]);
      j+=1
    }
  }

  componentWillUnmount(){
    let newForm = Object.assign({}, this.props.form)
    var i = 0;
    while(i<newForm.inputs.length) {
      this.resetShow(newForm.inputs[i]);
      i+=1;
    }
    this.props.update(newForm)
  }

  componentWillReceiveProps(props){
    this.forceUpdate();
  }

  render(){
    var that = this;

    var questions = this.props.form.inputs.map(function(input, idx){
      var question = "NO QUESTION ENTERED"
      if (/\S/.test(input.question)) {
        question = input.question;
      }
      var keyArr = [];
      keyArr.push(idx);
      var answerType =
      input.type==="yes/no" ?
      <select className="answer" onChange={that.testConditions.bind(that, keyArr)}>
                  <option value="...">...</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
      </select>
        :
        <input type="text" className="answer" onChange={that.testConditions.bind(that, keyArr)}/>;
      return(
        <div key={idx} className="question-display">
          <div>
            {question}
          </div>
            {answerType}
          {that.subDisplay(input, keyArr)}
        </div>
      )
    });
    return(
      <div>
      {questions}
      </div>
    );
  }
}

export default Preview;
