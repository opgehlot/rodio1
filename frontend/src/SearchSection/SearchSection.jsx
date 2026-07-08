import { useState } from "react";
import transportData from "../data/transportData";
import { filterTransport } from "../utils/filterTransport";

export default function SearchSection() {
  const [pickup, setPickup] = useState("");
  const [drop, setDrop] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = () => {
    const filtered = filterTransport(transportData, pickup, drop);
    setResults(filtered);
  };

  return (
    <>
      {/* Your search inputs */}

      <button onClick={handleSearch}>
        Search
      </button>

      {results.map((item) => (
        <div key={item.id}>
          {item.pickup} → {item.drop}
        </div>
      ))}
    </>
  );
}