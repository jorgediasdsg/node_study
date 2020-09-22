import React, { useState, useEffect } from 'react';
import api from './services/api';

import Header from './components/Header'

import './App.css'
/**
 * Component
 * Props
 * State
 */

function App() {
    
    const [furnituresList, setFurnituresList] = useState([]);
    const [totalAreaList, setTotalAreaList] = useState([]);
    const [price, setPrice] = useState([]);

    useEffect(() => {
        api.get('list').then(response => {
            setFurnituresList(response.data.furnituresList);
            setTotalAreaList(response.data.totalAreaList);
            setPrice(response.data.price);
        })
    }, [furnituresList])

    async function handleAddItem(){
        // setFurnituresList([...furnituresList, `New project ${Date.now()}`]);
        const minLength = Math.ceil(1);
        const maxLength = Math.floor(1800);
        const minWidth = Math.ceil(1);
        const maxWidth = Math.floor(2700);
        const minUnits = Math.ceil(1);
        const maxUnits = Math.floor(100);
        const length = Math.floor(Math.random() * (maxLength - minLength)) + minLength;
        const width = Math.floor(Math.random() * (maxWidth - minWidth)) + minWidth;
        const units = Math.floor(Math.random() * (maxUnits - minUnits)) + minUnits;
        const response = await api.post('item', {
            name: `item ${Date.now()}`,
            length,
            width,
            units
        })
        const item = response.data;
        setFurnituresList([...furnituresList, item])
    }

    return (
        <>
            <Header title="Item list" />

            <button type="buttom" onClick={handleAddItem}>Add</button>
            <p>Total Área: { Math.round(totalAreaList)}m2</p>
            <p>Total Price: ${Math.round(price)}</p>
            <ul>
                {furnituresList.map(item => <li key={item.id}>{item.name} - {item.label}</li>)}
            </ul>
        </>
    )
}

export default App;