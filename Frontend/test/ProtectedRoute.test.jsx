import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { MemoryRouter, Route, Routes, useLocation } from 'react-router-dom';
import ProtectedRoute from '../src/components/common/ProtectedRoute';

function CurrentLocation() {
  const location = useLocation();
  return <p>{`${location.pathname}${location.search}`}</p>;
}

function renderProtectedRoute(initialEntry) {
  return render(
    <MemoryRouter initialEntries={[initialEntry]}>
      <Routes>
        <Route path="/signin" element={<CurrentLocation />} />
        <Route
          path="*"
          element={
            <ProtectedRoute>
              <p>Protected content</p>
            </ProtectedRoute>
          }
        />
      </Routes>
    </MemoryRouter>,
  );
}

afterEach(() => {
  localStorage.clear();
  cleanup();
});

describe('ProtectedRoute', () => {
  it('redirects unauthenticated users to sign-in with the requested path', () => {
    renderProtectedRoute('/trip-planner-2?step=2');

    expect(screen.getByText('/signin?redirect=%2Ftrip-planner-2')).toBeTruthy();
  });

  it('renders protected content when a token is present', () => {
    localStorage.setItem('token', 'test-token');

    renderProtectedRoute('/trip-planner-2');

    expect(screen.getByText('Protected content')).toBeTruthy();
  });
});
