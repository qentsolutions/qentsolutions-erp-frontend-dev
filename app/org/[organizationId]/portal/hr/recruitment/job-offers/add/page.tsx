"use client"; // Indicates that this component is a Client Component

import React from 'react';
import Link from 'next/link';
import { ArrowLeftToLine } from 'lucide-react';

const NewJobOfferPage = () => {
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const jobOffer = Object.fromEntries(formData.entries());

        // Add your logic here to send the data to your backend
        console.log(jobOffer);
    };

    return (
        <div className="p-4 w-1/2">
            {/* Back button */}
            <div className="flex items-center">
                <button onClick={() => { window.history.back(); }} className="mb-4 mr-4 text-blue-500 hover:text-blue-700">
                    <ArrowLeftToLine />
                </button>
                <h1 className="text-3xl font-bold mb-6">Create a new job offer</h1>
            </div>
            <form onSubmit={handleSubmit} className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Title */}
                <div className="mb-4">
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                        Title
                    </label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    />
                </div>

                {/* Description */}
                <div className="mb-4 md:col-span-2">
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                        Description
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    ></textarea>
                </div>

                {/* Location */}
                <div className="mb-4">
                    <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                        Location
                    </label>
                    <input
                        type="text"
                        id="location"
                        name="location"
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    />
                </div>

                {/* Recruiter */}
                <div className="mb-4">
                    <label htmlFor="recruiter" className="block text-sm font-medium text-gray-700">
                        Recruiter
                    </label>
                    <input
                        type="text"
                        id="recruiter"
                        name="recruiter"
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    />
                </div>

                {/* Manager */}
                <div className="mb-4">
                    <label htmlFor="manager" className="block text-sm font-medium text-gray-700">
                        Manager
                    </label>
                    <input
                        type="text"
                        id="manager"
                        name="manager"
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    />
                </div>

                {/* Posting Date */}
                <div className="mb-4">
                    <label htmlFor="posted" className="block text-sm font-medium text-gray-700">
                        Posting Date
                    </label>
                    <input
                        type="date"
                        id="posted"
                        name="posted"
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    />
                </div>

                {/* Deadline */}
                <div className="mb-4">
                    <label htmlFor="deadline" className="block text-sm font-medium text-gray-700">
                        Deadline
                    </label>
                    <input
                        type="date"
                        id="deadline"
                        name="deadline"
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    />
                </div>

                {/* Annual Salary */}
                <div className="mb-4">
                    <label htmlFor="salary" className="block text-sm font-medium text-gray-700">
                        Annual Salary
                    </label>
                    <input
                        type="text"
                        id="salary"
                        name="salary"
                        required
                        placeholder="$110,000 - $130,000"
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    />
                </div>

                {/* Notes */}
                <div className="mb-4 md:col-span-2">
                    <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
                        Notes
                    </label>
                    <textarea
                        id="notes"
                        name="notes"
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    ></textarea>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded md:col-span-2"
                >
                    Create Offer
                </button>
            </form>
        </div>
    );
};

export default NewJobOfferPage;
