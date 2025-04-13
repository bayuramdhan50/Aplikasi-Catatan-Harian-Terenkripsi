import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CryptoJS from 'crypto-js';
import SplashScreen from './components/SplashScreen';
import NoteForm from './components/NoteForm';
import NotesContainer from './components/NotesContainer';
import NoteModal from './components/NoteModal';
import SearchBar from './components/SearchBar';
import './App.css';

function App() {
  const [notes, setNotes] = useState([]);
  const [showSplash, setShowSplash] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedNote, setSelectedNote] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingNote, setEditingNote] = useState(null);

  // Secret key for encryption/decryption
  const secretKey = 'catatan-harian-rahasia-key';

  // Load notes from localStorage on component mount
  useEffect(() => {
    const storedNotes = localStorage.getItem('encryptedNotes');
    
    if (storedNotes) {
      try {
        const parsedNotes = JSON.parse(storedNotes);
        
        // Decrypt the notes
        const decryptedNotes = parsedNotes.map(note => {
          const decryptedText = CryptoJS.AES.decrypt(note.encryptedText, secretKey).toString(CryptoJS.enc.Utf8);
          return {
            ...note,
            text: decryptedText
          };
        });
        
        setNotes(decryptedNotes);
      } catch (error) {
        console.error('Error loading notes:', error);
      }
    }
    
    // Hide splash screen after 2.5 seconds
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2500);
    
    return () => clearTimeout(timer);
  }, []);

  // Save notes to localStorage whenever notes change
  useEffect(() => {
    if (notes.length > 0) {
      localStorage.setItem('encryptedNotes', JSON.stringify(notes));
    }
  }, [notes]);

  // Add a new note
  const addNote = (newNote) => {
    setNotes(prevNotes => [newNote, ...prevNotes]);
  };

  // Update an existing note
  const updateNote = (updatedNote) => {
    setNotes(prevNotes => 
      prevNotes.map(note => 
        note.id === updatedNote.id ? updatedNote : note
      )
    );
  };

  // Delete a note
  const deleteNote = (noteId) => {
    if (window.confirm('Yakin ingin menghapus catatan ini?')) {
      setNotes(prevNotes => prevNotes.filter(note => note.id !== noteId));
      
      // If deleted note is currently selected or being edited, reset states
      if (selectedNote && selectedNote.id === noteId) {
        setSelectedNote(null);
        setIsModalOpen(false);
      }
      
      if (editingNote && editingNote.id === noteId) {
        setEditingNote(null);
      }
    }
  };

  // View note details
  const viewNote = (note) => {
    setSelectedNote(note);
    setIsModalOpen(true);
  };

  // Edit a note
  const editNote = (note) => {
    setEditingNote(note);
    
    // Scroll to the form
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Handle search
  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <>
      <AnimatePresence>
        {showSplash && <SplashScreen />}
      </AnimatePresence>

      <motion.div 
        className="min-h-screen bg-primary-100 p-4 md:p-6"
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: 1,
          transition: { delay: 0.3, duration: 0.5 }
        }}
      >
        <div className="max-w-3xl mx-auto">
          <motion.header
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mb-8 text-center"
          >
            <h1 className="text-3xl font-bold text-primary-800 mb-2">Catatan Harian</h1>
            <p className="text-primary-600">Catat kenangan dan pikiran Anda dengan aman</p>
          </motion.header>
          
          <NoteForm 
            addNote={addNote} 
            editingNote={editingNote} 
            setEditingNote={setEditingNote} 
            updateNote={updateNote}
          />
          
          <SearchBar onSearch={handleSearch} />
          
          <NotesContainer
            notes={notes}
            onViewNote={viewNote}
            onEditNote={editNote}
            onDeleteNote={deleteNote}
            searchQuery={searchQuery}
          />
        </div>
      </motion.div>
      
      <NoteModal 
        note={selectedNote}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}

export default App;
