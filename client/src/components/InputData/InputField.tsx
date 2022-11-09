import React from 'react';
import './InputField.min.css';
import { FaBeer } from 'react-icons/fa';

const InputField: React.FC = () => {


    const addTask = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('test')
      }
    return (
        <form className='addTask' onSubmit={(e) => addTask(e)}>
            <input type='text' maxLength={100} placeholder='Enter a name'  required></input>
            <input type='number' placeholder='PLN' required></input>
            <button type='submit'>Add Task</button>
            <div><FaBeer /></div>
        </form>
    )
}

export default InputField