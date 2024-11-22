import React, { useState } from 'react';
import DropdownSelector from './DropdownSelector';
import TransactionsTable from './TransactionsTable';
import StatisticsBox from './StatisticsBox';
import BarChart from './BarChart';

const Dashboard = () => {
  const [selectedMonth, setSelectedMonth] = useState(3); // Default to March

  return (
    <div>
      <h1>Transactions Dashboard</h1>
      <DropdownSelector
        selectedMonth={selectedMonth}
        setSelectedMonth={setSelectedMonth}
      />
      <StatisticsBox selectedMonth={selectedMonth} />
      <TransactionsTable selectedMonth={selectedMonth} />
      <div className='bar-chart'>
      <BarChart selectedMonth={selectedMonth} />
      </div>
      
    </div>
  );
};

export default Dashboard;
