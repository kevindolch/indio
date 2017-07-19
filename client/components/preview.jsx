import React, { Component } from 'react';


class Preview extends Component {
  constructor(props) {
    super(props);
  }

  subDisplay(input){
    // var subQuestions = input.subs.map(function(sub, idx){
    //   if (input.type === "number"){
    //     if(sub.conditionType === "greater than" && sub.condition === ""){
    //
    //     }
    //   }
    // });
  }

  render(){
    var that = this;
    var questions = this.props.form.inputs.map(function(input, idx){
      return(
        <div>
          <div>
            {input.question}
          </div>
          {input.type==="yes/no" ? <div><input type="radio" name="yes/no" value="Yes"/>Yes
                                   <input type="radio" name="yes/no" value="No"/>No</div>
                                  : <input type="text" />}
          {that.subDisplay(input)}
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
