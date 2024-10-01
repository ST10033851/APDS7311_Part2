import React from 'react';

const DeleteConfirmationModal = ({ transaction, onDelete, onCancel }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white rounded shadow-lg p-6 w-1/3">
        <h2 className="text-lg font-bold mb-4">Confirm Deletion</h2>
        <p>Are you sure you want to delete the transaction titled "{transaction.transactionTitle}"?</p>
        <div className="mt-4 flex justify-end">
          <button
            className="bg-red-600 text-white px-4 py-2 rounded mr-2"
            onClick={onDelete}
          >
            Yes, Delete
          </button>
          <button
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
