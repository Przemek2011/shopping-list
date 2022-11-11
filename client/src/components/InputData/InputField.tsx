import React, { useState } from 'react';
import './InputField.min.css';
import axios from 'axios';

const InputField: React.FC = () => {
    const [name, setName] = useState<string>('');
    const [price, setPrice] = useState<string>('');

    const addTask = (e: React.FormEvent) => {
        e.preventDefault();
        axios.post('http://localhost:9000/addThing', {
            name: name,
            price: price,
            id: Math.random(),
        })
            .then((response) => {
                console.log(`Thing added:  ${name} ${price} PLN`)
                console.log("Status: " + response.status + " " + response.statusText)
            })
            .catch(err => {
                console.log(err)
            })
        setName('');
        setPrice('');

    }


    return (
        <form className='addThing' onSubmit={(e) => addTask(e)}>
            <input type='text' maxLength={100} placeholder='Enter a name'
                value={name}
                onChange={(e) => setName(e.target.value)}
                required></input>
            <input type='number' placeholder='PLN'
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required></input>
            <button type='submit'>Add Task</button>

        </form>
    )
}

export default InputField