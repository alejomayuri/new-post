import './App.css';
import Home from './components/Home';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext';
import { ColectionProvider } from './context/ColectionSelect';
import { GanchoProvider } from './context/GanchoContext';
import { PrivateRoute } from './components/PrivateRoute';
import Inicio from './components/Inicio';

function App() {
  return (
    <>
      <AuthProvider>
        <ColectionProvider>
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
        </ColectionProvider>
      </AuthProvider>
    </>
  );
}

export default App;
