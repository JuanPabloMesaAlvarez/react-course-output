import React, { useState } from 'react';

import Card from '../UI/Card';
import ExpensesFilter from "./ExpensesFilter";
import Expenseslist from './ExpensesList';
import ExpensesChart from "./ExpensesChart";

const Expenses = (props) => {

  const [selectedYear, setSelectedYear] = useState('2020');

  const yearSelectedHandler = (year) => {
    setSelectedYear(year);
  }

  const filteredItems = props.items.filter(expense => expense.date.getFullYear() == selectedYear);

  return (
    <Card className="expenses">
      <ExpensesFilter selected={selectedYear} onYearSelected={yearSelectedHandler} />
      <ExpensesChart expenses={filteredItems} />
      <Expenseslist items={filteredItems} />
    </Card>
  );
}

export default Expenses;
