import { Route, Routes } from 'react-router';
import HomePage from './pages/HomePage'
import './App.css';

function App() {
  return (
	  <Routes>
		  <Route path='/' element={<HomePage />} />
		  {/* <Route path='/*' element={<NotFound />} /> */}
		  {/* <Route path={`/users/profile/:id`} element={<Profile />} /> */}
	  </Routes>
  );
}

export default App;
