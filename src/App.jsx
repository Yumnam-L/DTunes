import React, { useState } from 'react';
import axios from 'axios';
import Player from './components/Player';
import './index.css';

const App = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [selectedVideoId, setSelectedVideoId] = useState(null);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`/api/search?query=${query}`);
      console.log("response:", response.data.items);
      setResults(response.data.items);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('AxiosError:', error.response?.data || error.message);
      } else {
        console.error("Error:", error);
      }
    }
  };

  const handleVideoSelect = (videoId) => {
    setSelectedVideoId(videoId);
  };

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  return (
    <div>
      <input 
        type="text" 
        value={query}
        onChange={handleInputChange}
        placeholder="Search for music"
      />
      <button onClick={handleSearch}>Search</button>
      <div>
        {results.map(result => (
          <div key={result.id.videoId} onClick={() => handleVideoSelect(result.id.videoId)}>
            <h3>{result.snippet.title}</h3>
            <p>{result.snippet.description}</p>
            <img src={result.snippet.thumbnails.default.url} alt={result.snippet.title} />
          </div>
        ))}
      </div>
      {selectedVideoId && <Player videoId={selectedVideoId} />}
    </div>
  );
};

export default App;

// 2
// import React, { useState, ChangeEvent } from 'react';
// import axios from 'axios';
// import Player from './components/Player';
// import './index.css';

// interface Result {
//   id: {
//     videoId: string;
//   };
//   snippet: {
//     title: string;
//     description: string;
//     thumbnails: {
//       default: {
//         url: string;
//       };
//     };
//   };
// }

// const App: React.FC = () => {
//   const [query, setQuery] = useState<string>('');
//   const [results, setResults] = useState<Result[]>([]);
//   const [selectedVideoId, setSelectedVideoId] = useState<string | null>(null);

//   const handleSearch = async () => {
//     try {
//       const response = await axios.get(`/api/search?query=${query}`);
//       console.log("response:", response.data.items);
//       setResults(response.data.items);
//     } catch (error) {
//       if (axios.isAxiosError(error)) {
//         console.error('AxiosError:', error.response?.data || error.message);
//       } else {
//         console.error("Error:", error);
//       }
//     }
//   };

//   const handleVideoSelect = (videoId: string) => {
//     setSelectedVideoId(videoId);
//   };

//   const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
//     setQuery(e.target.value);
//   };

//   return (
//     <div>
//       <input 
//         type="text" 
//         value={query}
//         onChange={handleInputChange}
//         placeholder="Search for music"
//       />
//       <button onClick={handleSearch}>Search</button>
//       <div>
//         {results.map(result => (
//           <div key={result.id.videoId} onClick={() => handleVideoSelect(result.id.videoId)}>
//             <h3>{result.snippet.title}</h3>
//             <p>{result.snippet.description}</p>
//             <img src={result.snippet.thumbnails.default.url} alt={result.snippet.title} />
//           </div>
//         ))}
//       </div>
//       {selectedVideoId && <Player videoId={selectedVideoId} />}
//     </div>
//   );
// };

// export default App;

// 1

// import React, { useState, ChangeEvent } from 'react';
// import axios from 'axios';

// interface Result {
//   id: {
//     videoId: string;
//   };
//   snippet: {
//     title: string;
//     description: string;
//     thumbnails: {
//       default: {
//         url: string;
//       };
//     };
//   };
// }

// const App: React.FC = () => {
//   const [query, setQuery] = useState<string>('');
//   const [results, setResults] = useState<Result[]>([]);

//   const handleSearch = async () => {
//     try {
//       const response = await axios.get(`http://localhost:5000/search?query=${query}`);
//       setResults(response.data.items);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
//     setQuery(e.target.value);
//   };

//   return (
//     <div>
//       <input 
//         type="text" 
//         value={query}
//         onChange={handleInputChange}
//         placeholder="Search for music"
//       />
//       <button onClick={handleSearch}>Search</button>
//       <div>
//         {results.map(result => (
//           <div key={result.id.videoId}>
//             <h3>{result.snippet.title}</h3>
//             <p>{result.snippet.description}</p>
//             <img src={result.snippet.thumbnails.default.url} alt={result.snippet.title} />
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default App;



// // import { useState } from 'react'
// // import reactLogo from './assets/react.svg'
// // import viteLogo from '/vite.svg'
// // import './App.css'

// // function App() {
// //   const [count, setCount] = useState(0)

// //   return (
// //     <>
// //       <div>
// //         <a href="https://vitejs.dev" target="_blank">
// //           <img src={viteLogo} className="logo" alt="Vite logo" />
// //         </a>
// //         <a href="https://react.dev" target="_blank">
// //           <img src={reactLogo} className="logo react" alt="React logo" />
// //         </a>
// //       </div>
// //       <h1>Vite + React</h1>
// //       <div className="card">
// //         <button onClick={() => setCount((count) => count + 1)}>
// //           count is {count}
// //         </button>
// //         <p>
// //           Edit <code>src/App.tsx</code> and save to test HMR
// //         </p>
// //       </div>
// //       <p className="read-the-docs">
// //         Click on the Vite and React logos to learn more
// //       </p>
// //     </>
// //   )
// // }

// // export default App
