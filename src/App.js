import './App.css';
import Layout from './components/Layout';
import { Route, Routes } from 'react-router';
import Compare from './components/Compare';
import Main from './components/Main';
import UserStat from './components/UserStat';
import { ReactKeycloakProvider } from "@react-keycloak/web";
import keycloak from "./components/Keycloak";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <ReactKeycloakProvider authClient={keycloak}>
      <Layout>
        <Routes>
          <Route path='/' element={<Main/>} />
          <Route path='/compare' element={ <PrivateRoute> <Compare/> </PrivateRoute> } />
          <Route path='/user-stat' element={ <PrivateRoute> <UserStat/> </PrivateRoute> } />
        </Routes>
      </Layout>
    </ReactKeycloakProvider>
  );
}

export default App;
