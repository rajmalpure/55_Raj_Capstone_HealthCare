import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams, Link } from 'react-router-dom';
import './Updateform.css';

function UpdateForm() {
    const navigate = useNavigate();
    const { id } = useParams(); 
    const [successMessage, setSuccessMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [focusedInput, setFocusedInput] = useState(null);

    const [formData, setFormData] = useState({
        Name: '',
        Email: '',
        Password: '',
        Medical_history: '',
        Treatment_details: '',
    });

    useEffect(() => {
        if(id) {  
            setLoading(true);
            axios.get(`https://five5-raj-capstone-healthcare-4.onrender.com/patient/${id}`)
                .then((response) => {
                    setFormData({
                        Name: response.data.Name || '',
                        Email: response.data.Email || '',
                        Password: response.data.Password || '',
                        Medical_history: response.data.Medical_history || '',
                        Treatment_details: response.data.Treatment_details || '',
                    });
                    setLoading(false);
                })
                .catch((error) => {
                    console.error(error);
                    setLoading(false);
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

    const handleFocus = (inputName) => {
        setFocusedInput(inputName);
    };

    const handleBlur = () => {
        setFocusedInput(null);
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        
        axios.put(`https://five5-raj-capstone-healthcare-4.onrender.com/patients/${id}`, formData)
            .then(() => {
                setSuccessMessage('Patient information updated successfully!');
                setLoading(false);
                setTimeout(() => {
                    navigate('/');
                }, 1500);
                console.log(formData);
            })
            .catch((error) => {
                console.error(error);
                setLoading(false);
            });
    }; 

    return (
        <div className='container'>
            <div className='content'>
                <div className="form-header">
                    <h2>Update Patient Information</h2>
                    <p>Make changes to the patient record</p>
                </div>
                
                {successMessage && (
                    <div className="success-message">
                        {successMessage}
                    </div>
                )}
                
                <form onSubmit={handleSubmit}>
                    <div className={`form-group ${focusedInput === 'Name' ? 'focus' : ''}`}>
                        <label htmlFor="name">Name</label>
                        <input
                            id="name"
                            type='text'
                            name='Name'
                            value={formData.Name}
                            onChange={handleChange}
                            onFocus={() => handleFocus('Name')}
                            onBlur={handleBlur}
                            disabled={loading}
                        />
                    </div>
                    
                    <div className={`form-group ${focusedInput === 'Email' ? 'focus' : ''}`}>
                        <label htmlFor="email">Email Address</label>
                        <input
                            id="email"
                            type='email'
                            name='Email'
                            value={formData.Email}
                            onChange={handleChange}
                            onFocus={() => handleFocus('Email')}
                            onBlur={handleBlur}
                            disabled={loading}
                        />
                    </div>

                    <div className={`form-group ${focusedInput === 'Password' ? 'focus' : ''}`}>
                        <label htmlFor="password">Password</label>
                        <input
                            id="password"
                            type={showPassword ? 'text' : 'password'}
                            name='Password'
                            value={formData.Password}
                            onChange={handleChange}
                            onFocus={() => handleFocus('Password')}
                            onBlur={handleBlur}
                            disabled={loading}
                        />
                        <button 
                            type="button" 
                            className="password-toggle" 
                            onClick={togglePasswordVisibility}
                        >
                            {showPassword ? '🙈' : '👁️'}
                        </button>
                    </div>

                    <div className={`form-group ${focusedInput === 'Medical_history' ? 'focus' : ''}`}>
                        <label htmlFor="medical">Medical History</label>
                        <input
                            id="medical"
                            type='text'
                            name='Medical_history'
                            value={formData.Medical_history}
                            onChange={handleChange}
                            onFocus={() => handleFocus('Medical_history')}
                            onBlur={handleBlur}
                            disabled={loading}
                        />
                    </div>
                    
                    <div className={`form-group ${focusedInput === 'Treatment_details' ? 'focus' : ''}`}>
                        <label htmlFor="treatment">Treatment Details</label>
                        <input
                            id="treatment"
                            type='text'
                            name='Treatment_details'
                            value={formData.Treatment_details}
                            onChange={handleChange}
                            onFocus={() => handleFocus('Treatment_details')}
                            onBlur={handleBlur}
                            disabled={loading}
                        />
                    </div>

                    <button 
                        type='submit' 
                        className='update'
                        disabled={loading}
                    >
                        {loading ? 'Updating...' : 'Update Patient'}
                    </button>
                </form>
                <Link to="/patient"></Link>
            </div>
        </div>
    );
}

export default UpdateForm;