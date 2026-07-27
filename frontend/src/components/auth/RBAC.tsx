import { useAuthStore } from '../../store/auth.store';

interface CheckRoleProps {
    allowed: string[];
    children: React.ReactNode;
    fallback?: React.ReactNode;
}

export const CheckRole = ({ allowed, children, fallback = null }: CheckRoleProps) => {
    const user = useAuthStore((state) => state.user);
    if (!user || (!allowed.includes(user.role) && !allowed.includes('all'))) {
        return <>{fallback}</>;
    }
    return <>{children}</>;
};
