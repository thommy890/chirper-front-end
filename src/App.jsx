import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'; // Assuming your global styles for body are defined here

const App = () => {
    // Initialize with some sample chirps
    const initialChirps = [
        { id: 1, message: 'Hello Chirper!', timestamp: new Date().toLocaleString() },
        { id: 2, message: 'Just setting up my Chirp', timestamp: new Date().toLocaleString() },
        { id: 3, message: 'What a great platform!', timestamp: new Date().toLocaleString() }
    ];

    const [chirps, setChirps] = useState(initialChirps);
    const [newChirp, setNewChirp] = useState('');
    const [editChirpId, setEditChirpId] = useState(null);
    const [editMessage, setEditMessage] = useState('');

    const handleEdit = (chirp) => {
        setEditChirpId(chirp.id);
        setEditMessage(chirp.message);
    };

    const handleSave = (id) => {
        setChirps(chirps.map(chirp => chirp.id === id ? { ...chirp, message: editMessage } : chirp));
        setEditChirpId(null);
    };

    const handleDelete = (chirpId) => {
        setChirps(chirps.filter(chirp => chirp.id !== chirpId));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (newChirp.trim() === '') return;
        const newChirpObj = {
            id: chirps.length + 1,
            message: newChirp,
            timestamp: new Date().toLocaleString()
        };
        setChirps([...chirps, newChirpObj]);
        setNewChirp('');
    };

    return (
        <div className="container mt-5">
            <header className="text-center mb-4">
                <h1 className="display-4 text-white">Chirper Timeline</h1>
            </header>
            <div className="card p-3 mb-3">
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        className="form-control mb-2"
                        value={newChirp}
                        onChange={(e) => setNewChirp(e.target.value)}
                        placeholder="What's happening?"
                    />
                    <button type="submit" className="btn btn-primary">Chirp</button>
                </form>
            </div>
            <div>
                {chirps.map((chirp) => (
                    <div key={chirp.id} className="card text-dark bg-white mb-2 p-3">
                        {editChirpId === chirp.id ? (
                            <div>
                                <input type="text" className="form-control" value={editMessage} onChange={(e) => setEditMessage(e.target.value)} />
                                <button className="btn btn-secondary btn-sm mt-2" onClick={() => handleSave(chirp.id)}>Save</button>
                            </div>
                        ) : (
                            <div>
                                <p className="font-weight-bold">{chirp.message}</p>
                                <small>{chirp.timestamp}</small>
                                <div>
                                    <button className="btn btn-secondary btn-sm mr-2" onClick={() => handleEdit(chirp)}>Edit</button>
                                    <button className="btn btn-secondary btn-sm" onClick={() => handleDelete(chirp.id)}>Delete</button>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default App;
