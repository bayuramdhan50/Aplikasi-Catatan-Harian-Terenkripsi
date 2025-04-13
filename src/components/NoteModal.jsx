import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { format } from 'date-fns';
import { IoClose } from 'react-icons/io5';

const NoteModal = ({ note, isOpen, onClose }) => {
  if (!note) return null;

  // Format the date in a readable format
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return format(date, 'dd MMMM yyyy, HH:mm');
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  const modalVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1 }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          onClick={onClose}
        >
          <motion.div 
            className="bg-white rounded-xl w-full max-w-md p-6 max-h-[90vh] overflow-y-auto"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-primary-800">Detail Catatan</h2>
              <motion.button
                whileHover={{ scale: 1.1, backgroundColor: '#F3F4F6' }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="p-1.5 rounded-full hover:bg-primary-100"
              >
                <IoClose className="text-xl text-primary-600" />
              </motion.button>
            </div>
            
            <div className="bg-primary-50 p-4 rounded-lg mb-4">
              <p className="whitespace-pre-wrap text-primary-800">{note.text}</p>
            </div>
            
            <div className="text-sm text-primary-500">
              <p>Dibuat: {formatDate(note.createdAt)}</p>
              {note.lastEdited && note.lastEdited !== note.createdAt && (
                <p>Terakhir diubah: {formatDate(note.lastEdited)}</p>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NoteModal;
