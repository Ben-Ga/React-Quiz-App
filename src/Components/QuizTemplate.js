import React, {Component} from 'react'

import '../Styles/LetterQuiz.css'

export class QuizTemplate extends Component {
    render(){
        return (
            <div>
                <h2>Words Quiz</h2>
                <div id="lettercontainer">
                    {this.props.children}
                </div>
            </div>
        )
    }
}


export default QuizTemplate