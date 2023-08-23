import { Outlet } from 'react-router-dom';
import Header from './Header';

function App() {
  return (
    <div className="App">
     <Header />
     <main>
      <Outlet />
     </main>
    </div>
  );
}

export default App;



