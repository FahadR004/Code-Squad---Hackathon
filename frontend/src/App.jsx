import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Register />} />   // Default page = Register
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
