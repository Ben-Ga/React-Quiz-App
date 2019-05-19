import React, { Component } from 'react'

import '../Styles/NumQuiz.css'

const correct = <p><span style={{color: 'green'}}><b>Correct</b></span></p>
const incorrect = <p><span style={{color: 'red'}}><b>Incorrect</b></span></p>

export class NumberQuiz extends Component {
  constructor(props){
    super(props);

    this.state = {
      pickMin: 1,
      pickMax: 3,
      choosenOption: null,
      min: 2,
      max: 150,
      number1: null,
      number2: null,
      option1: null,
      option2: null,
      option3: null,
      answer: null,
      selected: false,
      outcome: null
    }
  }

  componentDidMount(){
    this.setState({
      choosenOption: this.chooseOption(this.state.pickMin, this.state.pickMax),
      number1: this.generateNums(this.state.min,this.state.max),
      number2: this.generateNums(this.state.min, this.state.max),
      answer: null,
      outcome: null,
      selected: false
    })
    console.log("Num 1 " + this.state.number1 + " Num 2 " + this.state.number2)
    if(this.state.choosenOption === 1){
      console.log("In 1")
      this.setState({
        option1: this.state.number1 + this.state.number2,
        option2: this.generateNums(this.state.min, this.state.max),
        option3:this.generateNums(this.state.min,this.state.max),

      })
    }else if(this.state.choosenOption === 2){
      console.log("In 2")
      this.setState({
        option1: this.generateNums(this.state.min,this.state.max),
        option2: this.state.number1 + this.state.number2,
        option3:this.generateNums(this.state.min,this.state.max),
      })
    }else {
      console.log("In 3")
      this.setState({
        option1: this.generateNums(this.state.min,this.state.max),
        option2: this.generateNums(this.state.min,this.state.max),
        option3: this.state.number1 + this.state.number2,
      })
    }
  }

  chooseOption = (pickMin, pickMax) =>{
    return Math.floor(Math.random()*(pickMax-pickMin+1)+pickMin)
  }

  generateNums = (min, max) =>{
    return Math.floor(Math.random()*(max-min+1)+min)
  }

  getAnswer = () => {
    this.setState({
      answer: this.state.number1 + this.state.number2
    })
    if(this.state.selected === false){
      this.setState({
        outcome: incorrect
      })
    }else{
      this.setState({
        outcome: correct
      })
    }
  }

  checkAns = () =>{
    this.setState({
      selected: true 
    })
  }

  getNext = () =>{
    this.componentDidMount()
  }
  
  render() {
    return (
      <div id="container">
        <div id="question">
          <p>What is {this.state.number1} + {this.state.number2}</p>

          <input type="radio" value={this.state.option1}
          name="option" onChange={this.checkAns}
          />{this.state.option1}

          <input type="radio" value={this.state.option2}
          name="option" />{this.state.option2}

          <input type="radio" value={this.state.option3}
          name="option" />{this.state.option3}<p></p>

          <button id="submit_button" type="submit" 
          onClick={this.getAnswer}>Check Answer</button>
  
          <p id="answer">Answer: {this.state.answer} {this.state.outcome}</p>
        </div>
        <div>
          <button id="nxt_q" type="submit" onClick={this.getNext}>Next Question</button>
        </div>
      </div>
    )
  }
}

export default NumberQuiz
