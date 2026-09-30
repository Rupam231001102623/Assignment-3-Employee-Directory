import { useState } from "react";
import "./App.css";

function App() {
  const [employees, setEmployees] = useState([
    {
      name: "Ravi Kumar",
      id: "EMP101",
      department: "Farming",
      gender: "Male",
      phone: "9876543210",
      localAddress: "Kolkata",
      permanentAddress: "Bihar"
    },
    {
      name: "Priya Das",
      id: "EMP102",
      department: "Dairy",
      gender: "Female",
      phone: "9123456780",
      localAddress: "Howrah",
      permanentAddress: "West Bengal"
    }
  ]);

  const [form, setForm] = useState({
    name: "",
    id: "",
    department: "",
    gender: "",
    phone: "",
    localAddress: "",
    permanentAddress: ""
  });

  const [search, setSearch] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("All");
  const [editIndex, setEditIndex] = useState(null);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !form.name ||
      !form.id ||
      !form.department ||
      !form.gender ||
      !form.phone ||
      !form.localAddress ||
      !form.permanentAddress
    ) {
      alert("Please fill all fields");
      return;
    }

    if (editIndex !== null) {
      const updatedEmployees = [...employees];
      updatedEmployees[editIndex] = form;
      setEmployees(updatedEmployees);
      setEditIndex(null);
    } else {
      setEmployees([...employees, form]);
    }

    setForm({
      name: "",
      id: "",
      department: "",
      gender: "",
      phone: "",
      localAddress: "",
      permanentAddress: ""
    });
  };

  const deleteEmployee = (index) => {
    setEmployees(employees.filter((_, i) => i !== index));
  };

  const editEmployee = (index) => {
    setForm(employees[index]);
    setEditIndex(index);
  };

  const filteredEmployees = employees.filter((employee) => {
    const matchesSearch =
      employee.name.toLowerCase().includes(search.toLowerCase()) ||
      employee.id.toLowerCase().includes(search.toLowerCase());

    const matchesDepartment =
      departmentFilter === "All" ||
      employee.department === departmentFilter;

    return matchesSearch && matchesDepartment;
  });

  const departments = [...new Set(employees.map((emp) => emp.department))];

  return (
    <div className="container">
      <h1>Employee Directory</h1>

      <div className="count">
        Total Employees: <strong>{employees.length}</strong>
      </div>

      <form onSubmit={handleSubmit} className="employee-form">
        <input
          type="text"
          name="name"
          placeholder="Employee Name"
          value={form.name}
          onChange={handleChange}
        />

        <input
          type="text"
          name="id"
          placeholder="Employee ID"
          value={form.id}
          onChange={handleChange}
        />

        <input
          type="text"
          name="department"
          placeholder="Department"
          value={form.department}
          onChange={handleChange}
        />

        <select
          name="gender"
          value={form.gender}
          onChange={handleChange}
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>

        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={form.phone}
          onChange={handleChange}
        />

        <input
          type="text"
          name="localAddress"
          placeholder="Local Address"
          value={form.localAddress}
          onChange={handleChange}
        />

        <input
          type="text"
          name="permanentAddress"
          placeholder="Permanent Address"
          value={form.permanentAddress}
          onChange={handleChange}
        />

        <button type="submit">
          {editIndex !== null ? "Update Employee" : "Add Employee"}
        </button>
      </form>

      <div className="controls">
        <input
          type="text"
          placeholder="Search by Name or ID"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={departmentFilter}
          onChange={(e) => setDepartmentFilter(e.target.value)}
        >
          <option value="All">All Departments</option>

          {departments.map((department) => (
            <option key={department} value={department}>
              {department}
            </option>
          ))}
        </select>
      </div>

      {filteredEmployees.length === 0 ? (
        <h3 className="no-data">No employees found.</h3>
      ) : (
        <div className="employee-list">
          {filteredEmployees.map((employee) => {
            const originalIndex = employees.indexOf(employee);

            return (
              <div className="employee-card" key={employee.id}>
                <h2>{employee.name}</h2>

                <p><strong>ID:</strong> {employee.id}</p>
                <p><strong>Department:</strong> {employee.department}</p>
                <p><strong>Gender:</strong> {employee.gender}</p>
                <p><strong>Phone:</strong> {employee.phone}</p>
                <p><strong>Local Address:</strong> {employee.localAddress}</p>
                <p>
                  <strong>Permanent Address:</strong>{" "}
                  {employee.permanentAddress}
                </p>

                <div className="buttons">
                  <button onClick={() => editEmployee(originalIndex)}>
                    Edit
                  </button>

                  <button
                    className="delete"
                    onClick={() => deleteEmployee(originalIndex)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default App;