import { useState } from "react";
import TableHeader from "../TableHeader";
import CreateCourse from "../Courses/CreateCourse";
const Courses = () => {
  const [leads, setLeads] = useState([
    {
      id: 1,
      createdOn: "20 Apr, 2024, 9:59 AM",
      course: "Salesforce",
      courseFee:"9999"
    },
    {
      id: 2,
      createdOn: "23 Apr, 2024, 3:35 PM",
      course: "Manual testing",
      courseFee:"9999"
    },
  ]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const handleSelectAll = (event) => {
    if (event.target.checked) {
      setSelectedRows(leads.map((lead) => lead.id));
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
  const handleCreateLead = () => {
    setIsModalOpen(true);
  };
  const handleSaveLead = (formData) => {
    const newLead = {
      id: leads.length + 1,
      createdOn: new Date().toLocaleString(),
      course: formData.courseName,
      courseFee:formData.courseFee
    };
    setLeads([...leads, newLead]);
    console.log("Saved Lead:", formData);
  };
  const handleSearch = (query) => {
    setSearchQuery(query);
  };
  const handleDeleteSelected = () => {
    setLeads(leads.filter((lead) => !selectedRows.includes(lead.id)));
    setSelectedRows([]);
  };
  const filteredLeads = leads.filter((lead) =>
    lead.course.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lead.courseFee.toLowerCase().includes(searchQuery.toLowerCase())
  );
  return (
    <div className="mx-6 mt-28 p-8 bg-white border-2 border-gray-200 rounded-lg shadow-lg">
      <TableHeader
        onCreateLead={handleCreateLead}
        onSearch={handleSearch}
        onDelete={handleDeleteSelected}
      />
      <table className="min-w-full mt-4 bg-white border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-3 px-4 border-b text-left text-gray-600">
              <input
                type="checkbox"
                onChange={handleSelectAll}
                checked={selectedRows.length === leads.length}
              />
            </th>
            <th className="py-3 px-4 border-b text-left text-gray-600">Created on</th>
            <th className="py-3 px-4 border-b text-left text-gray-600">Course</th>
            <th className="py-3 px-4 border-b text-left text-gray-600">Course Fee</th>
          </tr>
        </thead>
        <tbody>
          {filteredLeads.map((lead) => (
            <tr
              key={lead.id}
              className={`${
                selectedRows.includes(lead.id) ? "bg-blue-200" : "bg-white"
              }`}
            >
              <td className="py-3 px-4 border-b">
                <input
                  type="checkbox"
                  checked={selectedRows.includes(lead.id)}
                  onChange={(event) => handleSelectRow(event, lead.id)}
                />
              </td>
              <td className="py-3 px-4 border-b">{lead.createdOn}</td>
              <td className="py-3 px-4 border-b">
                <span className="px-2 py-1 bg-yellow-400 text-white rounded">
                  {lead.course}
                </span>
              </td>
              <td className="py-3 px-4 border-b text-black">{lead.courseFee}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <CreateCourse
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveLead}
      />
    </div>
)
}
export default Courses