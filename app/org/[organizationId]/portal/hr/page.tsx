"use client";
import React from 'react';
import { useRouter } from 'next/navigation';

const HumanResourcesPage = () => {

    // Données fixes pour les employés et les départements
    const employeesData = [
        { id: 1, name: "Alice Johnson", position: "HR Manager" },
        { id: 2, name: "Bob Smith", position: "Recruiter" },
        { id: 3, name: "Charlie Brown", position: "Payroll Specialist" },
        { id: 4, name: "Diana Prince", position: "HR Assistant" },
    ];

    const departmentsData = [
        { id: 1, name: "Recruitment" },
        { id: 2, name: "Employee Relations" },
        { id: 3, name: "Compensation and Benefits" },
        { id: 4, name: "Training and Development" },
    ];

    // État pour les employés et les départements
    const [employees] = React.useState(employeesData);
    const [departments] = React.useState(departmentsData);

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Human Resources</h1>

            <section className="mb-8">
                <h2 className="text-xl font-semibold">Employees</h2>
                <ul>
                    {employees.length > 0 ? (
                        employees.map((employee) => (
                            <li key={employee.id} className="mb-2">
                                {employee.name} - {employee.position}
                            </li>
                        ))
                    ) : (
                        <li>No employees found.</li>
                    )}
                </ul>
            </section>

            <section>
                <h2 className="text-xl font-semibold">Departments</h2>
                <ul>
                    {departments.length > 0 ? (
                        departments.map((department) => (
                            <li key={department.id} className="mb-2">
                                {department.name}
                            </li>
                        ))
                    ) : (
                        <li>No departments found.</li>
                    )}
                </ul>
            </section>
        </div>
    );
};

export default HumanResourcesPage;
