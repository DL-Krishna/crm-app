import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { baseUrl } from '../../api/BaseUrl';

// eslint-disable-next-line react/prop-types
const UpdateCourse = ({ isOpen, onClose, course, onSave }) => {
  const [formData, setFormData] = useState({ name: '', fee: '', description: '' });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen && course) {
      setFormData({
        name: course.name,
        fee: course.fee,
        description: course.description || '',
      });
      setErrors({});
    }
  }, [isOpen, course]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = async () => {
    const newErrors = {};
    if (!formData.name) {
      newErrors.name = "Course Name is mandatory";
    }
    if (!formData.fee) {
      newErrors.fee = "Course Fee is mandatory";
    }
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const payload = {
      name: formData.name,
      fee: formData.fee,
      description: formData.description,
    };
    setIsLoading(true);

    try {
      const token = localStorage.getItem('token');
      const userId = JSON.parse(localStorage.getItem('userInfo')).userId;
      await axios.put(`${baseUrl}/courses/${course.id}`, { ...payload, userId }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success("Course updated successfully");
      onSave({ ...course, ...payload });
      onClose();
    } catch (error) {
      console.error('Error updating course:', error);
      toast.error("Failed to update course");
    }
    setIsLoading(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/2">
        <h2 className="text-xl mb-4">Update Course</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col">
            <input
              type="text"
              name="name"
              placeholder="Course Name"
              value={formData.name}
              onChange={handleChange}
              className="border p-2 rounded"
              required
            />
            {errors.name && <span className="text-red-500 text-sm mt-1">{errors.name}</span>}
          </div>
          <div className="flex flex-col">
            <input
              type="text"
              name="fee"
              placeholder="Course Fee"
              value={formData.fee}
              onChange={handleChange}
              className="border p-2 rounded"
            />
            {errors.fee && <span className="text-red-500 text-sm mt-1">{errors.fee}</span>}
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
          <button onClick={handleSave} className="bg-blue-500 text-white px-4 py-2 flex rounded">
            {isLoading && (
              <svg className="animate-spin h-5 w-5 mr-3 border-t-2 border-b-2 border-white rounded-full" viewBox="0 0 24 24"></svg>
            )}
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateCourse;
