import React from 'react';

const DropdownSelector = ({ selectedMonth, setSelectedMonth }) => {
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];

  const handleChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  return (
    <select value={selectedMonth} onChange={handleChange}>
      {months.map((month, index) => (
        <option key={index} value={index + 1}>
          {month}
        </option>
      ))}
    </select>
  );
};

export default DropdownSelector;
