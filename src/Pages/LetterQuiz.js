import React, { Component } from 'react'

import Quiz from '../Components/QuizTemplate'
import LQuestion from '../Components/LQuestion.js'

export class LetterQuiz extends Component {

  constructor(props){
    super(props);

    this.state = {

    }
  }

  render() {
    return (
      <div>
        <Quiz>
          <LQuestion/>
        </Quiz>
      </div>
    )
  }
}

export default LetterQuiz


