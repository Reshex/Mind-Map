import { RouterProvider } from 'react-router-dom';
import router from './router/Router';
import { AuthProvider } from './context/AuthContext';
import { MapProvider } from './context/MapContext';

function App() {
    return (
        <MapProvider>
            <AuthProvider>
                <RouterProvider router={router} />
            </AuthProvider>
        </MapProvider>
    );
}

export default App;
