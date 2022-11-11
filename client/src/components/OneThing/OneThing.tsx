import React, { useState } from 'react';
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';
import { MdExpandMore, MdExpandLess } from 'react-icons/md';
import axios from 'axios';
import './OneThing.min.css';


interface Props {
    thing: ShoppingList
}
interface ShoppingList {
    name: string;
    price: string;
    id: number;
    updateDate: string;
}

const OneThing: React.FC<Props> = ({ thing }) => {
    const [editName, setEditName] = useState<string>(thing.name);
    const [editPrice, setEditPrice] = useState<string>(thing.price);
    const [edit, setEdit] = useState<boolean>(false);
    const [details, setDetails] = useState<boolean>(false)


    // Deleting Thing
    const handleDelete = (e: React.FormEvent, id: number) => {
        e.preventDefault();
        axios.delete(`http://localhost:9000/deleteThing/${id}`, {

        })
            .then(response => {
                console.log('Status: ' + response.status + " " + response.statusText)
                console.log(response.data)
            })
            .catch(err => {
                console.log(err)
            })
    }

    // Editing Thing

    const handleEdit = (e: React.FormEvent, id: number) => {
        e.preventDefault();
        let month = new Date().getMonth() + 1;
        let day = new Date().getDate();
        let year = new Date().getFullYear();
        let date = `${month}/${day}/${year}`;
        axios.post(`http://localhost:9000/editThing`, {

            id: id,
            name: editName,
            price: editPrice,
            updateDate: date,

        })
            .then(response => {
                console.log('Status: ' + response.status + " " + response.statusText)
                console.log(response.data)

            })
            .catch(err => {
                console.log(err)
            })
        setEdit(false)

    }
    const moreDetails = () => {

        setDetails(!details)


    }



    return (
        <>
            {edit ?
                (
                    <form className='edit' onSubmit={(e) => handleEdit(e, thing.id)} >

                        <input type='text' value={editName}
                            onChange={(e) => setEditName(e.target.value)}
                            required
                        ></input>

                        <input type='text' value={editPrice}
                            onChange={(e) => setEditPrice(e.target.value)}
                            required
                        ></input>
                        <button type='submit'>Save</button>
                        <button type='button' id='cancel' onClick={() => setEdit(false)}>Cancel</button>

                    </form>

                )
                :

                (details ?
                    (<div className='shoppingListMore'  >
                        <span onClick={() => moreDetails()}>{thing.name} <MdExpandLess id='details' /></span>

                        <div className='icon'>

                            <AiOutlineEdit id='edit' onClick={(e) => setEdit(true)} />
                            <AiOutlineDelete id='delete' onClick={(e) => handleDelete(e, thing.id)} />

                        </div>
                        <p id='price'>Price: {thing.price} PLN</p>
                        {thing.updateDate === null ?
                            (<p></p>)
                            :
                            (<p id='updated'>Updated: {thing.updateDate}</p>)}


                    </div>)
                    :
                    (<div className='shoppingList'  >
                        <span onClick={() => moreDetails()}>{thing.name} <MdExpandMore id='details' /></span>

                        <div className='icon'>

                            <AiOutlineEdit id='edit' onClick={(e) => setEdit(true)} />
                            <AiOutlineDelete id='delete' onClick={(e) => handleDelete(e, thing.id)} />

                        </div>

                    </div>
                    ))}

            {
            }

        </>
    )
}

export default OneThing