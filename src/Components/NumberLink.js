import React from 'react'

import numberIMG from '../Resources/numbers.jpg'
import '../Styles/NumberLink.css'

import {Link} from 'react-router-dom'

export default function NumberLink() {
  return (
    <div id="numberSection">
      <h3 id="number_title">Play Numbers Quiz</h3>
      <Link to="/numbers">
        <img alt="numbers" src={numberIMG} id="numberLink"/>
      </Link>
    </div>
  )
}
