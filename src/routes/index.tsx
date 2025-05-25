import { Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';

import Login from '@/pages/auth/login';
import Home from '@/pages/app/dashboard';
import PageSuspense from '@/components/custom/page-suspense';
import Signup from '@/pages/auth/signup';
import AuthGuard from '@/guard/auth-guard';

const router = createBrowserRouter([
  {
    path: '/',
    element: <AuthGuard />,
    children: [
      {
        index: true,
        element: <Login />,
      },
      {
        path: 'signup',
        element: <Signup />,
      },
      {
        path: 'dashboard',
        element: (
          <Suspense fallback={<PageSuspense />}>
            <Home />
          </Suspense>
        ),
      },
    ],
  },
]);

export default router;
