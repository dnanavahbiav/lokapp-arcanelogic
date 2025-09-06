// components/SpeechRecognition.js
"use client";
import React, { useState, useEffect } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const SpeechRecognition = () => {
  const [transcript, setTranscript] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [error, setError] = useState('');

  // Check if the browser supports Speech Recognition API
  const isSupported = typeof window.SpeechRecognition !== 'undefined' || typeof window.webkitSpeechRecognition !== 'undefined';

  // Initialize SpeechRecognition
  const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();

  useEffect(() => {
    if (!isSupported) {
      setError('Your browser does not support Speech Recognition.');
      return;
    }

    // Set up the recognition properties
    recognition.lang = 'en-US'; // You can change this to any supported language like 'hi-IN' for Hindi
    recognition.continuous = true; // Keep recognition running
    recognition.interimResults = true; // Show interim results

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.onresult = (event) => {
      const latestTranscript = event.results[event.results.length - 1][0].transcript;
      setTranscript(latestTranscript);
    };

    recognition.onerror = (event) => {
      console.error('Speech Recognition error:', event.error);
      setError(`Error: ${event.error}`);
    };

    return () => {
      // Clean up when component unmounts
      recognition.stop();
    };
  }, []);

  // Start the speech recognition
  const startListening = () => {
    setTranscript('');
    setError('');
    recognition.start();
  };

  // Stop the speech recognition
  const stopListening = () => {
    recognition.stop();
  };

  return (
    <div>
      <h1>Speech Recognition in Next.js</h1>
      
      <div>
        <button onClick={startListening} disabled={isListening}>
          {isListening ? 'Listening...' : 'Start Listening'}
        </button>
        <button onClick={stopListening} disabled={!isListening}>
          Stop Listening
        </button>
      </div>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <h2>Recognized Speech:</h2>
      <p>{transcript}</p>
    </div>
  );
};

export default SpeechRecognition;
