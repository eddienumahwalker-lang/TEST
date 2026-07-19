import { useQuery } from '@tanstack/react-query';

interface GitHubUserData {
  name: string;
  login: string;
  avatar_url: string;
}

const fetchGitHubUser = async (username: string): Promise<GitHubUserData> => {
  const response = await fetch(`https://api.github.com/users/${username}`);
  if (!response.ok) {
    throw new Error('User profile not found or API limits exceeded');
  }
  return response.json();
};

export function useGithubUser(username: string | null) {
  const { 
    data, 
    isLoading, 
    isError, 
    error, 
    refetch 
  } = useQuery<GitHubUserData, Error>({
    queryKey: ['githubUser', username],
    
    queryFn: () => fetchGitHubUser(username!),
    

    enabled: !!username && username.trim() !== '',
  });

  return {
    data,
    loading: isLoading,
    error: isError ? error?.message || 'An error occurred' : null,
    fetchUser: refetch
  };
}