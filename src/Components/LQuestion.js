import React, { Component } from 'react'

import '../Styles/question.css'

let fillerCount = 0;
let randChoice = null;
let FILLER_LOWER_BOUND = 1
let FILLER_UPPER_BOUND = 4

export class LQuestion extends Component {

    constructor(props){
        super(props);

        this.state = {
            min: 1,
            max: 3,
            qBank: [],
            aBank: [],
            fBank: [],
            option1: null,
            option2: null,
            option3: null,
            chosenQuestion: null,
            rand: 2,
        }
    }


    componentDidMount(){
      this.fetchQuestions()
      this.setState({
        rand: this.genNumber(this.state.min, this.state.max)
      })
      this.fetchFiller()
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

    renderQuestion = ({QuestionID, question}) => <div key={QuestionID}>{question}</div> 


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
        return(
          <div key={QuestionID}>{question}</div>
        )
      }else{

      }
    }

    renderFiller = ({FillerID, filloption}) => {
      console.log("RandCHoice in method = " + randChoice)
      randChoice = this.genNumber(FILLER_LOWER_BOUND, FILLER_UPPER_BOUND)
      if(FillerID === randChoice){
        console.log(randChoice + " is equal to " + FillerID)
        return(
          <div key={FillerID}>{filloption}</div>
        )
      }else{
      }
    }




  render() {
    return (
      <div>
        {this.state.qBank.map(this.renderRandom)}
        <input type="radio" />{this.state.fBank.map(this.renderFiller)}
        <input type="radio" />{this.state.fBank.map(this.renderFiller)}
        <input type="radio" />{this.state.fBank.map(this.renderFiller)}
      </div>
    )
  }
}

export default LQuestion
