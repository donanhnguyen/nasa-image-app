import {useEffect, useContext, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';
import GlobalContext from './GlobalContext';
import Axios from 'axios';

function Home () {

    const today = new Date()
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)
    const currentDate = yesterday.toJSON().slice(0, 10);

    const navigate = useNavigate();
    const contextInfo = useContext(GlobalContext);
    const {currentUserState, renderURL} = contextInfo;
    const API_KEY = '8ClltNrkTWf5trTwGLhHiqbk2WuYydtfVHwXHH6I';

    const [imageInfo, setImageInfo] = useState();

    useEffect(() => {
        if (!currentUserState) {
            navigate('/login')
        }
        Axios.get(`https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&date=${currentDate}`)
            .then((response) => {
                setImageInfo(response.data);
            })
            .catch((error) => {
                console.log(error);
            })
    }, [])

    return (
        <div>
            <div className="home-container">
                
                <span style={{color: 'yellow', fontSize: '1.5em'}}>Image of the day: </span><span>{currentDate}</span>

                <p style={{color: 'yellow', fontSize: '2.2em'}}>{imageInfo? imageInfo.title : ""}</p>

                <img style={{width: '500px', height: "400px"}} src={imageInfo ? imageInfo.hdurl : ""} placeholder='nasa image of the day...'></img>
          
                
            </div>
        </div>
        
    )
}

export default Home;