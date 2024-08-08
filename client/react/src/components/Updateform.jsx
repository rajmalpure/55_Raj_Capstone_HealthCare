import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams, Link } from 'react-router-dom';
import './Update.css';

function UpdateForm() {
    const navigate = useNavigate();
    const { id } = useParams(); 

    const [formData, setFormData] = useState({
        Name : '',
        Email : '',
        Password : '',
        Medical_history : '',
        Treatment_details : '',
    });

    useEffect(() => {
        if(id) {  
            axios.get(`https://five5-raj-capstone-healthcare-4.onrender.com/patient/${id}`)
                .then((response) => {
                    setFormData({
                        Name: response.data.Name,
                        Email: response.data.Email,
                        Password: response.data.Password,
                        Medical_history: response.data.Medical_history,
                        Treatment_details: response.data.Treatment_details,
                    });
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }, [id]); 

    const handleChange = (event) => {
        const { name, value, type, checked } = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        axios.put(`https://five5-raj-capstone-healthcare-4.onrender.com/patients/${id}`, formData)
            .then(() => {
                navigate('/'); 
                console.log(formData)
            })
            .catch((error) => {
                console.error(error);
            });
    }; 

    return (
      <div className='container'>
       <div className='content'>
        <form onSubmit={handleSubmit}>
            <label> 
                Name :
                <br /> 
                <input
                type='text'
                name='Name'
                onChange={handleChange}
                />
            </label>
            <br />
            <label>
                Email :
                <br />
                <input
                type='text'
                name='Email'
                onChange={handleChange}
                />
            </label>
            <br />

            <label>
                Password :
                <br />
                <input
                type='text'
                name='Password'
                onChange={handleChange}
                />
            </label>
            <br />

            <label>
                Medical history : 
                <br />
                <input
                type='text'
                name='Medical_history'
                onChange={handleChange}
                />
            </label>
            <br />
            <label>
                Treatment details :
                <br /> 
                <input
                type='text'
                name='Treatment_details'
                onChange={handleChange}
                />
            </label>
            <br />

        
            <button type='submit' className='update'>
                Update
            </button>
                </form>
                <Link to="/patient"></Link>
            </div>
        </div>
    );
}

export default UpdateForm;
