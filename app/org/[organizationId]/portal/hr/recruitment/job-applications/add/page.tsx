"use client"; // Indicates that this component is a Client Component

import React from 'react';
import Link from 'next/link';
import { ArrowLeftToLine } from 'lucide-react';

const NewJobApplicationPage = () => {
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const jobApplication = Object.fromEntries(formData.entries());

        // Add your logic here to send the data to your backend
        console.log(jobApplication);
    };

    return (
        <div className="p-4 w-1/2">
            {/* Back button */}
            <div className="flex items-center">
                <button onClick={() => { window.history.back(); }} className="mb-4 mr-4 text-blue-500 hover:text-blue-700">
                    <ArrowLeftToLine />
                </button>
                <h1 className="text-3xl font-bold mb-6">Create a new job application</h1>
            </div>
            <form onSubmit={handleSubmit} className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Candidate Name */}
                <div className="mb-4">
                    <label htmlFor="candidateName" className="block text-sm font-medium text-gray-700">
                        Candidate Name
                    </label>
                    <input
                        type="text"
                        id="candidateName"
                        name="candidateName"
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    />
                </div>

                {/* Email */}
                <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    />
                </div>

                {/* Phone Number */}
                <div className="mb-4">
                    <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
                        Phone Number
                    </label>
                    <input
                        type="tel"
                        id="phoneNumber"
                        name="phoneNumber"
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    />
                </div>

                {/* Resume */}
                <div className="mb-4 md:col-span-2">
                    <label htmlFor="resume" className="block text-sm font-medium text-gray-700">
                        Resume
                    </label>
                    <input
                        type="file"
                        id="resume"
                        name="resume"
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    />
                </div>

                {/* Cover Letter */}
                <div className="mb-4 md:col-span-2">
                    <label htmlFor="coverLetter" className="block text-sm font-medium text-gray-700">
                        Cover Letter
                    </label>
                    <textarea
                        id="coverLetter"
                        name="coverLetter"
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    ></textarea>
                </div>

                {/* Job ID */}
                <div className="mb-4">
                    <label htmlFor="jobID" className="block text-sm font-medium text-gray-700">
                        Job ID
                    </label>
                    <input
                        type="text"
                        id="jobID"
                        name="jobID"
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    />
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded md:col-span-2"
                >
                    Submit Application
                </button>
            </form>
        </div>
    );
};

export default NewJobApplicationPage;
