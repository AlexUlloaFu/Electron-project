import { createRoot } from 'react-dom/client';
import App from './app';
import { AuthProvider } from './components/AuthContext';

const root = createRoot(document.body);
root.render(
    <AuthProvider>
        <App/>
    </AuthProvider>
);