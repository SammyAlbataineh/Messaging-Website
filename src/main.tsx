import { createRoot } from 'react-dom/client'
import { StrictMode } from 'react';
import './index.css'
import App from './App.tsx'
import { GoogleOAuthProvider } from "@react-oauth/google";
import { BrowserRouter } from 'react-router-dom';
createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <GoogleOAuthProvider clientId="492776728900-apo33td3stnpjoei9l66q26agcpfecac.apps.googleusercontent.com">
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </GoogleOAuthProvider>
  </StrictMode>
);
