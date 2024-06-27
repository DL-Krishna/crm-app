import React from 'react';
import axios from 'axios';
import { useState, useEffect } from "react";
import TableHeader from "../TableHeader";
import CreateCourse from "../Courses/CreateCourse"; // Make sure this path is correct
import UpdateCourse from './UpdateCourse'; // Make sure this path is correct
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { baseUrl } from "../../api/BaseUrl";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [currentCourse, setCurrentCourse] = useState(null); // State to store the course being updated
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false); // State to track loading status
  const [isDeleteLoading, setIsDeleteLoading] = useState(false); // State to track delete loading status

  useEffect(() => {
    const fetchCourses = async () => {
      setIsLoading(true);
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${baseUrl}/courses`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const createCourses=response.data.courses.filter(course=>course.courseStage==="course")
       .sort ((a,b)=>new Date(b.createdAt)-new Date(a.createdAt));;
       setCourses(createCourses);
        setCourses(response.data.courses);
      } catch (error) {
        console.error('Error fetching courses:', error);
        toast.error("Failed to fetch courses");
      }
      setIsLoading(false);
    };
    fetchCourses();
  }, []);

  const handleSelectAll = (event) => {
    if (event.target.checked) {
      setSelectedRows(courses.map((course) => course.id));
    } else {
      setSelectedRows([]);
    }
  };

  const handleSelectRow = (event, id) => {
    if (event.target.checked) {
      setSelectedRows([...selectedRows, id]);
    } else {
      setSelectedRows(selectedRows.filter((rowId) => rowId !== id));
    }
  };

  const handleCreateCourse = () => {
    setIsModalOpen(true);
  };

  const handleSaveCourse = (newCourse) => {
    setCourses([newCourse, ...courses]);
    setIsModalOpen(false);
  };

  const handleUpdateCourse = (updatedCourse) => {
    setCourses(courses.map(course => (course.id === updatedCourse.id ? updatedCourse : course)));
    setIsUpdateModalOpen(false);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleDeleteSelected = async () => {
    setIsDeleteLoading(true); // Start delete loading
    try {
      const token = localStorage.getItem('token');
      await Promise.all(selectedRows.map(id => 
        axios.delete(`${baseUrl}/courses/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        })
      ));
      setCourses(courses.filter(course => !selectedRows.includes(course.id)));
      setSelectedRows([]);
      toast.success("Courses deleted successfully");
    } catch (error) {
      console.error('Error deleting courses:', error);
      toast.error("Failed to delete courses");
    }
    setIsDeleteLoading(false); // End delete loading
  };

  const handleRowClick = (course) => {
    setCurrentCourse(course);
    setIsUpdateModalOpen(true);
  };

  const filteredCourses = courses.filter((course) =>
    course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.fee.toString().toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="mx-6 mt-28 p-8 bg-white border-2 border-gray-200 rounded-lg shadow-lg">
      <ToastContainer />
      <TableHeader
        onCreateLead={handleCreateCourse}
        onSearch={handleSearch}
        onDelete={handleDeleteSelected}
        isDeleteLoading={isDeleteLoading}
      />
      {isLoading ? (
        <div className="flex justify-center items-center">
          <div className="w-16 h-16 border-4 border-blue-400 border-t-4 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <table className="min-w-full mt-4 bg-white border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-3 px-4 border-b text-left text-gray-600">
                <input
                  type="checkbox"
                  onChange={handleSelectAll}
                  checked={selectedRows.length === courses.length}
                />
              </th>
              <th className="py-3 px-4 border-b text-left text-gray-600">Created on</th>
              <th className="py-3 px-4 border-b text-left text-gray-600">Course Name</th>
              <th className="py-3 px-4 border-b text-left text-gray-600">Course Fee</th>
            </tr>
          </thead>
          <tbody>
            {filteredCourses.map((course) => (
              <tr
                key={course.id}
                className={selectedRows.includes(course.id) ? "bg-blue-200" : "bg-white hover:bg-blue-100"}
                onClick={() => handleRowClick(course)}
              >
                <td className="py-3 px-4 border-b">
                  <input
                    type="checkbox"
                    checked={selectedRows.includes(course.id)}
                    onChange={(event) => handleSelectRow(event, course.id)}
                    onClick={(e) => e.stopPropagation()} // Prevent row click event from triggering
                  />
                </td>
                <td className="py-3 px-4 border-b">
                {new Date(course.createdAt).toLocaleString('en-US', {
                  day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true
                })}
              </td>
                <td className="py-3 px-4 border-b">{course.name}</td>
                <td className="py-3 px-4 border-b">{course.fee}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {isModalOpen && (
        <CreateCourse isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSave={handleSaveCourse} />
      )}
      {isUpdateModalOpen && currentCourse && (
        <UpdateCourse isOpen={isUpdateModalOpen} onClose={() => setIsUpdateModalOpen(false)} course={currentCourse} onSave={handleUpdateCourse} />
      )}
    </div>
  );
};

export default Courses;
