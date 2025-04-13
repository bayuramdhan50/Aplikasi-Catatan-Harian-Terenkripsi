import React from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { IoEye, IoPencil, IoTrash } from 'react-icons/io5';

const NoteItem = ({ note, index, onView, onEdit, onDelete }) => {
  // Format the date to be more readable
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return format(date, 'dd MMM yyyy, HH:mm');
  };

  // Get a preview of the note text (first 80 characters)
  const getNotePreview = (text) => {
    if (text.length <= 80) return text;
    return text.substring(0, 80) + '...';
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ 
        duration: 0.3,
        delay: index * 0.05, // Stagger the animations based on index
      }}
      className="card mb-4 hover:shadow-soft-lg transition-shadow"
    >
      <div className="mb-3">
        <p className="line-clamp-3 text-primary-700">{getNotePreview(note.text)}</p>
      </div>
      
      <div className="flex items-center justify-between text-sm text-primary-500">
        <p>{formatDate(note.lastEdited || note.createdAt)}</p>
        
        <div className="flex space-x-2">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onView(note)}
            className="p-1.5 rounded-full bg-primary-100 text-primary-700 hover:bg-primary-200"
            aria-label="Lihat catatan"
          >
            <IoEye />
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onEdit(note)}
            className="p-1.5 rounded-full bg-primary-100 text-primary-700 hover:bg-primary-200"
            aria-label="Edit catatan"
          >
            <IoPencil />
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.1, backgroundColor: '#FEE2E2' }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onDelete(note.id)}
            className="p-1.5 rounded-full bg-primary-100 text-red-500 hover:bg-red-100"
            aria-label="Hapus catatan"
          >
            <IoTrash />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default NoteItem;
