import Banner from './components/Banner';
import { Outlet } from 'react-router-dom';
import Globalstyle from 'GlobalStyle';




function App() {

  return (
    <>
      <Globalstyle />
      <Banner />
      <Outlet />
    </>
  );
}

export default App;
