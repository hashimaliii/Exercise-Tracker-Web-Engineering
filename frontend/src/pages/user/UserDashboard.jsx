import axios from 'axios'
import { useEffect, useState } from 'react'

export default function UserDashboard() {
    const [exercises, setExercises] = useState([]);

    const getExercises = async () => {
        try {
            const token = localStorage.getItem('token');
            const res = await axios.get('http://localhost:5000/exercises', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setExercises(res.data);
        }
        catch (err) {
            console.error('Failed to load exercises: ' + err);
        }
    }

    useEffect(() => {
        getExercises();
    }, []);

    return (
        <>
            <div className='exercises-container'>
                <p>My Exercises</p>
                <ul>
                    {exercises.map((exercise) => < li key={exercise._id} > {exercise.description}</li>)}
                </ul>
            </div >
        </>
    )
}