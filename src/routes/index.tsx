import { Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';

import Login from '@/pages/auth/login';
import Home from '@/pages/app/home';
import PageSuspense from '@/components/custom/page-suspense';

const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '',
    element: (
      <Suspense fallback={<PageSuspense />}>
        <Home />
      </Suspense>
    ),
  },
]);

export default router;
