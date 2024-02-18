import { Route, Routes } from 'react-router';
import HomePage from './pages/HomePage'
import './App.css';
import CharacterPage from './pages/CharacterPage';

function App() {
  return (
	  <Routes>
		  <Route path='/' element={<HomePage />} />
		  {/* <Route path='/*' element={<NotFound />} /> */}
		  <Route path={`/characters/:id`} element={<CharacterPage />} />
	  </Routes>
  );
}

export default App;
