import { Outlet } from 'react-router-dom';
import Header from './common/Header';
import Footer from './common/Footer';

function App() {
  return (
    <div className="App">
     <Header />
     <main>
      <Outlet />
     </main>
     <Footer />
    </div>
  );
}

export default App;



