import React, { useEffect, useState } from "react";
import { getAllBonds } from "../services/BondService"; 

const Test = () => {
  const [bonds, setBonds] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllBonds()
      .then((bondsData) => {
        setBonds(bondsData);
        setLoading(false);
      })
      .catch((error) => console.error("Error fetching bonds:", error));
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Bond Information</h2>
      <table>
        <thead>
          <tr>
            <th>type</th>
            <th>issuerID</th>
            <th>bondMaturityDate</th>
            {/* Add other bond properties as needed */}
          </tr>
        </thead>
        <tbody>
          {bonds.map((bond) => (
            <tr key={bond.isin}>
              <td>{bond.type}</td>
              <td>{bond.issuerID}</td>
              <td>{bond.bondMaturityDate}</td>
              {/* Add other bond properties as needed */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Test;
