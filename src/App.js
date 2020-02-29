import React, {useEffect, useState} from 'react';
import './App.css';
import axios from 'axios';
import Question from './components/Question';

function App() {

  const [state, setState] = useState({
    words: []
  });

  useEffect(()=>{
    axios.post("http://localhost:3000/api/v1/auth/signin",
      {email: "admin", password: "admin"}
    ).then(response => {
      axios.get("http://localhost:3000/api/v1/words",{
        headers: {Authorization: `Bearer ${response.data.token}`}
      }).then(response2 => {
        setState({
          words: response2.data._embedded.words
        });
      })
      .catch(error => {
        console.log(error)
      })
    }).catch(error => {
      console.log(error)
    });
  }, []);

  const toShow = state.words.length === 0 
                  ? <div>'loading'</div> 
                  : <Question 
                      otherWords={[
                        state.words[1],
                        state.words[2],
                        state.words[3],
                        state.words[4],
                      ]}
                      word={state.words[0]} />;

  return (
    <div>{toShow}</div>
  );
}

export default App;
