import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/auth.store';
import LoginPage from './pages/LoginPage';
import UserManagementPage from './pages/admin/UserManagement';
import { CheckRole } from './components/auth/RBAC';

const ProtectedRoute = ({ children, allowedRoles }: { children: React.ReactNode, allowedRoles?: string[] }) => {
  const { isAuthenticated, user } = useAuthStore((state) => ({ isAuthenticated: state.isAuthenticated(), user: state.user }));
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    return <div className="p-8 text-xl text-red-600">403 Forbidden - Role {allowedRoles.join(', ')} required</div>;
  }
  return <>{children}</>;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <div className="p-8">
                <h2 className="text-2xl mb-4">Dashboard Home - Authenticated successfully!</h2>
                <CheckRole allowed={['admin']}>
                  <a href="/admin/users" className="text-blue-600 underline">Quản trị người dùng (Admin)</a>
                </CheckRole>
              </div>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <UserManagementPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
