// This code was inspired by Flowbite
// Title: Tailwind CSS Table - Flowbite
// Uploaded by: Flowbite
// Available at: https://flowbite.com/docs/components/tables/
import React from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';

const TableBody = ({ transactions, setTransactionToEdit, confirmDelete, onSubmitToSWIFT }) => (
  <tbody>
    {transactions.map((item) => (
      <tr
        key={item._id} // Use a unique identifier
        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
      >
        <td className="px-6 py-4">{item.transactionTitle}</td>
        <td className="px-6 py-4">{item.amount}</td>
        <td className="px-6 py-4">{item.currency}</td>
        <td className="px-6 py-4">{item.description}</td>
        <td className="px-6 py-4">{item.transactionStatus}</td>
        <td className="px-6 py-4">{item.paymentMethod}</td>
        <td className="px-6 py-4">{item.paymentCode}</td>
        <td className="px-6 py-4">{item.isVerified}</td>
        <td className="px-6 py-4 text-right">
          <button onClick={() => setTransactionToEdit(item)} className="text-blue-600 dark:text-blue-500 hover:text-blue-700" aria-label="Edit transaction">
            <FaEdit className="h-5 w-5 inline" />
          </button>
        </td>
        <td className="px-6 py-4 text-right">
          <button onClick={() => confirmDelete(item)} className="text-red-500 hover:text-red-700" aria-label="Delete transaction">
            <FaTrash className="h-5 w-5 inline" />
          </button>
        </td>
        {onSubmitToSWIFT && (
          <td className="px-6 py-4 text-right">
            <button 
              onClick={() => onSubmitToSWIFT(item._id)} 
              style={{
                border: '2px solid green',
                backgroundColor: item.isVerified === "Verified" ? 'gray' : 'green',
                color: 'white',
                cursor: item.isVerified === "Verified" ? 'not-allowed' : 'pointer',
                padding: '0.5rem 1rem',
                borderRadius: '0.25rem',
                borderColor: item.isVerified === "Verified" ? 'gray' : 'green',
              }}
              disabled={item.isVerified === "Verified"}
              aria-label="Submit to SWIFT"
            >
              Submit to SWIFT
            </button>
          </td>
        )}
      </tr>
    ))}
  </tbody>
);

export default TableBody;
