import React, { useState } from 'react';

const TuitionForm = ({ onAdd }) => {
  const [className, setClassName] = useState('');
  const [studentName, setStudentName] = useState('');
  const [daysPerMonth, setDaysPerMonth] = useState('');

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!studentName) newErrors.studentName = 'Student name is required';
    if (!className) newErrors.className = 'Class is required';
    if (!daysPerMonth || isNaN(daysPerMonth) || daysPerMonth <= 0) newErrors.daysPerMonth = 'Days per month must be a positive number';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onAdd({ className, studentName, daysPerMonth: parseInt(daysPerMonth) });
      setClassName('');
      setStudentName('');
      setDaysPerMonth('');
      setErrors({});
    }
  };

  return (
    <div className="flex items-center justify-center">
      <form className="w-full max-w-lg p-8 bg-base-300" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-semibold mb-6 text-center text-base-content">Add New Tuition</h2>
        
        <div className="form-control mb-5">
          <label className="label text-base-content">Student Name</label>
          <input 
            type="text" 
            placeholder="Enter student name" 
            className={`input input-bordered w-full bg-base-100 text-base-content ${errors.studentName ? 'border-red-500' : ''}`} 
            value={studentName} 
            onChange={(e) => setStudentName(e.target.value)} 
          />
          {errors.studentName && <p className="text-red-500 text-sm">{errors.studentName}</p>}
        </div>

        <div className="form-control mb-5">
          <label className="label text-base-content">Class</label>
          <input 
            type="text" 
            placeholder="Enter class" 
            className={`input input-bordered w-full bg-base-100 text-base-content ${errors.className ? 'border-red-500' : ''}`} 
            value={className} 
            onChange={(e) => setClassName(e.target.value)} 
          />
          {errors.className && <p className="text-red-500 text-sm">{errors.className}</p>}
        </div>

        <div className="form-control mb-6">
          <label className="label text-base-content">Days per Month</label>
          <input 
            type="number" 
            placeholder="Enter number of days" 
            className={`input input-bordered w-full bg-base-100 text-base-content ${errors.daysPerMonth ? 'border-red-500' : ''}`} 
            value={daysPerMonth} 
            onChange={(e) => setDaysPerMonth(e.target.value)} 
          />
          {errors.daysPerMonth && <p className="text-red-500 text-sm">{errors.daysPerMonth}</p>}
        </div>

        <button 
          type="submit" 
          className="btn btn-primary w-full" 
          disabled={!studentName || !className || !daysPerMonth || errors.studentName || errors.className || errors.daysPerMonth}
        >
          Add Tuition
        </button>
      </form>
    </div>
  );
};

export default TuitionForm;
