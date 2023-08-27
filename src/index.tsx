import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './components/dashboard/Card.css'
import App from './components/App';
import reportWebVitals from './reportWebVitals';
import "bootstrap/dist/css/bootstrap.css";
import {
  createRoutesFromElements,
  createBrowserRouter,
  Route,
  RouterProvider
} from 'react-router-dom';
import Accueil from './components/Accueil';
import LoginForm from './components/LoginForm';
import Thematique from './components/Thematique';
import Dashboard from './components/dashboard/Dashboard';
//import { updateCardAction } from './actions/card';
import { addThematiqueAction, updateThematiqueAction, deleteThematiqueAction } from './actions/thematique';
import About from './components/About';
import NotFound from './components/404';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);



const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<App />}>
        <Route path="" element={<Accueil />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/thematique" element={<Thematique />} />
        <Route path="/dashboard/:thematiqueId" element={<Dashboard />} />
        <Route path="*" element={<NotFound />} />
      </Route>
      {/* <Route path="/update-card/:cardId" action={updateCardAction} /> */}
      <Route path="/add-thematique/" action={addThematiqueAction} />
      <Route path="/update-thematique/:thematiqueId" action={updateThematiqueAction} />
      <Route path="/delete-thematique/:thematiqueId" action={deleteThematiqueAction} />
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
