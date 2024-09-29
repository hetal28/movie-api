import './App.css';
import Layout from './components/Layout';
import {Routes, Route} from 'react-router-dom';
import Home from './components/home/Home';

import Trailer from './components/trailer/Trailer';
import Reviews from './components/reviews/Reviews';
import NotFound from './components/notFound/NotFound';

function App() {
  return (
    <div className="App">
      <Routes>
          <Route path="/" element={<Layout/>}>
            <Route path="/" element={<Home/>} ></Route>
            <Route path="/Trailer/:ytTrailerId" element={<Trailer/>}></Route>
            <Route path="/Reviews/:movieId" element ={<Reviews />}></Route>
            <Route path="*" element = {<NotFound/>}></Route>
          </Route>
      </Routes>

    </div>
  );
}

export default App;
