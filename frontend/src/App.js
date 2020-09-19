import React, { useState } from 'react';

import Header from './components/Header'

import './App.css'
import backgroundImage from './assets/background.jpeg';
/**
 * Component
 * Props
 * State
 */

function App() {
    
    const [projects, setProjects] = useState(['Dev', 'Devops']);

    function handleAddProject(){
        setProjects([...projects, `New project ${Date.now()}`]);
    }

    return (
        <>
            <Header title="Projects" />

            <img width="300" src={backgroundImage} />

            <button type="buttom" onClick={handleAddProject}>Adicionar</button>
            <ul>
                {projects.map(project => <li key={project}>{project}</li>)}
            </ul>
        </>
    )
}

export default App;