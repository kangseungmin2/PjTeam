import './App.css';
import BasicExample from './component/main/header'
import AppRouter from './component/main/router';

import Footer from './component/main/footer';

function App() {
  return (
    <div className="App">
        <BasicExample/>
        <AppRouter/>
        <Footer/>
    </div>
  );
}

export default App;
