import { RouterProvider } from 'react-router-dom';
import router from './router/Router';
import { AuthProvider } from './context/CreatorContext';
import { ToastProvider } from './context/ToastContext';
import { ToastContainer } from './components/toastContainer/ToastContainer';
import ThemeContext from './context/ThemeContext';

function App() {
    return (
        <ThemeContext>
            <ToastProvider>
                <AuthProvider>
                    <ToastContainer />
                    <RouterProvider router={router} />
                </AuthProvider>
            </ToastProvider>
        </ThemeContext>
    );
}

export default App;
