import './App.css';
import {RouterProvider, createBrowserRouter} from "react-router-dom";
import Employee from './components/getemployee/Employee';
import Add from './components/addemployee/Add';
import Edit from './components/updateemployee/Edit';
import Login from './routes/Login';
import Register from './routes/SignUp';

function App() {

  const route = createBrowserRouter([
    {
      path:"/",
      element: <Login/>,
    },
    {
      path:"/register",
      element: <Register/>,
    },
    {
      path:"/employee",
      element: <Employee/>,
    },
    {
      path:"/add",
      element: <Add/>,
    },
    {
      path:"/edit/:id",
      element: <Edit/>,
    },
  ])

  return (
    <div className="App">
       <RouterProvider router={route}></RouterProvider>
    </div>
  );
}

export default App;
