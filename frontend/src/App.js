import {BrowserRouter as Router , Route} from 'react-router-dom'



import './App.css';
import Home from './pages/home.js' ;
function App() {
  return (
    <Router>
    <div className="App">
        <Route path="/" component={Home} exact />
        <Route path="/search/:keyword" component={Home} />

    </div>
    </Router>
    
  );
}

export default App;
