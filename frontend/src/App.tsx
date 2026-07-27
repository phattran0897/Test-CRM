import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/auth.store';
import LoginPage from './pages/LoginPage';
import UserManagementPage from './pages/admin/UserManagement';
import Dashboard from './pages/Dashboard';
import CustomerList from './pages/customers/CustomerList';
import CustomerDetail from './pages/customers/CustomerDetail';
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
              <div>
                <nav className="bg-slate-900 text-white p-4 flex space-x-6">
                  <a href="/" className="font-bold hover:text-blue-300">Dashboard</a>
                  <a href="/customers" className="hover:text-blue-300">Customers</a>
                  <CheckRole allowed={['admin']}>
                    <a href="/admin/users" className="hover:text-blue-300">Admin</a>
                  </CheckRole>
                </nav>
                <Dashboard />
              </div>
            </ProtectedRoute>
          }
        />
        <Route
          path="/customers"
          element={
            <ProtectedRoute>
              <div>
                <nav className="bg-slate-900 text-white p-4 flex space-x-6">
                  <a href="/" className="hover:text-blue-300">Dashboard</a>
                  <a href="/customers" className="font-bold hover:text-blue-300">Customers</a>
                </nav>
                <CustomerList />
              </div>
            </ProtectedRoute>
          }
        />
        <Route
          path="/customers/:id"
          element={
            <ProtectedRoute>
              <div>
                <nav className="bg-slate-900 text-white p-4 flex space-x-6">
                  <a href="/" className="hover:text-blue-300">Dashboard</a>
                  <a href="/customers" className="font-bold hover:text-blue-300">Customers</a>
                </nav>
                <CustomerDetail />
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
