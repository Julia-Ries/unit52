import React from "react";
import { BrowserRouter} from "react-router-dom";
import NavBar from './Navbar';
import AppRoutes from './AppRoutes';



function App() {

  return (
    <div className="App">
      <BrowserRouter>
        
        <NavBar data-testid="navbar"/>
        <AppRoutes data-testid="approutes"/>
   
      </BrowserRouter>
    </div>
  );
}

export default App;
