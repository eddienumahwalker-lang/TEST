import { useState, useCallback } from 'react';

export function useCounter(initialValue: number = 0, step: number = 1) {
  const [counter, setCounter] = useState<number>(initialValue);

  const increment = useCallback(() => setCounter((prev) => prev + step), [step]);
  const decrement = useCallback(() => setCounter((prev) => prev - step), [step]);
  const reset = useCallback(() => setCounter(initialValue), [initialValue]);

  return { counter, increment, decrement, reset };
}

import React, { useState, useCallback } from 'react';

export function useLoginForm(initialValues = { username: '', password: '' }) {
  const [values, setValues] = useState(initialValues);

  const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  const resetForm = useCallback(() => setValues(initialValues), [initialValues]);

  return { values, handleChange, resetForm };
}

import { useState, useCallback } from 'react';

interface GitHubUserData {
  name: string;
  login: string;
  avatar_url: string;
}

export function useGithubUser() {
  const [data, setData] = useState<GitHubUserData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUser = useCallback(async (username: string) => {
    if (!username) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`https://api.github.com/users/${username}`);
      if (!response.ok) {
        throw new Error('User profile not found or API limits exceeded');
      }
      const userData: GitHubUserData = await response.json();
      setData(userData);
    } catch (err: any) {
      setError(err.message || 'An error occurred');
      setData(null);
    } finally {
      setLoading(false);
    }
  }, []);

  return { data, loading, error, fetchUser };
}

import { useState, useCallback } from 'react';

interface LocationCoordinates {
  latitude: number;
  longitude: number;
}

export function useCurrentLocation() {
  const [location, setLocation] = useState<LocationCoordinates | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const getLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setError('Geolocation services are not supported by this browser');
      return;
    }

    setLoading(true);
    setError(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        setLoading(false);
      },
      (err) => {
        setError(err.message);
        setLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    );
  }, []);

  return { location, loading, error, getLocation };
}