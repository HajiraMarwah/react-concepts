    import React, { useState, useMemo } from "react";
    const employeeDetails = [
    { id: 1, name: "hajira", department: "Engineering", location: "Bengaluru" },
    { id: 2, name: "Rohit Singh", department: "Marketing", location: "Mumbai" },
    { id: 3, name: "Neha Patel", department: "Finance", location: "Delhi" },
    { id: 4, name: "Amit Kumar", department: "Engineering", location: "Pune" },
    { id: 5, name: "Sara Khan", department: "HR", location: "Hyderabad" },
    ];
    function FilterSearch() {
    const [searchVal, setSearchVal] = useState("");
    const [filterDept, setFilterDept] = useState("All");
    const filteredEmployee = useMemo(() => {
        return employeeDetails.filter((emp) => {
        const macthSearch = emp.name
            .toLowerCase()
            .includes(searchVal.toLowerCase());
        const matchFilter = filterDept === "All" || emp.department === filterDept;
        return macthSearch && matchFilter;
        });
    }, [searchVal, filterDept]);

    return (
        <div>
        <h1>Employee details</h1>
        {/* search input */}
        <input
            style={{ borderRadius: "8px", border: "1px solid #ccc" }}
            type="text"
            value={searchVal}
            onChange={(e) => setSearchVal(e.target.value)}
        />
        {/* filter  */}
        <select
            value={filterDept}
            onChange={(e) => setFilterDept(e.target.value)}
        >
            <option value="ALL">All</option>
            <option value="Engineering">Engineering</option>
            <option value="Marketing">Marketing</option>
            <option value="Finance">Finance</option>
            <option value="HR">HR</option>
        </select>
        {/* table  */}
        <table style={{borderCollapse:"collapse"}}>
            <thead>
            <tr>
                <th style={thstyle}>ID</th>
                <th style={thstyle}>Name</th>
                <th style={thstyle}>Department</th>
                <th style={thstyle}>Location</th>
            </tr>
            </thead>
            <tbody>
            {filteredEmployee.length > 0 ? (
                filteredEmployee.map((emp) => (
                <>
                    <tr>
                    <td style={tdStyle}>{emp.id}</td>
                    <td style={tdStyle}>{emp.name}</td>
                    <td style={tdStyle}>{emp.department}</td>
                   <td style={tdStyle}>{emp.location}</td>

                    </tr>
                </>
                ))
            ) : (
                <>
                <tr>
                    <td>No matching records</td>
                </tr>
                </>
            )}
            </tbody>
        </table>
        </div>
    );

    }
    const thstyle={borderBottom:"1px solid #ddd",textAlign:"left",padding:"8px"}
    const tdStyle={borderBottom:"2px solid #eee",padding:"8px"}
    export default FilterSearch;
