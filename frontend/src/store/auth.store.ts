import { create } from 'zustand';

interface AuthState {
    user: {
        id: string;
        email: string;
        first_name: string | null;
        role: string;
        tenantId?: string;
    } | null;
    setUser: (user: any) => void;
    logout: () => void;
    isAuthenticated: () => boolean;
}

export const useAuthStore = create<AuthState>((set, get) => ({
    user: null,
    setUser: (user) => set({ user }),
    logout: () => {
        set({ user: null });
        // Optional: redirect to login or clear local storage if any other metadata was kept
    },
    isAuthenticated: () => !!get().user,
}));
