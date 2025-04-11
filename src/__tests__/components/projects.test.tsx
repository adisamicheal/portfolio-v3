import { render, screen } from '@testing-library/react';
import Projects from '@/components/Projects/Projects';
import mockData from '@/data/projects.json';
import '@testing-library/jest-dom';

jest.mock('next/link', () => {
  return ({ children }: { children: React.ReactNode }) => children;
});

describe('Projects component', () => {
  it('renders heading', () => {
    render(<Projects />);
    expect(screen.getByRole('heading', { name: /Featured Projects/i })).toBeInTheDocument();
  });

  it('renders correct project names', () => {
    render(<Projects />);
    mockData.forEach((project) => {
      expect(screen.getByText(project.name)).toBeInTheDocument();
    });
  });
});
