import { ExpenseTracker } from "./ExpenseTracker.jsx";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Login } from "./login.js";
import { Signup } from "./signup.js";
import { PrivateRoute } from "./PrivateRoute.js";
function App() {
  return (
    <Router>
    <div className="App">
      <Routes>
      <Route element={<PrivateRoute />}>
        <Route path='/' element={<ExpenseTracker />} />
      </Route>
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<Signup />} />
      </Routes>
    </div>
    </Router>
  );
}

export default App;
