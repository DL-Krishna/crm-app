import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const UpdateLead = ({ isOpen, onClose, lead, onSave }) => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', courseName: '', description: '' });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isOpen && lead) {
      setFormData({
        name: lead.name,
        email: lead.email,
        phone: lead.phone,
        courseName: lead.techStack,
        description: lead.description || ''
      });
      setErrors({});
    }
  }, [isOpen, lead]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = async () => {
    const newErrors = {};
    if (!formData.name) {
      newErrors.name = "Name is mandatory";
    }
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const payload = {
      name: formData.name,
      techStack: formData.courseName,
      phone: formData.phone,
      email: formData.email,
      description: formData.description
    };

    try {
      const token = localStorage.getItem('token');
      const userId = JSON.parse(localStorage.getItem('userInfo')).userId;
      await axios.put(`http://localhost:3000/api/v1/leads/${lead.id}`, { ...payload, userId }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success("Lead updated successfully");
      onSave({ ...lead, ...payload });
      onClose();
    } catch (error) {
      console.error('Error updating lead:', error);
      toast.error("Failed to update lead");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/2">
        <h2 className="text-xl mb-4">Update Lead</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col">
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              className="border p-2 rounded"
              required
            />
            {errors.name && <span className="text-red-500 text-sm mt-1">{errors.name}</span>}
          </div>
          <div className="flex flex-col">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="border p-2 rounded"
            />
          </div>
          <div className="flex flex-col">
            <input
              type="text"
              name="phone"
              placeholder="Phone"
              value={formData.phone}
              onChange={handleChange}
              className="border p-2 rounded"
            />
          </div>
          <div className="flex flex-col">
            <input
              type="text"
              name="courseName"
              placeholder="Course Name"
              value={formData.courseName}
              onChange={handleChange}
              className="border p-2 rounded"
            />
          </div>
        </div>
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="border p-2 rounded w-full mt-4"
        />
        <div className="flex justify-end mt-4 space-x-2">
          <button onClick={onClose} className="bg-gray-500 text-white px-4 py-2 rounded">Cancel</button>
          <button onClick={handleSave} className="bg-blue-500 text-white px-4 py-2 rounded">Update</button>
        </div>
      </div>
    </div>
  );
};

export default UpdateLead;