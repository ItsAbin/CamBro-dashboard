import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import './complaintForm.css';

const ComplaintForm = () => {
    const [submitted, setSubmitted] = useState(false);
    const [toast, setToast] = useState(null);

    const showToast = (message, type) => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 3000);
    };

    const formik = useFormik({
        initialValues: {
            topic: '',
            explanation: ''
        },
        validationSchema: Yup.object({
            topic: Yup.string()
                .min(3, 'Topic must be at least 3 characters')
                .max(50, 'Topic must be less than 50 characters')
                .required('Topic is required'),
            explanation: Yup.string()
                .min(10, 'Explanation must be at least 10 characters')
                .required('Explanation is required')
        }),
        onSubmit: (values, { resetForm }) => {
            console.log(values);
            showToast('Complaint submitted successfully!', 'success');
            setSubmitted(true);
            resetForm();
            setTimeout(() => setSubmitted(false), 3000);
        }
    });

    return (
        <div className="complaint-page">
            {/* Toast Notification */}
            {toast && (
                <div className="toast-container">
                    <div className={`toast ${toast.type}`}>
                        <span className="toast-icon">
                            {toast.type === 'success' ? '✓' : '⚠'}
                        </span>
                        {toast.message}
                    </div>
                </div>
            )}
            
            <div className="form-container">
            <h2>Submit Your Complaint</h2>
            <form onSubmit={(e) => {
                e.preventDefault();
                if (Object.keys(formik.errors).length > 0) {
                    showToast('Please fill all required fields correctly', 'error');
                } else {
                    formik.handleSubmit(e);
                }
            }}>
                <div className="form-group">
                    <label htmlFor="topic">Topic:</label>
                    <input
                        id="topic"
                        name="topic"
                        type="text"
                        placeholder="Enter the topic of your complaint"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.topic}
                    />
                    {formik.touched.topic && formik.errors.topic ? (
                        <div className="error">{formik.errors.topic}</div>
                    ) : null}
                </div>

                <div className="form-group">
                    <label htmlFor="explanation">Explanation:</label>
                    <textarea
                        id="explanation"
                        name="explanation"
                        placeholder="Provide a detailed explanation of your complaint"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.explanation}
                    />
                    {formik.touched.explanation && formik.errors.explanation ? (
                        <div className="error">{formik.errors.explanation}</div>
                    ) : null}
                </div>

                <button type="submit" disabled={formik.isSubmitting}>
                    Submit
                </button>
            </form>
        </div>
        </div>
    );
};

export default ComplaintForm;