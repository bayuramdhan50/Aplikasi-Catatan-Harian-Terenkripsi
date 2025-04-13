import React, { useState } from 'react';
import { motion } from 'framer-motion';
import CryptoJS from 'crypto-js';
import { IoSave, IoClose } from 'react-icons/io5';

const NoteForm = ({ addNote, editingNote, setEditingNote, updateNote }) => {
  const [noteText, setNoteText] = useState(editingNote ? editingNote.text : '');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!noteText.trim()) {
      setError('Catatan tidak boleh kosong!');
      return;
    }
    
    // Secret key for encryption - in a real app, this should be handled more securely
    const secretKey = 'catatan-harian-rahasia-key';
    
    // Encrypt the note text
    const encryptedText = CryptoJS.AES.encrypt(noteText, secretKey).toString();
    
    const currentDate = new Date();
    
    if (editingNote) {
      updateNote({
        ...editingNote,
        text: noteText,
        encryptedText,
        lastEdited: currentDate
      });
      setEditingNote(null);
    } else {
      // Create a new note object
      const newNote = {
        id: Date.now().toString(),
        text: noteText,
        encryptedText,
        createdAt: currentDate,
        lastEdited: currentDate
      };
      
      addNote(newNote);
    }
    
    // Reset form
    setNoteText('');
    setError('');
  };

  const handleCancel = () => {
    setEditingNote(null);
    setNoteText('');
    setError('');
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="card mb-6"
    >
      <h2 className="text-xl font-semibold mb-4 text-primary-800">
        {editingNote ? 'Edit Catatan' : 'Tulis Catatan Baru'}
      </h2>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <textarea
            className="textarea"
            placeholder="Apa yang ada dalam pikiranmu hari ini?"
            value={noteText}
            onChange={(e) => {
              setNoteText(e.target.value);
              if (error) setError('');
            }}
            rows={5}
          />
          {error && (
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-red-500 text-sm mt-1"
            >
              {error}
            </motion.p>
          )}
        </div>
        
        <div className="flex justify-between">
          {editingNote && (
            <button
              type="button"
              onClick={handleCancel}
              className="btn flex items-center gap-2 bg-primary-200 hover:bg-primary-300 text-primary-800"
            >
              <IoClose className="text-lg" />
              <span>Batal</span>
            </button>
          )}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            className={`btn btn-primary flex items-center gap-2 ${editingNote ? '' : 'ml-auto'}`}
          >
            <IoSave className="text-lg" />
            <span>Simpan</span>
          </motion.button>
        </div>
      </form>
    </motion.div>
  );
};

export default NoteForm;
