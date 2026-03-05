import { useProfile } from './useProfile';
import { useAuth } from '../../../hooks/useAuth';

export const useOnboardingGate = () => {
  const { user } = useAuth();
  const { isProfileComplete, isProfileLoading, isCompleteLoading } = useProfile();

  const needsOnboarding = user ? !isProfileComplete : false;
  const loading = isProfileLoading || isCompleteLoading;

  return { needsOnboarding, loading };
};
