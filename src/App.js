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
    questionToShow: -1,
    right: 0,
    selectedValue: -1
  });

  const handleChange = (e, { value }) => setState({...state, selectedValue: value });

  const nextQuestion = () => {
    const rightId = state.test[state.questionToShow].rightWord;
    const rightAnswer = rightId.toString() === state.selectedValue;
    
    setState((prevState) => {
      return {
        ...state,
        questionToShow: prevState.questionToShow + 1,
        selectedValue: -1,
        right: rightAnswer ? prevState.right + 1 : prevState.right
      }
    });
  }

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
      const wordsForQuestion = findNext(words, tempTest);
      const question = {
        words: wordsForQuestion,
        rightWord: wordsForQuestion[Math.floor(Math.random() * wordsForQuestion.length)].id
      }
      tempTest.push(question);
    }

    setState((prevState)=>{
      return {
        ...state,
        words: words.slice(),
        test: tempTest.slice(),
        questionToShow: prevState.questionToShow + 1
      }
    });
  }

  const findNext = (words, test)=>{
    let wordsForQuestion = [];
    let translations = []
    const alreadyUsed = test.map(question => question.rightWord.toString())

    for(let i=0; i<6; i++){
      let next = Math.floor(Math.random() * words.length);
      while(wordsForQuestion.includes(words[next]) || translations.includes(words[next].translation 
        || alreadyUsed.includes(words[next].id.toString()))){

        next = Math.floor(Math.random() * words.length);
      }
      wordsForQuestion.push(words[next]);
      translations.push(words[next].translation);
    }
    
    return wordsForQuestion;
  }

  const questionToAnswer = state.questionToShow < 0 
        ? <div>loading</div> 
        : <Grid style={{height: height, width: width}}>
            <Grid.Row>
              <Grid.Column style={{fontSize: '2em'}} verticalAlign='middle' textAlign='center'>
                Question {state.questionToShow + 1}/{state.test.length} (right answers: {state.right})
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column verticalAlign='middle'>
                <Question 
                  question={state.test[state.questionToShow]} 
                  handleChange={handleChange}
                  selectedValue={state.selectedValue}/>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column verticalAlign='middle' textAlign='center'>
                <Button onClick={nextQuestion} style={{minWidth: '200px'}} primary content='Next'/>
              </Grid.Column>
            </Grid.Row>
          </Grid>;

  return (
    <div>{questionToAnswer}</div>
  )
}

export default App;
