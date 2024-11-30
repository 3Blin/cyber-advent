'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Lock, Terminal } from 'lucide-react';

// Story-Daten direkt in der Komponente
const storyData = {
  1: {
    story: `Im verstaubten Speicher deiner Großeltern findest du unter einer alten Plane ein mysteriöses Computerterminal. Der Bildschirm flackert schwach, als du den Einschaltknopf drückst...`,
    challenge: {
      title: "Das vergessene Terminal",
      description: "Finde dich im Terminal zurecht und entdecke die erste Nachricht.",
      hints: [
        "Verwende 'ls' um dir den Inhalt des aktuellen Verzeichnisses anzuzeigen",
        "Mit 'cd verzeichnisname' kannst du in ein Verzeichnis wechseln",
        "Die Datei 'start.log' enthält wichtige Informationen"
      ]
    }
  },
  2: {
    story: `Das Terminal erwacht zum Leben. Kryptische Zeichen huschen über den Bildschirm. Eine Nachricht erscheint: "System-Diagnose erforderlich..."`,
    challenge: {
      title: "System-Diagnose",
      description: "Führe grundlegende Systembefehle aus, um den Status zu überprüfen.",
      hints: [
        "Der Befehl 'whoami' zeigt den aktuellen Benutzer",
        "'pwd' zeigt das aktuelle Verzeichnis",
        "'top' zeigt laufende Prozesse"
      ]
    }
  }
  // Weitere Tage hier hinzufügen...
};

// Login Komponente
function AdminLogin({ onLogin, onCancel }: { onLogin: (success: boolean) => void; onCancel: () => void }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'admin' && password === 'cyber2024') {
      onLogin(true);
    } else {
      setError('Ungültige Anmeldedaten');
      setPassword('');
    }
  };

  return (
    <div className="bg-slate-700 rounded-lg p-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-white mb-2">Benutzername</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full bg-slate-600 text-white p-2 rounded"
          />
        </div>
        <div>
          <label className="block text-white mb-2">Passwort</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-slate-600 text-white p-2 rounded"
          />
        </div>
        {error && <p className="text-red-400">{error}</p>}
        <div className="flex gap-2">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Login
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="bg-slate-600 text-white px-4 py-2 rounded hover:bg-slate-500"
          >
            Abbrechen
          </button>
        </div>
      </form>
    </div>
  );
}

// Hauptkomponente
const AdventCalendar = () => {
  const [doors, setDoors] = useState<Array<{ day: number; isOpen: boolean; isAvailable: boolean }>>([]);
  const [selectedDoor, setSelectedDoor] = useState<number | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [testDate, setTestDate] = useState<string>('');
  const [currentStory, setCurrentStory] = useState<typeof storyData[keyof typeof storyData] | null>(null);

  useEffect(() => {
    initializeDoors();
    updateCurrentStory();
  }, [testDate]);

  const updateCurrentStory = () => {
    const currentDate = testDate ? new Date(testDate) : new Date();
    if (currentDate.getMonth() === 11 && currentDate.getDate() <= 24) {
      setCurrentStory(storyData[currentDate.getDate() as keyof typeof storyData] || null);
    } else {
      setCurrentStory(null);
    }
  };

  const initializeDoors = () => {
    const initialDoors = Array.from({ length: 24 }, (_, i) => ({
      day: i + 1,
      isOpen: false,
      isAvailable: isDateAvailable(i + 1)
    }));
    setDoors(initialDoors);
  };

  const isDateAvailable = (day: number): boolean => {
    const dateToCheck = testDate ? new Date(testDate) : new Date();
    const isDecember = dateToCheck.getMonth() === 11;
    return isDecember && day <= dateToCheck.getDate();
  };

  const handleDoorClick = (day: number) => {
    const door = doors[day - 1];
    if (!door.isAvailable) {
      return;
    }

    setSelectedDoor(day);
    setDoors(prev => prev.map(d => 
      d.day === day ? { ...d, isOpen: true } : d
    ));
  };

  const handleAdminLogin = (success: boolean) => {
    setIsAdmin(success);
    setShowAdminLogin(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* Admin Controls */}
      {isAdmin ? (
        <div className="mb-6 p-4 bg-slate-700 rounded-lg">
          <div className="flex gap-4 items-center">
            <input
              type="date"
              value={testDate}
              onChange={(e) => setTestDate(e.target.value)}
              className="bg-slate-600 text-white p-2 rounded"
            />
            <button 
              onClick={() => setTestDate('')}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Reset
            </button>
          </div>
        </div>
      ) : showAdminLogin ? (
        <AdminLogin 
          onLogin={handleAdminLogin} 
          onCancel={() => setShowAdminLogin(false)} 
        />
      ) : (
        <button
          onClick={() => setShowAdminLogin(true)}
          className="mb-6 text-blue-400 hover:text-blue-300"
        >
          Admin Login
        </button>
      )}

      {/* Current Story */}
      {currentStory && (
        <div className="mb-6 p-6 bg-slate-700 rounded-lg">
          <h2 className="text-xl font-bold text-white mb-4">Die Geschichte geht weiter...</h2>
          <p className="text-slate-200">{currentStory.story}</p>
        </div>
      )}

      {/* Calendar Grid */}
      <div className="grid grid-cols-4 md:grid-cols-6 gap-4 bg-slate-800 p-6 rounded-lg">
        {doors.map(({ day, isOpen, isAvailable }) => (
          <motion.div
            key={day}
            className={`relative aspect-square ${
              isAvailable ? 'cursor-pointer' : 'cursor-not-allowed'
            }`}
            whileHover={isAvailable ? { scale: 1.05 } : undefined}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
            onClick={() => handleDoorClick(day)}
          >
            <motion.div
              className={`absolute inset-0 bg-gradient-to-br ${
                isAvailable
                  ? 'from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500'
                  : 'from-slate-700 to-slate-600'
              } rounded-lg flex items-center justify-center`}
            >
              <span className="text-2xl font-bold text-white">{day}</span>
              {!isAvailable && (
                <Lock className="absolute top-2 right-2 w-4 h-4 text-slate-400" />
              )}
            </motion.div>

            {isOpen && (
              <motion.div
                className="absolute inset-0 bg-green-600 rounded-lg flex items-center justify-center text-white"
                initial={{ rotateY: 90 }}
                animate={{ rotateY: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Terminal className="w-6 h-6" />
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Challenge Modal */}
      <AnimatePresence>
        {selectedDoor && storyData[selectedDoor as keyof typeof storyData] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
            onClick={() => setSelectedDoor(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-slate-800 p-6 rounded-lg max-w-lg w-full"
              onClick={e => e.stopPropagation()}
            >
              <h2 className="text-2xl font-bold text-white mb-4">
                {storyData[selectedDoor as keyof typeof storyData].challenge.title}
              </h2>
              <p className="text-slate-300 mb-6">
                {storyData[selectedDoor as keyof typeof storyData].challenge.description}
              </p>
              <div className="space-y-2 mb-6">
                <h3 className="text-lg font-semibold text-white">Hilfreiche Befehle:</h3>
                <ul className="list-disc list-inside text-slate-300">
                  {storyData[selectedDoor as keyof typeof storyData].challenge.hints.map((hint, i) => (
                    <li key={i}>{hint}</li>
                  ))}
                </ul>
              </div>
              <button
                onClick={() => setSelectedDoor(null)}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Schließen
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdventCalendar;
