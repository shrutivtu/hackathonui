import React, { useState, useEffect } from "react";
import axios from "axios";
import "./speech_text.css";

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const mic = new SpeechRecognition();

mic.continuous = true;
mic.interimResults = true;
mic.lang = "en-US";

function SpeechText2() {
  const [isListening, setIsListening] = useState(false);
  const [note, setNote] = useState(null);
  const [savedNotes, setSavedNotes] = useState([]);
  const [query, setQuery] = useState(false);
  const [audioUrl, setAudioUrl] = useState(null);

  useEffect(() => {
    handleListen();
  }, [isListening]);

  const handleListen = () => {
    if (isListening) {
      mic.start();
      mic.onend = () => {
        console.log("continue..");
        mic.start();
      };
    } else {
      mic.stop();
      mic.onend = () => {
        console.log("Stopped Mic on Click");
      };
    }
    mic.onstart = () => {
      console.log("Mics on");
    };

    mic.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map((result) => result[0])
        .map((result) => result.transcript)
        .join("");
      setNote(transcript);
      mic.onerror = (event) => {
        console.log(event.error);
      };
    };
  };

  const handleSaveNote = () => {
    const timestamp = new Date().toLocaleString();
    const noteWithTimestamp = { text: note, time: timestamp };
    setSavedNotes([...savedNotes, noteWithTimestamp]);
    setNote("");
  };

  useEffect(() => {
    if (savedNotes.length > 0 && !query) {
      const listOfStrings = savedNotes.map((obj) => obj.text);
      axios
        .post("http://192.168.14.240:8000/create_vector_store", {
          input: listOfStrings,
        })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }, [savedNotes]);

  useEffect(() => {
    console.log(query);
    console.log(savedNotes);
    if (query && savedNotes.length > 0) {
      const listOfStrings = savedNotes.map((obj) => obj.text);
      axios
        .post(
          "http://192.168.14.240:8000/query",
          {
            input: listOfStrings,
          },
          { responseType: "arraybuffer" }
        )
        .then(function (response) {
          const blob = new Blob([response.data], { type: "audio/mp3" });
          const url = URL.createObjectURL(blob);
          setAudioUrl(url);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }, [query, savedNotes]);

  const handleQuery = () => {
    setSavedNotes([]);
    setQuery(true);
  };

  return (
    <div className="voice-recorder">
      <div className="current-note">
        <h2>Current Note</h2>
        <div className="mic-status">
          {isListening ? <span className="mic-on">🎙️</span> : <span className="mic-off">🛑🎙️</span>}
        </div>
        <div className="actions">
          <button className="save-button" onClick={handleSaveNote} disabled={!note}>
            Save Note
          </button>
          <button className="toggle-button" onClick={() => setIsListening((prevState) => !prevState)}>
            Start/Stop
          </button>
        </div>
        <p className="note-text">{note}</p>
      </div>
      <div className="saved-notes">
        <h2>Notes</h2>
        {savedNotes.map((n, index) => (
          <p key={index} className="note-item">
            <strong>{n.time}</strong>: {n.text}
          </p>
        ))}
        <div className="query-section">
          <h2>Query</h2>
          <button className="query-button" onClick={() => handleQuery()}>
            Query
          </button>
          <h3 className="query-status">{query ? "Start Recording" : "Click to ask!"}</h3>
          {audioUrl && (
            <div className="audio-response">
              <h3>Audio Response:</h3>
              <audio className="audio-player" controls src={audioUrl} onPlay={() => setQuery(false)}></audio>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SpeechText2;
