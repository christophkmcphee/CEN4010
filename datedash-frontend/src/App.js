import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [zipcode, setZipcode] = useState("");
  const [category, setCategory] = useState("restaurant");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [recommendation, setRecommendation] = useState(null);

  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // clear previous errors
    setRecommendation(null); // clear previous results
  
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/recommend/", {
        zipcode,
        category,
      });
  
      setRecommendation(response.data);
    } catch (error) {
      console.error("Error:", error);
      if (error.response?.data?.error) {
        setError(error.response.data.error);
      } else {
        setError("Something went wrong.");
      }
    }
  };
  
  return (
    <div className="App">
      <h1>DateDash</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter ZIP Code"
          value={zipcode}
          onChange={(e) => setZipcode(e.target.value)}
        />

        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="restaurant">Restaurant</option>
          <option value="cafe">Cafe</option>
          <option value="bar">Bar</option>
          <option value="museum">Museum</option>
          <option value="movie_theater">Movie Theater</option>
          <option value="park">Park</option>
        </select>

        <button type="submit">Get Recommendation</button>
      </form>

      {error && <div className="error">{error}</div>}

      {recommendation && (
        <div className="result">
          <h2>🎯 Recommendation</h2>
          <p><strong>{recommendation.name}</strong></p>
          <p>{recommendation.address}</p>
        </div>
      )}


      {result && (
        <div className="result">
          <h2>We recommend:</h2>
          <p><strong>{result.name}</strong></p>
          <p>{result.address}</p>
        </div>
      )}
    </div>
  );
}

export default App;
