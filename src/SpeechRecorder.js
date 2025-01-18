import React, { useState, useRef } from 'react';
import axios from 'axios';

const SpeechRecorder = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  const startRecording = () => {
    setIsRecording(true);
    audioChunksRef.current = []; // Clear previous audio
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        mediaRecorderRef.current = new MediaRecorder(stream);
        mediaRecorderRef.current.ondataavailable = (event) => {
          audioChunksRef.current.push(event.data);
        };
        mediaRecorderRef.current.onstop = () => {
          const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
          const audioUrl = URL.createObjectURL(audioBlob);
          setAudioUrl(audioUrl);
        };
        mediaRecorderRef.current.start();
      })
      .catch((err) => {
        console.error('Error accessing microphone: ', err);
      });
  };

  const stopRecording = () => {
    setIsRecording(false);
    mediaRecorderRef.current.stop();
  };

  const uploadAudio = () => {
    const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
    const formData = new FormData();
    formData.append('file', audioBlob, 'recording.wav');
    console.log(typeof(formData));
    axios.post('https://your-backend-api-url.com/query-audio', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then(response => {
      console.log('Audio uploaded successfully', response);
    })
    .catch(error => {
      console.error('Error uploading audio', error);
    });
  };

  return (
    <div>
      <h1>Speech Recorder</h1>
      <button onClick={isRecording ? stopRecording : startRecording}>
        {isRecording ? 'Stop Recording' : 'Start Recording'}
      </button>
      {audioUrl && !isRecording && (
        <div>
          <audio controls src={audioUrl}></audio>
          <button onClick={uploadAudio}>Upload Audio</button>
        </div>
      )}
    </div>
  );
};

export default SpeechRecorder;
