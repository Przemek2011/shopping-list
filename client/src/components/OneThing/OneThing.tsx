import React, { useState, useEffect } from 'react'
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';
import { MdExpandMore, MdExpandLess } from 'react-icons/md';
import axios from 'axios';
import './OneThing.min.css'


interface Props {
    thing: ShoppingList
}
interface ShoppingList {
    Name: string;
    Price: string;
    Id: number;
    UpdateDate: string;
}

const OneThing: React.FC<Props> = ({ thing }) => {
    const [editName, setEditName] = useState<string>(thing.Name);
    const [editPrice, setEditPrice] = useState<string>('');
    const [edit, setEdit] = useState<boolean>(false);
    const [details, setDetails] = useState<boolean>(false)


    // Deleting Thing
    const handleDelete = (e: React.FormEvent, id: number) => {
        e.preventDefault();
        axios.delete(`http://localhost:9000/deleteThing/${id}`, {

        })
            .then(reponse => {
                console.log('status:' + reponse.status)
                console.log(reponse.data)
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
        console.log(date)
        axios.post(`http://localhost:9000/editThing`, {

            Id: id,
            Name: editName,
            Price: editPrice,
            UpdateDate: date,

        })
            .then(reponse => {
                console.log('status:' + reponse.status)

            })
            .catch(err => {
                console.log(err)
            })
        setEdit(false)

    }
    const moreDetails = () => {
        console.log(thing.Name)
        setDetails(!details)


    }



    return (
        <>
         {edit ?
                (
                    <form  className='edit' onSubmit={(e) => handleEdit(e, thing.Id)} >
                    
                        <input type='text' value={editName}
                            onChange={(e) => setEditName(e.target.value)}
                        ></input>
                        
                        <input type='text' value={editPrice}
                            onChange={(e) => setEditPrice(e.target.value)}
                        ></input>
                         <button type='submit'>Save</button>
                         <button id='cancel' onClick={() => setEdit(false)}>Cancel</button>
                       
                        
                    </form>
                    
                )
                :

                (details ?
                    (<div className='shoppingListMore'  >
                        <span onClick={() => moreDetails()}>{thing.Name} <MdExpandLess id='details' /></span>
    
                        <div className='icon'>
    
                            <AiOutlineEdit id='edit' onClick={(e) => setEdit(true)} />
                            <AiOutlineDelete id='delete' onClick={(e) => handleDelete(e, thing.Id)} />
    
                        </div>
                        <p id='price'>Price: {thing.Price} PLN</p>
                        {thing.UpdateDate === null ?
                            (<p></p>)
                            :
                            (<p id='updated'>Updated: {thing.UpdateDate}</p>)}
    
    
    
    
                    </div>)
                    :
                    (<div className='shoppingList'  >
                        <span onClick={() => moreDetails()}>{thing.Name} <MdExpandMore id='details' /></span>
    
                        <div className='icon'>
    
                            <AiOutlineEdit id='edit' onClick={(e) => setEdit(true)} />
                            <AiOutlineDelete id='delete' onClick={(e) => handleDelete(e, thing.Id)} />
    
                        </div>
    
                    </div>
                    )) }

            {
            }


           
        </>
    )
}

export default OneThing