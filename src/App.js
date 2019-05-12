import React from 'react';
import Header from './Components/Header'
import NumberLink from './Components/NumberLink'
import LettersLink from './Components/LettersLink'
import NumberQuiz from './Pages/NumberQuiz'
import LetterQuiz from './Pages/LetterQuiz'

import {BrowserRouter as Router, Route} from 'react-router-dom';
import './Styles/App.css';

function App() {
  return (
    <Router>
      <Route exact path='/' render={props => ( 
        <React.Fragment>
          <div className="content">
            <Header/>
            <NumberLink/>
            <LettersLink/>
          </div>
        </React.Fragment>
      )}/>
      <Route exact path='/numbers' component={NumberQuiz}/>
      <Route exact path='/letters' component={LetterQuiz}/>
    </Router>
  );
}

export default App;
