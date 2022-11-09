import React, { useState, useEffect } from 'react';
import "./App.min.css"
import axios from 'axios';
import InputField from './components/InputData/InputField';



const App: React.FC = () => {

 

  return (
    <div className='App'>

      <p id='title'>Shopping list</p>
      <InputField/>
      


    </div>
  )
}

export default App