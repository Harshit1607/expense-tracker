import { AddExpense } from "./AddExpense.js";
import { Expense } from "./Expense.js";
import { Statements } from "./Statements.js";


function App() {
  return (
    <div className="App">
      <div className="heading"><h2>Expense Tracker</h2></div>
      <Expense />
      <Statements />
      <AddExpense />
    </div>
  );
}

export default App;
