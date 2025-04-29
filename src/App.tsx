import { Routes, Route} from 'react-router-dom';
import HomePage from './pages/HomePage';
import DocumentPage from './pages/DocumentPage';
import { DocumentProvider } from './contexts/DocumentContext';

function App() {

  return (
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/doc/:documentId" element={<DocumentProvider><DocumentPage /></DocumentProvider>} />
      </Routes>
  );
}

export default App;
