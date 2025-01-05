import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/header';
import Home from './components/home';
import ExamPapers from './components/ExamPapers';
import ExamNotes from './components/ExamNotes';
import AI from './components/AI';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-700 to-gray-900">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/papers" element={<ExamPapers />} />
          <Route path="/notes" element={<ExamNotes />} />
          <Route path="/chat" element={<AI />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;