import React, {useEffect, useState} from 'react';
import './App.css';
import axios from 'axios';
import Question from './components/Question';
import { Grid, Button } from 'semantic-ui-react';
import useWindowDimensions from './custom_hooks/UseWindowDimensions';

function App() {

  const {width, height} = useWindowDimensions();

  const [state, setState] = useState({
    words: [],
    test: [],
    questionToShow: -1
  });

  useEffect(()=>{
    axios.post("http://localhost:3000/api/v1/auth/signin",
      {email: "admin", password: "admin"}
    ).then(response => {
      axios.get("http://localhost:3000/api/v1/words",{
        headers: {Authorization: `Bearer ${response.data.token}`}
      }).then(response2 => {
        createTest(response2.data._embedded.words);
      })
      .catch(error => {
        console.log(error)
      })
    }).catch(error => {
      console.log(error)
    });
  }, []);

  const createTest = (words)=>{
    const tempTest = [];

    for(let i=0; i<20; i++){
      const wordsForQuestion = findNext(words);
      const question = {
        words: wordsForQuestion,
        rightWord: Math.floor(Math.random() * wordsForQuestion.length)
      }
      tempTest.push(question);
    }

    setState((prevState)=>{
      return {
        words: words.slice(),
        test: tempTest.slice(),
        questionToShow: prevState.questionToShow + 1
      }
    });
  }

  const findNext = (words)=>{
    let wordsForQuestion = [];

    for(let i=0; i<5; i++){
      let next = Math.floor(Math.random() * words.length);
      while(wordsForQuestion.includes(words[next])){
        next = Math.floor(Math.random() * words.length);
      }
      wordsForQuestion.push(words[next]);
    }
    
    return wordsForQuestion;
  }

  const questionToAnswer = state.questionToShow <= 0 
                  ? <div>loading</div> 
                  : <Grid style={{}}><Question question={state.test[state.questionToShow]} /></Grid>;

  return (
    <div>{questionToAnswer}</div>
  )
}

export default App;
