import './App.css';
import Home from './pages/Home';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext';
import { GanchoProvider } from './context/GanchoContext';
import { PrivateRoute } from './components/PrivateRoute';
import Inicio from './pages/Inicio';

function App() {
  return (
    <>
      <AuthProvider>
          <GanchoProvider>
            <Router>
              <Switch>
                <PrivateRoute exact path='/' component={Home} />
                <Route path="/inicio">
                  <Inicio />
                </Route>
              </Switch>
            </Router>
          </GanchoProvider>
      </AuthProvider>
    </>
  );
}

export default App;
