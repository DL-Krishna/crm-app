import React, { useState, useEffect } from 'react';

const CreateCourse = ({ isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    
    courseName: '',
    courseFee: ''
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isOpen) {
      // Reset the form data and errors when the form is opened
      setFormData({
       
        courseName: '',
        courseFee: '',
      });
      setErrors({});
    }
  }, [isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSave = () => {
    const newErrors = {};
    if (!formData.courseName) {
      newErrors.courseName = "Course Name is mandatory";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSave(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/2">
        <h2 className="text-xl mb-4">Create Course</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col">
            <input
              type="text"
              name="courseName"
              placeholder="Course Name"
              value={formData.courseName}
              onChange={handleChange}
              className="border p-2 rounded"
              required
            />
            {errors.courseName && <span className=" ps-2 text-red-500 text-sm mt-1">{errors.courseName}</span>}
          </div>
          <div className="flex flex-col">
            <input
              type="text"
              name="courseFee"
              placeholder="Course Fee"
              value={formData.courseFee}
              onChange={handleChange}
              className="border p-2 rounded"
            />
          </div>
        </div>
        <div className="flex justify-end mt-4 space-x-2">
          <button onClick={onClose} className="bg-gray-500 text-white px-4 py-2 rounded">Cancel</button>
          <button onClick={handleSave} className="bg-blue-500 text-white px-4 py-2 rounded">Create</button>
        </div>
      </div>
    </div>
  );
};

export default CreateCourse;
