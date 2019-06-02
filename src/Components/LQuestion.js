import React, { Component } from 'react'

import '../Styles/question.css'

let fillerCount = 0;
let picked = [];
let randChoice = null;
let found = false;
let randomised = false;
let FILLER_LOWER_BOUND = 1
let FILLER_UPPER_BOUND = 10

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

    componentDidUpdate(){
      console.log("Components did update has been called")
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

    genAnsPlaceholder = () =>{
      return Math.floor(Math.random() * (1, 4)+ 1)//Gen a number for which of the options slots will hold the answer 
    }

    renderFiller = ({FillerID, filloption}) => {
      if(!randomised){
        randChoice = this.genNumber(FILLER_LOWER_BOUND, FILLER_UPPER_BOUND)  /*Add something here so that the rand is only changed once for each of the cycles through options */
        randomised = true;

      }
      console.log("Rand = " + randChoice + "  FillerID:   " + FillerID )
      if(FillerID === (FILLER_UPPER_BOUND + 1)){
        if(found){ {/*If a match has already been made, reset and move on to the next one */}
          found = false
          randomised = false;
          return 
        }else{ {/*If a match has not already been found, it must be the last so reset for that and dont return yet */}
          found = false
        }
        console.log("Found being reset")
      }
      for(let i = 0; i < picked.length; i++){
        if(randChoice === picked[i] && found !== true){
          console.log(FillerID + " has already been found before")
          randChoice = this.genNumber(FILLER_LOWER_BOUND, FILLER_UPPER_BOUND);
          console.log("Generating a new random filler " + randChoice)
        }
      }
      if(FillerID === randChoice && found !== true){ {/*This means that only 1 filler displayed for each  */}
        console.log(randChoice + " is equal to " + FillerID)
        picked.push(randChoice) /*Add the element to a list so it wont be picked again */
        console.log("Adding element to picked " + picked)
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
      </div>
    )
  }
}

export default LQuestion
