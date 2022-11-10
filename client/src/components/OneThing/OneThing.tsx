import React, {useState, useEffect} from 'react'
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';
import { MdExpandMore } from 'react-icons/md';
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

const OneThing: React.FC<Props> = ({thing}) => {
    const [editName, setEditName] = useState<string>('');
    const [editPrice, setEditPrice] = useState<string>('');
    const [edit, setEdit] = useState<boolean>(false);


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

// Edit Thing
const editThing = (e: React.FormEvent, id: number) => {
    setEdit(true);
}
const handleEdit = (e: React.FormEvent, id: number) => {
    e.preventDefault();
    axios.put(`http://localhost:9000/editThing`, {
        Id: 0,
        Name: editName,
        Price: editPrice,
        UpdateDate: Date.now()
    })
        .then(reponse => {
            console.log('status:' + reponse.status)
            console.log(reponse.data)
        })
        .catch(err => {
            console.log(err)
        })

}


  return (
    <div className='shoppingList' >
                <span>{thing.Name} <MdExpandMore id='details' /></span>

                <div className='icon'>

                    <AiOutlineEdit id='edit' onClick={(e) => setEdit(true)} />
                    <AiOutlineDelete id='delete' onClick={(e) => handleDelete(e, thing.Id)} />

                </div>
                {edit ?
                    (
                        <form  className='edit' onSubmit={(e) => handleEdit(e, thing.Id)} >
                            
                            <input type='text' ></input>
                            <button type='submit'></button>
                        </form>
                    )
                    :

                    (<div></div>)}
                </div>
                
  )
}

export default OneThing