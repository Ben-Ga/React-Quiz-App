import React from 'react'

import {Link} from 'react-router-dom'

import letterImg from '../Resources/letters.jpg'
import '../Styles/LetterLink.css'

export default function LettersLink() {
  return (
    <div id="letterSection">
      <h3 id="letter_title">Play Words Quiz</h3>
      <Link to="../letters">
        <img alt="alphabet" src={letterImg} id="letterIMG"/>
      </Link>
    </div>
  )
}
