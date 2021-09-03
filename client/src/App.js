import './App.css';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import 'semantic-ui-css/semantic.min.css'
import MenuBar from './components/MenuBar'
import Home from './pages/home'
import { Container } from 'semantic-ui-react'
function App() {
  return (
    <Container>
      <Router>
        <MenuBar />
        <Route exact path="/" component={Home}/>
      </Router>
    </Container>
  );
}

export default App;
