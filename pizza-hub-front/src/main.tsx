import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {App} from "@/app/App";
import "./index.css"
import {BrowserRouter} from "react-router-dom";


/*
<StrictMode>
    <BrowserRouter>
        <App/>
    </BrowserRouter>
  </StrictMode>
 */
//От двойного рендеринга убирать бы стрикт
createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        <App/>
    </BrowserRouter>
)
