// // import React, { useState, useEffect } from "react";
// // import axios from "axios";

// // const SpeechRecognition =
// //   window.SpeechRecognition || window.webkitSpeechRecognition;
// // const mic = new SpeechRecognition();

// // mic.continuous = true;
// // mic.interimResults = true;
// // mic.lang = "en-US";

// // function SpeechText2() {
// //   const [isListening, setIsListening] = useState(false);
// //   const [note, setNote] = useState(null);
// //   const [savedNotes, setSavedNotes] = useState([]);
// //   const [query, setQuery] = useState(false);

// //   useEffect(() => {
// //     handleListen();
// //   }, [isListening]);

// //   const handleListen = () => {
// //     if (isListening) {
// //       mic.start();
// //       mic.onend = () => {
// //         console.log("continue..");
// //         mic.start();
// //       };
// //     } else {
// //       mic.stop();
// //       mic.onend = () => {
// //         console.log("Stopped Mic on Click");
// //       };
// //     }
// //     mic.onstart = () => {
// //       console.log("Mics on");
// //     };

// //     mic.onresult = (event) => {
// //       const transcript = Array.from(event.results)
// //         .map((result) => result[0])
// //         .map((result) => result.transcript)
// //         .join("");
// //       setNote(transcript);
// //       mic.onerror = (event) => {
// //         console.log(event.error);
// //       };
// //     };
// //   };

// //   const handleSaveNote = () => {
// //     const timestamp = new Date().toLocaleString();
// //     const noteWithTimestamp = { text: note, time: timestamp };
// //     setSavedNotes([...savedNotes, noteWithTimestamp]);
// //     setNote("");
// //   };

// //   useEffect(() => {
// //     if (savedNotes.length > 0 && !query) {
// //         const listOfStrings = savedNotes.map((obj) => obj.text);
// //         axios
// //         .post("http://192.168.14.240:8000/create_vector_store", {
// //             input: listOfStrings,
// //         })
// //         .then(function (response) {
// //             console.log(response);
// //         })
// //         .catch(function (error) {
// //             console.log(error);
// //         });
// //     }
// //   }, [savedNotes]);

// //   useEffect(() => {
// //     console.log(query);
// //     console.log(savedNotes);
// //     if(query && savedNotes.length > 0){
// //         const listOfStrings = savedNotes.map((obj) => obj.text);
// //         axios
// //         .post("http://192.168.14.240:8000/query", {
// //             input: listOfStrings,
// //         })
// //         .then(function (response) {
// //             console.log(response);
// //         })
// //         .catch(function (error) {
// //             console.log(error);
// //         });
// //     }
// //   }, [query, savedNotes])

// //   const handleQuery = () => {
// //     setSavedNotes([]);
// //     setQuery(true);
// //   }

  

// //   return (
// //     <div className="voice-recorder">
// //       <div className="box">
// //         <h2>Current Note</h2>
// //         {isListening ? <span>🎙️</span> : <span>🛑🎙️</span>}
// //         <button onClick={handleSaveNote} disabled={!note}>
// //           Save Note
// //         </button>
// //         <button onClick={() => setIsListening((prevState) => !prevState)}>
// //           Start/Stop
// //         </button>
// //         <p>{note}</p>
// //       </div>
// //       <div className="box">
// //         <h2>Notes</h2>
// //         {savedNotes.map((n, index) => (
// //           <p key={index}>
// //             <strong>{n.time}</strong>: {n.text}
// //           </p>
// //         ))}
// //         <h2>Query</h2>
// //         <button onClick={() => handleQuery()}>Query</button>
// //         {query ? <h3>Start Recording</h3> : <h3>Click to ask!</h3>}
// //       </div>
// //     </div>
// //   );
// // }

// // export default SpeechText2;


// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const SpeechRecognition =
//   window.SpeechRecognition || window.webkitSpeechRecognition;
// const mic = new SpeechRecognition();

// mic.continuous = true;
// mic.interimResults = true;
// mic.lang = "en-US";

// function SpeechText2() {
//   const [isListening, setIsListening] = useState(false);
//   const [note, setNote] = useState(null);
//   const [savedNotes, setSavedNotes] = useState([]);
//   const [query, setQuery] = useState(false);

//   useEffect(() => {
//     handleListen();
//   }, [isListening]);

//   const handleListen = () => {
//     if (isListening) {
//       mic.start();
//       mic.onend = () => {
//         console.log("continue..");
//         mic.start();
//       };
//     } else {
//       mic.stop();
//       mic.onend = () => {
//         console.log("Stopped Mic on Click");
//       };
//     }
//     mic.onstart = () => {
//       console.log("Mics on");
//     };

