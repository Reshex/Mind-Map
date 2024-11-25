import { RouterProvider } from 'react-router-dom';
import router from './router/Router';
import { AuthProvider } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';
import { ToastContainer } from './components/toastContainer/ToastContainer';

function App() {
    return (
        <ToastProvider>
            <AuthProvider>
                <ToastContainer />
                <RouterProvider router={router} />
            </AuthProvider>
        </ToastProvider>
    );
}

export default App;
