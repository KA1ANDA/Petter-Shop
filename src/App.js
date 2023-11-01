import AppRouter from './Components/AppRouter';
import NavBar from './Components/NavBar';


function App() {
  return (
    <div className="flex flex-col">
      <NavBar/>
      <AppRouter />
    </div>
  );
}

export default App;
