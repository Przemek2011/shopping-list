import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ShoppingList.min.css';

import OneThing from '../OneThing/OneThing';


interface ShoppingList {
    name: string;
    price: string;
    id: number;
    updateDate: string;
}

const ShoppingList: React.FC = () => {

    const [shoppingList, setShoppingList] = useState<ShoppingList[]>([]);


    // Download shopping list
    const downloadShoppingList = () => {
        axios.get('http://localhost:9000/downloadShoppingList')
            .then(response => {

                setShoppingList(response.data);
            })
            .catch(err => {
                console.log(err)
            })
    }

    useEffect(() => {
        downloadShoppingList();
    }, [shoppingList])



    return (

        <div>{shoppingList.map((thing) => (

            <OneThing thing={thing} key={thing.id} />
        )
        )
        }
        </div>









    )
}


export default ShoppingList