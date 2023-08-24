import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
//import './components/Modal.css'
import App from './components/App';
import reportWebVitals from './reportWebVitals';
import "bootstrap/dist/css/bootstrap.css";
import {
  createRoutesFromElements,
  createBrowserRouter,
  Route,
  RouterProvider
} from 'react-router-dom';
import Home from './components/Home';
import LoginForm from './components/LoginForm';
import Thematique from './components/Thematique';
import Dashboard from './components/dashboard/Dashboard';
import { updateCardAction } from './actions/card';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);



const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<App />}>
        <Route path="" element={<Home />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/thematique" element={<Thematique />} /> 
        <Route path="/dashboard/:thematiqueId" element={<Dashboard />} /> 
      </Route>
      <Route path="/update-card/:cardId" action={updateCardAction} />
    </>
  )
)

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
