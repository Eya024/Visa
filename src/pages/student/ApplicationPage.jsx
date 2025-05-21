import React, { useState, useEffect } from 'react';

const ApplicationPage = () => {
    const [formData, setFormData] = useState({ /* same as before */ });
    const [applicationId, setApplicationId] = useState(null);


    useEffect(() => {
    const userID = localStorage.getItem('userID'); // Get userID directly from localStorage

    if (!userID) return;

    const fetchApplication = async () => {
        try {
            const res = await fetch(`http://localhost:8000/api/applications/user/${userID}`);
            const data = await res.json();

            if (data.exists) {
                setFormData((prev) => ({
                    ...prev,
                    ...data.data,
                    user_id: userID  // ensure it's in formData
                }));
                setApplicationId(data.data.id);
            } else {
                // If no application exists, make sure user_id is still set
                setFormData((prev) => ({
                    ...prev,
                    user_id: userID
                }));
            }
        } catch (err) {
            console.error('Failed to load application', err);
        }
    };

    fetchApplication();
}, []);


    const handleChange = (e) => {
    const { name, value, files, type } = e.target;

    setFormData((prevData) => ({
        ...prevData,
        [name]: type === 'file' ? files[0] : value,
    }));
};



    const handleSubmit = async (e) => {
        e.preventDefault();

        const body = new FormData();
        for (const key in formData) {
            if (formData[key] !== null) {
                body.append(key, formData[key]);
            }
        }

        try {
            const endpoint = applicationId
                ? `http://localhost:8000/api/applications/update/${applicationId}/`
                : 'http://localhost:8000/api/applications/create/';

            const res = await fetch(endpoint, {
                method: 'POST',
                body,
            });

            const text = await res.text();

            if (res.ok) {
                alert(applicationId ? 'Application updated successfully' : 'Application submitted successfully');
            } else {
                alert(`Error: ${text}`);
            }

        } catch (err) {
            alert('Failed to submit form');
            console.error(err);
        }
    };

    return (
        <div className="activity-section full">
            <h2>Visa Application Form</h2>
            <form className="application-form" onSubmit={handleSubmit}>
                <div className="form-grid">
                    {[
                        { label: 'Full Name', name: 'full_name', type: 'text', placeholder: 'John Doe' },
                        { label: 'Email', name: 'email', type: 'email', placeholder: 'john@example.com' },
                        { label: 'Phone Number', name: 'phone_number', type: 'tel', placeholder: '+1234567890' },
                        { label: 'Date of Birth', name: 'date_of_birth', type: 'date' },
                        { label: 'Passport Number', name: 'passport_number', type: 'text', placeholder: 'AB1234567' },
                        { label: 'Nationality', name: 'nationality', type: 'text', placeholder: 'Indian' },
                        { label: 'Purpose of Travel', name: 'purpose_of_travel', type: 'text', placeholder: 'Studies, Tourism, Work...' },
                        { label: 'Duration of Stay', name: 'duration_of_stay', type: 'text', placeholder: 'e.g., 3 months' },
                        { label: 'Occupation', name: 'occupation', type: 'text', placeholder: 'Software Engineer' },
                        { label: 'Supporting Documents (URLs)', name: 'supporting_documents', type: 'text', placeholder: 'https://docs.example.com/passport.pdf' },
                        { label: 'Additional Notes', name: 'additional_notes_file', type: 'file' },
                    ].map(({ label, name, type, placeholder }) => (
                        <div className="form-group" key={name}>
                            <label>{label}</label>
                            <input
                                name={name}
                                type={type}
                                placeholder={placeholder}
                                value={type !== 'file' ? formData[name] : undefined}
                                onChange={handleChange}
                            />
                        </div>
                    ))}

                    <div className="form-group">
                        <label>Destination Country</label>
                        <select name="destination_country" value={formData.destination_country} onChange={handleChange}>
                            <option value="France">France</option>
                            <option value="Canada">Canada</option>
                            <option value="USA">USA</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Visa Type</label>
                        <select name="visa_type" value={formData.visa_type} onChange={handleChange}>
                            <option value="Tourist">Tourist</option>
                            <option value="Student">Student</option>
                            <option value="Work">Work</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Education Level</label>
                        <select name="education_level" value={formData.education_level} onChange={handleChange}>
                            <option value="High School">High School</option>
                            <option value="Bachelor">Bachelor</option>
                            <option value="Master">Master</option>
                            <option value="PhD">PhD</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Marital Status</label>
                        <select name="marital_status" value={formData.marital_status} onChange={handleChange}>
                            <option value="Single">Single</option>
                            <option value="Married">Married</option>
                            <option value="Divorced">Divorced</option>
                        </select>
                    </div>
                </div>

                <div className="form-actions">
                    <button className="btn primary" type="submit">
                        {applicationId ? 'Update' : 'Submit'}
                    </button>
                    <button className="btn danger" type="button">Cancel</button>
                </div>
            </form>
        </div>
    );
};

export default ApplicationPage;
