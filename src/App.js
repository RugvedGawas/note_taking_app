import Notes from "./pages/Notes";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
   <>
   <BrowserRouter>
      <Routes>
        <Route path='/' element={ <Notes/>}/>
      </Routes>
    </BrowserRouter>
   </>
  );
}

export default App;
