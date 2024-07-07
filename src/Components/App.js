import { AddExpense } from "./AddExpense.js";
import { Expense } from "./Expense.js";
import { Statements } from "./Statements.js";


function App() {
  return (
    <div className="App">
      <div><h1>Expense Tracker</h1></div>
      <Expense />
      <Statements />
      <AddExpense />
    </div>
  );
}

export default App;
