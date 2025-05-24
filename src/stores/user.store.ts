import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '@/types/user';

const defaultUser: User = {
  id: '',
  firstName: '',
  lastName: '',
  email: '',
  
};

const useCurrentUserStore = create(
  persist<{
    currentUser: User;
    setCurrentUser: (user: User) => void;
    updateCurrentUser: (user: Partial<User>) => void;
  }>(
    (set) => ({
      currentUser: defaultUser,

      setCurrentUser: (user: User) => set({ currentUser: user }),

      updateCurrentUser: (user: Partial<User>) =>
        set((state) => ({
          currentUser: {
            ...state.currentUser,
            ...user,
          },
        })),
    }),
    {
      name: 'user',
      getStorage: () => sessionStorage,
    }
  )
);

export function useCurrentUserState() {
  const { currentUser, setCurrentUser, updateCurrentUser } =
    useCurrentUserStore();

  return {
    currentUser,

    setCurrentUser(user: User) {
      setCurrentUser(user);
    },

    updateCurrentUser(user: Partial<User>) {
      updateCurrentUser(user);
    },
  };
}
