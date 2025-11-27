import { createBrowserRouter } from 'react-router-dom';
import Homepage from '../components/Homepage/Homepage';
import Pomodoro from '../components/Pomodoro/Pomodoro';
import Terms from '../components/Terms/Terms';
import Privacy from '../components/Privacy/Privacy';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Homepage />,
  },
  {
    path: '/pomodoro',
    element: <Pomodoro />,
  },
  {
    path: '/terms',
    element: <Terms />,
  },
  {
    path: '/privacy',
    element: <Privacy />,
  },
]);

export default router;
