import React, {useEffect} from 'react';
import './App.css';
import axios from 'axios';

function App() {

  useEffect(()=>{
    axios.post("http://localhost:3000/api/v1/auth/signin",
      {email: "admin", password: "admin"}
    ).then(response => {

      console.log(response.data.token)
      axios.get("http://localhost:3000/api/v1/words",{
        headers: {Authorization: `Bearer ${response.data.token}`}
      }).then(response2 => {

        console.log(response2.data);

      })
      .catch(error => {
        console.log(error)
      })

    }).catch(error => {
      console.log(error)
    });
  }, []);


  return (
    <div>
      
    </div>
  );
}

export default App;
