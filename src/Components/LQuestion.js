import React, { Component } from 'react'

import '../Styles/question.css'

let fillerCount = 0;
let picked = [];
let randChoice = null;
let found = false;
let randomised = false;
let FILLER_LOWER_BOUND = 1
let FILLER_UPPER_BOUND = 10
let chosenQuestion = null;

export class LQuestion extends Component {

    constructor(props){
        super(props);

        this.state = {
            min: 1,
            max: 3,
            qBank: [],
            aBank: [],
            fBank: [],
            rand: 2,
        }
    }


    componentDidMount(){
      this.fetchQuestions()
      this.setState({
        rand: this.genNumber(this.state.min, this.state.max)
      })
      this.fetchFiller()
      this.fetchAnswers()
    }


    genNumber = (min, max) => {
        return Math.floor(Math.random()*(min,max+1)+min)
    }


    fetchQuestions = () =>{
      fetch('http://localhost:4000/list')
        .then(response => response.json())
        .then(response => this.setState({
          qBank: response.data
        }))
        .catch(err => console.error(err))
    } 

    fetchAnswers = () =>{
      fetch('http://localhost:4000/answers')
      .then(response => response.json())
      .then(response => this.setState({
        aBank : response.data 
      }))
      .catch(err => console.log(err))
    }

    renderQuestion = ({QuestionID, question}) => <div key={QuestionID}>{question}</div> 

    renderAnswer = ({AnswerID, answer}) => {
      if(AnswerID === chosenQuestion){
        return(
          <p key={AnswerID}>{answer}</p>
        )
      }
    }


    fetchFiller = ()  =>{
      fetch('http://localhost:4000/filler')
        .then(response => response.json())
        .then(response => this.setState({
          fBank: response.data
        }))
        .catch(err => console.error(err))
    }

    renderRandom = ({QuestionID, question}) => {
      if(QuestionID === this.state.rand){
        chosenQuestion = QuestionID
        return(
          <div key={QuestionID}>{question}</div>
        )
      }else{

      }
    }

    genAnsPlaceholder = () =>{
      return Math.floor(Math.random() * (1, 4)+ 1)//Gen a number for which of the options slots will hold the answer 
    }

    renderFiller = ({FillerID, filloption}) => {
      if(!randomised){
        randChoice = this.genNumber(FILLER_LOWER_BOUND, FILLER_UPPER_BOUND)  /*Add something here so that the rand is only changed once for each of the cycles through options */
        randomised = true;

      }
      if(FillerID === (FILLER_UPPER_BOUND + 1)){
        if(found){ {/*If a match has already been made, reset and move on to the next one */}
          found = false
          randomised = false;
          return 
        }else{ {/*If a match has not already been found, it must be the last so reset for that and dont return yet */}
          found = false
        }
      }
      for(let i = 0; i < picked.length; i++){
        if(randChoice === picked[i] && found !== true){
          randChoice = this.genNumber(FILLER_LOWER_BOUND, FILLER_UPPER_BOUND);
        }
      }
      if(FillerID === randChoice && found !== true){ {/*This means that only 1 filler displayed for each  */}
        picked.push(randChoice) /*Add the element to a list so it wont be picked again */
        found = true
        if(FillerID == (FILLER_UPPER_BOUND + 1)){
          found = false; {/*This will occur if no match is found before the last element  */}
          randomised = false;
        }
        return(
          <div key={FillerID}>{filloption}</div>
        )
      }
    }


  render() {
    return (
      <div>
        {this.state.qBank.map(this.renderRandom)}
        <input type="radio" />{this.state.fBank.map(this.renderFiller)}
        <input type="radio" />{this.state.fBank.map(this.renderFiller)}
        <input type="radio" />{this.state.fBank.map(this.renderFiller)}
        <div>{this.state.aBank.map(this.renderAnswer)}</div>
        {console.log(this.state.aBank)}
      </div>
    )
  }
}

export default LQuestion
