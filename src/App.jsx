import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastProvider } from './context/ToastContext';
import Nav from './components/Nav';
import JobPosting from './pages/JobPosting';
import JobDetails from './pages/JobDetails';
import PostJob from './pages/PostJob';

function App() {
  return (
    <ToastProvider>
      <Router>
        <Nav />
        <Routes>
          <Route path="/" element={<JobPosting />} />
          <Route path="/jobs/:id" element={<JobDetails />} />
          <Route path="/post-job" element={<PostJob />} />
        </Routes>
      </Router>
    </ToastProvider>
  );
}

export default App;