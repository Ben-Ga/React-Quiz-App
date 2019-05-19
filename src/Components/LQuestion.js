import React, { Component } from 'react'

import '../Styles/question.css'

var questions = [
    "Word for Hello?",
    "Sensei would be used to describe your?",
    "Word for 1 is?",
    "Phrase 'eight seconds have passed' is?"
 ]

 var answers = [
   "Ohayo",
   "Teacher/Master",
   "ichi",
   "hachi-Byo tachimashita"
 ]

export class LQuestion extends Component {

    constructor(props){
        super(props);

        this.state = {
            min: 0,
            max: 3,
            qBank: questions,
            aBank: answers,
            option1: null,
            option2: null,
            option3: null,
            chosenQuestion: null,
            test: 5,

        }
    }

    componentDidMount(){
      this.getQuestion()
    }


    genNumber = (min, max) => {
        return Math.floor(Math.random()*(min,max+1)+min)
    }

    getQuestion = () => {
      this.setState({
        chosenQuestion: this.state.qBank[this.genNumber(this.state.min, this.state.max)]
      })
    }

  render() {
    return (
      <div>
        <p>{this.state.chosenQuestion}</p>
        <input type="radio" />{this.state.option1}
        <input type="radio" />{this.state.option2}
        <input type="radio" />{this.state.option3}
      </div>
    )
  }
}

export default LQuestion
