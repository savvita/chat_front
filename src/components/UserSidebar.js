
import Collapse from './Collapse/Collapse';

import { useDispatch, useSelector } from "react-redux";

import { selectCurrent, refresh } from '../app/authSlice';
import { useEffect, useState } from 'react';

const UserSidebar = () => {

    const user = useSelector(selectCurrent);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(refresh());
    }, []);

    
    
    const [requests, setRequests] = useState([]);

    useEffect(() => {
        if(!user || !user.abilities || user.abilities.length === 0) {
            return;
        }

        const val = [];
        if(user.abilities.includes("1")) {
            val.push({
                heading: 'Текст',
                link: 'text'
            });
        }

        if(user.abilities.includes("2")) {
            val.push({
                heading: 'Зображення',
                link: 'image'
            });
        }

        if(user.abilities.includes("3")) {
            val.push({
                heading: 'Голос',
                link: 'voice'
            });
        }

        setRequests([...val]);
    }, [user]);


    return (
        <div className='d-flex flex-column' style={{ width: '10rem' }}>
            <Collapse heading='Запити' items={ requests } />
        </div>
    );
}

export default UserSidebar;