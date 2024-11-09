// This code was inspired by Flowbite
// Title: Tailwind CSS Table - Flowbite
// Uploaded by: Flowbite
// Available at: https://flowbite.com/docs/components/tables/
import React from 'react';

const TableHeader = ({ showSubmit }) => (
  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 rounded-lg">
    <tr>
      <th scope="col" className="px-6 py-3">
        Transaction Title
      </th>
      <th scope="col" className="px-6 py-3">
        Amount
      </th>
      <th scope="col" className="px-6 py-3">
        Currency
      </th>
      <th scope="col" className="px-6 py-3">
        Description
      </th>
      <th scope="col" className="px-6 py-3">
        Status
      </th>
      <th scope="col" className="px-6 py-3">
        Payment Method
      </th>
      <th scope="col" className="px-6 py-3">
        Payment Code
      </th>
      <th scope="col" className="px-6 py-3">
        Verification Status
      </th>
      <th scope="col" className="px-6 py-3"><span className="sr-only">Edit</span></th>
      <th scope="col" className="px-6 py-3"><span className="sr-only">Delete</span></th>
      {showSubmit && (
        <th scope="col" className="px-6 py-3"><span className="sr-only">Submit</span></th>
      )}
    </tr>
  </thead>
);

export default TableHeader;
