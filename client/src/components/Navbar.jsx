import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext.jsx';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const link = ({ isActive }) => (isActive ? 'text-indigo-600 font-semibold' : 'text-gray-600 hover:text-indigo-600');

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-3">
        <Link to="/templates" className="text-xl font-bold text-indigo-600">TemplateStore</Link>
        <div className="flex items-center gap-4 text-sm">
          <NavLink to="/templates" className={link}>Templates</NavLink>
          {user ? (
            <>
              <NavLink to="/favorites" className={link}>My Favorites</NavLink>
              <span className="text-gray-400 hidden sm:inline">Hi, {user.name}</span>
              <button
                onClick={() => { logout(); navigate('/login'); }}
                className="px-3 py-1 rounded bg-gray-800 text-white hover:bg-gray-700"
              >Logout</button>
            </>
          ) : (
            <>
              <NavLink to="/login" className={link}>Login</NavLink>
              <NavLink to="/register" className={link}>Register</NavLink>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
