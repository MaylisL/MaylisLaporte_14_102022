// react packages
import { Routes, Route} from "react-router-dom";

// pages
import EmployeePage from "./pages/EmployeePage";
import FormPage from './pages/FormPage';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={ <FormPage/> } />
        <Route path="current-employee" element={ <EmployeePage/> } />
      </Routes>
    </div>
)
}
export default App;
