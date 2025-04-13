import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import NoteItem from './NoteItem';
import { IoDocumentText } from 'react-icons/io5';

const NotesContainer = ({ notes, onViewNote, onEditNote, onDeleteNote, searchQuery }) => {
  // Filter notes based on search query
  const filteredNotes = searchQuery
    ? notes.filter(note => 
        note.text.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : notes;

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 text-primary-800">
        {searchQuery ? 'Hasil Pencarian' : 'Catatan Anda'}
      </h2>
      
      <AnimatePresence>
        {filteredNotes.length > 0 ? (
          <motion.div layout>
            {filteredNotes.map((note, index) => (
              <NoteItem
                key={note.id}
                note={note}
                index={index}
                onView={onViewNote}
                onEdit={onEditNote}
                onDelete={onDeleteNote}
              />
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center py-10 text-center"
          >
            <IoDocumentText className="text-5xl text-primary-300 mb-3" />
            <h3 className="text-lg font-medium text-primary-700 mb-1">
              {searchQuery ? 'Tidak ada hasil' : 'Belum ada catatan'}
            </h3>
            <p className="text-primary-500">
              {searchQuery 
                ? `Tidak ada catatan yang cocok dengan "${searchQuery}"`
                : 'Mulai tulis catatan pertama Anda dengan form di atas'
              }
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NotesContainer;
