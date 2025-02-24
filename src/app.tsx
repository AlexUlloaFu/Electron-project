import './index.css';
import React, {useState , useEffect} from 'react'
import VideoPlayer from './components/VideoPlayer';
import { fetchCurrentIndex } from './api';
import { useAuth } from './components/AuthContext';


declare global {
  interface Window {
    videoUtils: {
      getVideoFiles: (folderPath: string) => Promise<string[]>;
    };
  }
}

function App() {

  const { isAuthenticated, login, register, logout } = useAuth();
  const [videos, setVideos] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const srcFolder = process.env.REACT_APP_VIDEOS_FOLDER_DIR;

  useEffect(() => {
    if (isAuthenticated && srcFolder) {
      window.videoUtils.getVideoFiles(srcFolder).then(files => {
        setVideos(files);
      });
      
      fetchCurrentIndex().then(index => {
        setCurrentIndex(index);
      });
    }
  }, [isAuthenticated, srcFolder]);

  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      if (isLogin) {
        await login(email, password);
      } else {
        await register(email, password);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="auth-container">
        <h2>{isLogin ? 'Login' : 'Register'}</h2>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleAuthSubmit}>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
            />
          </div>
          <button type="submit" disabled={loading}>
            {loading ? 'Processing...' : (isLogin ? 'Login' : 'Register')}
          </button>
        </form>
        <button 
          className="toggle-auth"
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin 
            ? 'Need an account? Register' 
            : 'Already have an account? Login'}
        </button>
      </div>
    );
  }


  return (
    <div className="app-container">
      <div className="header">
        <button onClick={logout} className="logout-button">
          Logout
        </button>
      </div>
      {videos.length > 0 ? (
        <VideoPlayer 
          videos={videos}
          currentIndex={currentIndex}
          onIndexChange={setCurrentIndex}
        />
      ) : (
        <div>No videos found in the specified folder</div>
      )}
    </div>
  );
}

export default App