import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import TuitionForm from '../components/TuitionForm';
import TuitionList from '../components/TuitionList';
import { FaPlus } from 'react-icons/fa';

const Home = () => {
  const [tuitions, setTuitions] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchTuitions = async () => {
      try {
        const response = await fetch('/api/tuitions');
        const result = await response.json();
        console.log('Fetched tuitions:', result.data); // Debugging line
        setTuitions(result.data);
      } catch (error) {
        console.error('Error fetching tuitions:', error);
      }
    };

    fetchTuitions();
  }, []);

  const handleAddTuition = async (newTuition) => {
    try {
      const response = await fetch('/api/tuitions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newTuition)
      });
      const result = await response.json();
      console.log('Added tuition:', result.data); // Debugging line
      setTuitions([...tuitions, result.data]);
      setIsModalOpen(false); // Close the modal after adding tuition
    } catch (error) {
      console.error('Error adding tuition:', error);
    }
  };

  const handleDeleteTuition = async (id) => {
    try {
      await fetch('/api/tuitions', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id })
      });
      setTuitions(tuitions.filter(tuition => tuition._id !== id));
    } catch (error) {
      console.error('Error deleting tuition:', error);
    }
  };

  const handleEditTuition = async (updatedTuition) => {
    try {
      const response = await fetch('/api/tuitions', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedTuition)
      });
      const result = await response.json();
      console.log('Updated tuition:', result.data); // Debugging line
      setTuitions(tuitions.map(tuition => tuition._id === result.data._id ? result.data : tuition));
    } catch (error) {
      console.error('Error updating tuition:', error);
    }
  };

  return (
    <Layout>
      {/* Floating Action Button */}
      <button 
        className="btn btn-primary btn-circle fixed bottom-8 right-8 z-50 shadow-lg" 
        onClick={() => setIsModalOpen(true)}
      >
        <FaPlus className="text-xl" />
      </button>

      {/* Modal */}
      {isModalOpen && (
        <dialog open className="modal">
  <div className="modal-box relative bg-base-300">
    <button 
      className="btn btn-sm btn-circle btn-ghost absolute right-4 top-4" 
      onClick={() => setIsModalOpen(false)}
    >
      ✕
    </button>
    <TuitionForm onAdd={handleAddTuition} />
  </div>
</dialog>

      )}

      <TuitionList tuitions={tuitions} onDelete={handleDeleteTuition} onEdit={handleEditTuition} />
    </Layout>
  );
};

export default Home;
