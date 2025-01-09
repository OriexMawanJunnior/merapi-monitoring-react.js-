import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setDisasters, addDisaster, updateDisaster, deleteDisaster } from '../store/disasterSlice';
import { dbService } from '../services/auth';

const Dashboard = () => {
    const dispatch = useDispatch();
    const disasters = useSelector(state => state.disaster.disasters);
    const [error, setError] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedDisaster, setSelectedDisaster] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
      title: '',
      location: '',
      description: '',
      severity: 'low'
    });
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await dbService.get('/disasters.json');
          const data = response.data;
          const disasterArray = data ? Object.entries(data).map(([id, value]) => ({
            id,
            ...value
          })) : [];
          dispatch(setDisasters(disasterArray));
        } catch (err) {
          setError('Error: ' + err.message);
        }
      };
      fetchData();
    }, [dispatch]);
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      if (!validateForm()) return;
  
      try {
        if (isEditing && selectedDisaster) {
          await dbService.put(`/disasters/${selectedDisaster.id}.json`, formData);
          dispatch(updateDisaster({ id: selectedDisaster.id, ...formData }));
        } else {
          const response = await dbService.post('/disasters.json', {
            ...formData,
            timestamp: Date.now()
          });
          dispatch(addDisaster({ id: response.data.name, ...formData }));
        }
        resetForm();
      } catch (err) {
        setError('Error: ' + err.message);
      }
    };
  
    const handleDelete = async (id) => {
      try {
        await dbService.delete(`/disasters/${id}.json`);
        dispatch(deleteDisaster(id));
        setShowDeleteModal(false);
      } catch (err) {
        setError('Error: ' + err.message);
      }
    };

  const handleEdit = (disaster) => {
    setIsEditing(true);
    setSelectedDisaster(disaster);
    setFormData({
      title: disaster.title,
      location: disaster.location,
      description: disaster.description,
      severity: disaster.severity || 'low'
    });
  };

  const validateForm = () => {
    if (!formData.title.trim()) {
      setError('Judul harus diisi');
      return false;
    }
    if (!formData.location.trim()) {
      setError('Lokasi harus diisi');
      return false;
    }
    return true;
  };

  const resetForm = () => {
    setFormData({
      title: '',
      location: '',
      description: '',
      severity: 'low'
    });
    setIsEditing(false);
    setSelectedDisaster(null);
    setError(null);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard Monitoring Merapi</h1>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
          <button onClick={() => setError(null)} className="float-right">&times;</button>
        </div>
      )}

      <div className="mb-8 bg-white p-4 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4">
          {isEditing ? 'Edit Data' : 'Tambah Data Baru'}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-2">Judul</label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                required
              />
            </div>
            <div>
              <label className="block mb-2">Lokasi</label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                value={formData.location}
                onChange={(e) => setFormData({...formData, location: e.target.value})}
                required
              />
            </div>
          </div>
          <div className="mt-4">
            <label className="block mb-2">Deskripsi</label>
            <textarea
              className="w-full p-2 border rounded"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
            />
          </div>
          <div className="mt-4">
            <label className="block mb-2">Severity</label>
            <select
              className="w-full p-2 border rounded"
              value={formData.severity}
              onChange={(e) => setFormData({...formData, severity: e.target.value})}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
          <div className="mt-4 flex gap-2">
            <button 
              type="submit" 
              className="bg-blue-600 text-white p-2 rounded"
            >
              {isEditing ? 'Update Data' : 'Tambah Data'}
            </button>
            {isEditing && (
              <button
                type="button"
                onClick={resetForm}
                className="bg-gray-500 text-white p-2 rounded"
              >
                Batal
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="bg-white rounded-lg shadow">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-4 text-left">Judul</th>
              <th className="p-4 text-left">Lokasi</th>
              <th className="p-4 text-left">Deskripsi</th>
              <th className="p-4 text-left">Severity</th>
              <th className="p-4 text-left">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {disasters.map((disaster) => (
              <tr key={disaster.id} className="border-t">
                <td className="p-4">{disaster.title}</td>
                <td className="p-4">{disaster.location}</td>
                <td className="p-4">{disaster.description}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded ${
                    disaster.severity === 'high' ? 'bg-red-100 text-red-800' :
                    disaster.severity === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {disaster.severity}
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex gap-2">
                    <button 
                      onClick={() => handleEdit(disaster)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => {
                        setSelectedDisaster(disaster);
                        setShowDeleteModal(true);
                      }}
                      className="text-red-600 hover:text-red-800"
                    >
                      Hapus
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-lg max-w-md">
            <h3 className="text-lg font-bold mb-4">Konfirmasi Hapus</h3>
            <p>Anda yakin ingin menghapus data "{selectedDisaster?.title}"?</p>
            <div className="mt-4 flex justify-end gap-2">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Batal
              </button>
              <button
                onClick={() => handleDelete(selectedDisaster.id)}
                className="bg-red-600 text-white px-4 py-2 rounded"
              >
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;