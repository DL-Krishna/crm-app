import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { baseUrl } from "../../api/BaseUrl";

// eslint-disable-next-line react/prop-types
const UpdateLead = ({ isOpen, onClose, lead, onSave }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    courseName: "",
    description: "",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false); // State to track loading status
  const [courses, setCourses] = useState([]); // State to store courses data

  useEffect(() => {
    if (isOpen && lead) {
      setFormData({
        name: lead.name,
        email: lead.email,
        phone: lead.phone,
        courseName: lead.techStack,
        description: lead.description || "",
      });
      setErrors({});
       // Fetch courses data
       const fetchCourses = async () => {
        try {
          const token = localStorage.getItem('token');
          const response = await axios.get(`${baseUrl}/courses`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          setCourses(response.data.courses);
        } catch (error) {
          console.error('Error fetching courses:', error);
          toast.error("Failed to fetch courses");
        }
      };

      fetchCourses();
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
    if (!formData.phone) {
      newErrors.phone = "Phone is mandatory";
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
      description: formData.description,
    };
    setIsLoading(true);

    try {
      const token = localStorage.getItem("token");
      const userId = JSON.parse(localStorage.getItem("userInfo")).userId;
      await axios.put(
        `${baseUrl}/leads/${lead.id}`,
        { ...payload, userId },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success("Lead updated successfully");
      onSave({ ...lead, ...payload });
      onClose();
    } catch (error) {
      console.error("Error updating lead:", error);
      toast.error("Failed to update lead");
    }
    setIsLoading(false);
  };

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
      <div className='bg-white p-6 rounded-lg shadow-lg w-1/2'>
        <h2 className='text-xl mb-4'>Update Lead</h2>
        <div className='grid grid-cols-2 gap-4'>
          <div className='flex flex-col'>
            <input
              type='text'
              name='name'
              placeholder='Name'
              value={formData.name}
              onChange={handleChange}
              className='border p-2 rounded'
              required
            />
            {errors.name && (
              <span className='text-red-500 text-sm mt-1'>{errors.name}</span>
            )}
          </div>
          <div className='flex flex-col'>
            <input
              type='email'
              name='email'
              placeholder='Email'
              value={formData.email}
              onChange={handleChange}
              className='border p-2 rounded'
            />
          </div>
          <div className='flex flex-col'>
            <input
              type='number'
              name='phone'
              placeholder='Phone'
              value={formData.phone}
              onChange={handleChange}
              className='border p-2 rounded'
            />
          </div>
          <div className='flex flex-col'>
          <select
              name="courseName"
              value={formData.courseName}
              onChange={handleChange}
              className="border p-2 rounded"
            >
              <option value="">Select Course</option>
              {courses.map(course => (
                <option key={course.id} value={course.name}>{course.name}</option>
              ))}
            </select>
          </div>
        </div>
        <textarea
          name='description'
          placeholder='Description'
          value={formData.description}
          onChange={handleChange}
          className='border p-2 rounded w-full mt-4'
        />
        <div className='flex justify-end mt-4 space-x-2'>
          <button
            onClick={onClose}
            className='bg-gray-500 text-white px-4 py-2 rounded'
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className='bg-blue-500 text-white px-4 py-2 flex rounded'
          >
            Update
            {isLoading && (
              <svg
                className='animate-spin h-5 w-5 mr-3 border-t-2 border-b-2 border-white rounded-full'
                viewBox='0 0 24 24'
              ></svg>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateLead;
