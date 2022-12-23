import { Routes , Route } from 'react-router-dom';
import Home from './views/Home';
import ItemGame from './views/ItemGame';
import Accounts from './views/Accounts';
import InsertAccounts from './views/InsertAccounts';
import UpdateAccounts from './views/UpdateAccounts';
function App() {
  return (
    <Routes>
    <Route path="" element={<Home/>}></Route>
    <Route path="itemGame" element={<ItemGame/>}></Route>
    <Route path="accounts" element={<Accounts/>}></Route>
    <Route path="insertAccounts" element={<InsertAccounts/>}></Route>
    <Route path="updateAccounts/:id" element={<UpdateAccounts/>}></Route>
    </Routes>
  );
}

export default App;
