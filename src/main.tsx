import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import 'react-toastify/dist/ReactToastify.css';
import App from './App.tsx';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/context/tanstack-provider.tsx';
import { Toaster } from './components/ui/sonner.tsx';
import { AuthProvider } from './guard/auth-guard.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <App />
      </AuthProvider>
      <Toaster richColors />
    </QueryClientProvider>
  </StrictMode>
);
