import React, { Component } from 'react'

import '../Styles/question.css'


export class LQuestion extends Component {

    constructor(props){
        super(props);

        this.state = {
            min: 1,
            max: 3,
            qBank: [],
            aBank: [],
            option1: null,
            option2: null,
            option3: null,
            chosenQuestion: null,
            rand: null,

        }
    }

    componentDidMount(){
      this.fetchQuestions()
      this.setState({
        rand: this.genNumber(this.state.min, this.state.max)
      })
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
        // .then(({ data }) => {
        //   console.log(data)
        // })
        .catch(err => console.error(err))
    } 

    renderQuestion = ({QuestionID, question}) => <div key={QuestionID}>{question}</div> 

    renderRandom = ({QuestionID, question}) => {
      if(QuestionID === this.state.rand){
        return(
          <div key={QuestionID}>{question}</div>
        )
      }else{

      }

  }



  render() {
    return (
      <div>
        {this.state.qBank.map(this.renderRandom)}
        <input type="radio" />{this.state.option1}
        <input type="radio" />{this.state.option2}
        <input type="radio" />{this.state.option3}
      </div>
    )
  }
}

export default LQuestion
