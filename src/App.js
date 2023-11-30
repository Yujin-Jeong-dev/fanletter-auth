import { Outlet } from 'react-router-dom';
import Globalstyle from 'GlobalStyle';




function App() {

  return (
    <>
      <Globalstyle />
      <Outlet />

    </>
  );
}

export default App;