//     mic.onresult = (event) => {
//       const transcript = Array.from(event.results)
//         .map((result) => result[0])
//         .map((result) => result.transcript)
//         .join("");
//       setNote(transcript);
//       mic.onerror = (event) => {
//         console.log(event.error);
//       };
//     };
//   };

//   const handleSaveNote = () => {
//     const timestamp = new Date().toLocaleString();
//     const noteWithTimestamp = { text: note, time: timestamp };
//     setSavedNotes([...savedNotes, noteWithTimestamp]);
//     setNote("");
//   };

//   useEffect(() => {
//     if (savedNotes.length > 0 && !query) {
//       const listOfStrings = savedNotes.map((obj) => obj.text);
//       axios
//         .post("http://192.168.14.240:8000/create_vector_store", {
//           input: listOfStrings,
//         })
//         .then(function (response) {
//           console.log(response);
//         })
//         .catch(function (error) {
//           console.log(error);
//         });
//     }
//   }, [savedNotes]);

//   useEffect(() => {
//     console.log(query);
//     console.log(savedNotes);
//     if (query && savedNotes.length > 0) {
//       const listOfStrings = savedNotes.map((obj) => obj.text);
//       axios
//         .post("http://192.168.14.240:8000/query", {
//           input: listOfStrings,
//         })
//         .then(function (response) {
//           console.log(response);
//         })
//         .catch(function (error) {
//           console.log(error);
//         });
//     }
//   }, [query, savedNotes]);

//   const handleQuery = () => {
//     setSavedNotes([]);
//     setQuery(true);
//   };

//   return (
//     <div className="voice-recorder">
//       <div className="box">
//         <h2>Current Note</h2>
//         {isListening ? <span>🎙️</span> : <span>🛑🎙️</span>}
//         <button onClick={handleSaveNote} disabled={!note}>
//           Save Note
//         </button>
//         <button onClick={() => setIsListening((prevState) => !prevState)}>
//           Start/Stop
//         </button>
//         <p>{note}</p>
//       </div>
//       <div className="box">
//         <h2>Notes</h2>
//         {savedNotes.map((n, index) => (
//           <p key={index}>
//             <strong>{n.time}</strong>: {n.text}
//           </p>
//         ))}
//         <h2>Query</h2>
//         <button onClick={() => handleQuery()}>Query</button>
//         {query ? <h3>Start Recording</h3> : <h3>Click to ask!</h3>}
//       </div>
//     </div>
//   );
// }

// export default SpeechText2;


import React, { useState, useEffect } from "react";
import axios from "axios";

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
    if (query && savedNotes.length > 0) {
      const listOfStrings = savedNotes.map((obj) => obj.text);
    //   axios
    //     .post("http://192.168.14.240:8000/query", {
    //       input: listOfStrings,
    //     })
    //     .then(function (response) {
    //       const blob = new Blob([response.data], { type: "audio/mp3" });
    //       const url = URL.createObjectURL(blob);
    //       setAudioUrl(url);
    //     })
    //     .catch(function (error) {
    //       console.log(error);
    //     });
    axios
        .post("http://192.168.14.240:8000/query_audio", { input: listOfStrings }, { responseType: "arraybuffer" })
        .then((response) => {
            const blob = new Blob([response.data], { type: "audio/mp3" });
            const url = URL.createObjectURL(blob);
            setAudioUrl(url);
        })
        .catch((error) => {
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
      <div className="box">
        <h2>Current Note</h2>
        {isListening ? <span>🎙️</span> : <span>🛑🎙️</span>}
        <button onClick={handleSaveNote} disabled={!note}>
          Save Note
        </button>
        <button onClick={() => setIsListening((prevState) => !prevState)}>
          Start/Stop
        </button>
        <p>{note}</p>
      </div>
      <div className="box">
        <h2>Notes</h2>
        {savedNotes.map((n, index) => (
          <p key={index}>
            <strong>{n.time}</strong>: {n.text}
          </p>
        ))}
        <h2>Query</h2>
        <button onClick={() => handleQuery()}>Query</button>
        {query ? <h3>Start Recording</h3> : <h3>Click to ask!</h3>}
        {audioUrl && (
          <div>
            <h3>Audio Response:</h3>
            <audio controls src={audioUrl} autoPlay></audio>
          </div>
        )}
      </div>
    </div>
  );
}

export default SpeechText2;