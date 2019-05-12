import React, { Component } from 'react'

import '../Styles/NumQuiz.css'

const correct = <p><span style={{color: 'green'}}>Correct</span></p>
const incorrect = <p><span style={{color: 'red'}}>Incorrect</span></p>

export class NumberQuiz extends Component {
  constructor(props){
    super(props);

    this.state = {
      min: 2,
      max: 150,
      number1: null,
      number2: null,
      option2: null,
      answer: null,
      selected: false,
      outcome: null
    }
  }

  componentDidMount(){
    this.setState({
      number1: this.generateNums(this.state.min,this.state.max),
      number2: this.generateNums(this.state.min, this.state.max),
      option2: this.generateNums(this.state.min, this.state.max)
    })
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
  
  render() {
    return (
      <div>
        <p>What is {this.state.number1} + {this.state.number2}</p>
        <input type="radio" value={this.state.number1 + this.state.number2}
         name="5+5" onChange={this.checkAns}/>{this.state.number1 + this.state.number2}

        <input type="radio" value={this.state.option2}
         name="5+5" />{this.state.option2}<p></p>

        <button type="submit" onClick={this.getAnswer}>Submit</button>

        <p id="answer">Answer: {this.state.answer} {this.state.outcome}</p>
      </div>
    )
  }
}

export default NumberQuiz
