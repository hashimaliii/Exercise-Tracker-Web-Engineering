import axios from 'axios'
import { useEffect, useState } from 'react'
import { useRef } from 'react';

export default function UserDashboard() {
    const [exercises, setExercises] = useState([]);
    const nameRef = useRef(null);
    const descriptionRef = useRef(null);
    const durationRef = useRef(null);
    const dateRef = useRef(null);
    const [id, setID] = useState(0);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        date.toLocaleDateString('en-GB');
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}/${month}/${day}`;
    };

    const getExercises = async () => {
        try {
            const token = localStorage.getItem('token');
            const role = localStorage.getItem('role');
            const res = await axios.get('http://localhost:5000/exercises', {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                params: {
                    role
                }
            });
            setExercises(res.data);
        }
        catch (err) {
            console.error('Failed to load exercises: ' + err);
        }
    }

    async function getExercise(id) {
        try {
            setID(id);
            const token = localStorage.getItem('token');
            const res = await axios.get(`http://localhost:5000/exercises/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const excercise = res.data;
            nameRef.current.value = excercise.username;
            descriptionRef.current.value = excercise.description;
            durationRef.current.value = excercise.duration;
            dateRef.current.value = formatDate(excercise.date);
        }
        catch (err) {
            console.error('Failed to load exercises: ' + err);
        }
    }

    async function updateExercise(id, username, description, duration, date) {
        try {

            const token = localStorage.getItem('token');
            const res = await axios.put(`http://localhost:5000/exercises/${id}`, {
                "username": username,
                "description": description,
                "duration": duration,
                "date": date
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (res.status == 200) {
                console.log('Excersie updated successfully');
                alert('Excersie updated successfully');
                getExercises();
            }
        }
        catch (err) {
            console.error('Failed to update excercise: ' + err);
        }
    }

    async function deleteExercise(id) {
        try {
            const token = localStorage.getItem('token');
            const res = await axios.delete(`http://localhost:5000/exercises/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (res.status == 200) {
                console.log('Excersie deleted successfully');
                alert('Excersie deleted successfully');
                getExercises();
            }
        }
        catch (err) {
            console.error('Failed to load exercises: ' + err);
        }
    }

    async function addExcercise(username, description, duration, date) {
        try {

            const token = localStorage.getItem('token');
            const res = await axios.post('http://localhost:5000/exercises/add', {
                "username": username,
                "description": description,
                "duration": duration,
                "date": date
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (res.status == 200) {
                console.log('Excersie added successfully');
                alert('Excersie added successfully');
                getExercises();
            }
        }
        catch (err) {
            console.error('Failed to add excercise: ' + err);
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
                    {exercises.map((exercise) => < li key={exercise._id} > {exercise.description}
                        <button onClick={(e) => { getExercise(exercise._id) }}>Show Detail</button>
                        <button onClick={(e) => { deleteExercise(exercise._id) }}>Delete</button>

                        <button onClick={(e) => {
                            const name = nameRef.current.value;
                            const description = descriptionRef.current.value;
                            const duration = durationRef.current.value;
                            const date = dateRef.current.value;
                            updateExercise(id, name, description, duration, date);
                        }}>Update Exercise</button>
                    </li>)}
                </ul>
            </div >

            <div>
                <form onSubmit={async (e) => {
                    e.preventDefault()
                    const name = nameRef.current.value;
                    const description = descriptionRef.current.value;
                    const duration = durationRef.current.value;
                    const date = dateRef.current.value;
                    addExcercise(name, description, duration, date);
                }}>
                    <p>Add New Excercise</p>
                    <label >Name: </label>
                    <input id="name" className="name" ref={nameRef} type="text" required></input>
                    <br></br><br></br>
                    <label >Description: </label>
                    <input id="description" className="description" ref={descriptionRef} type="text" required></input>
                    <br></br><br></br>
                    <label >Duration: </label>
                    <input id="duration" className="duration" ref={durationRef} type="number" required></input>
                    <br></br><br></br>
                    <label >Date: </label>
                    <input id="date" className="date" ref={dateRef} type="date" required></input>
                    <br></br><br></br>

                    <button type='submit'>Add Excercise</button>
                </form>
            </div>
        </>
    )
}