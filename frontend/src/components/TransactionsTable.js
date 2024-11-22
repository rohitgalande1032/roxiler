import React, { useEffect, useState } from "react";

const TransactionsTable = ({ selectedMonth, searchQuery }) => {
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState(null);

  const fetchTransactions = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/transactions?month=${selectedMonth}`
      );

      if (!response.ok) throw new Error("Failed to fetch transactions");

      const data = await response.json();

      // Ensure transactions is always an array
      setTransactions(data.transactions || []);
    } catch (err) {
      setError(err.message);
      console.error("Error fetching transactions:", err);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, [selectedMonth, searchQuery]);

  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {transactions.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((txn, index) => (
              <tr key={index}>
                <td>{txn.title}</td>
                <td>{txn.description}</td>
                <td>{txn.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No transactions found.</p>
      )}
    </div>
  );
};

export default TransactionsTable;
