import React, {useEffect, useState} from 'react';
import './App.css';
import axios from 'axios';
import Question from './components/Question';
import { Grid, Button } from 'semantic-ui-react';
import useWindowDimensions from './custom_hooks/UseWindowDimensions';
import createTest from './utils/TestUtils'

function App() {

  const {width, height} = useWindowDimensions();

  const [state, setState] = useState({
    words: [],
    test: [],
    questionToShow: -1,
    right: 0,
    selectedValue: -1,
    answered: -1
  });

  const handleChange = (e, { value }) => setState({...state, selectedValue: value });

  const nextQuestion = () => {
    const rightId = state.test[state.questionToShow].rightWord;
    const rightAnswer = rightId.toString() === state.selectedValue;

    setState((prevState)=>{ 
      return {...state, answered: prevState.selectedValue};
    });

    setTimeout(()=>{
      setState((prevState) => {
        return {
          ...state,
          questionToShow: prevState.questionToShow + 1,
          selectedValue: -1,
          answered: -1,
          right: rightAnswer ? prevState.right + 1 : prevState.right
        };
      });
    },3000);
  }

  useEffect(()=>{
    axios.post("http://localhost:3000/api/v1/auth/signin",
      {email: "admin", password: "admin"}
    ).then(response => {
      axios.get("http://localhost:3000/api/v1/words",{
        headers: {Authorization: `Bearer ${response.data.token}`}
      }).then(response2 => {
        const test = createTest(response2.data._embedded.words);

        setState((prevState)=>{
          return {
            ...state,
            words: response2.data._embedded.words,
            test: test,
            questionToShow: prevState.questionToShow + 1
          }
        });
      })
      .catch(error => {
        console.log(error)
      })
    }).catch(error => {
      console.log(error)
    });
  }, []);

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
                  selectedValue={state.selectedValue}
                  answered={state.answered}/>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column verticalAlign='middle' textAlign='center'>
                <Button 
                  onClick={state.selectedValue > -1 ? nextQuestion : null} 
                  style={{minWidth: '200px'}} 
                  primary 
                  content='Next'
                  loading={state.answered > -1}/>
              </Grid.Column>
            </Grid.Row>
          </Grid>;

  return (
    <div>{questionToAnswer}</div>
  )
}

export default App;
