import { render, screen, waitFor } from '@testing-library/react';
import SpotifyCard from '@/components/SpotifyCard/SpotifyCard';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import '@testing-library/jest-dom';

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    const { src, alt, priority, ...rest } = props;
    return <img src={src} alt={alt} {...rest} />;
  },
}));

const mock = new MockAdapter(axios);

const mockTrack = {
  isPlaying: true,
  title: 'Mock Song',
  artist: 'Mock Artist',
  album: 'Mock Album',
  albumArt: 'mock-album-art.jpg',
  trackUrl: 'https://open.spotify.com/track/mockuri',
  uri: 'spotify:track:mockuri',
};

describe('SpotifyCard', () => {
  afterEach(() => {
    mock.reset();
  });

  it('renders shimmer placeholders while loading', async () => {
    // Slow the response so shimmer renders first
    mock.onGet('/api/spotify').reply(() => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve([200, mockTrack]);
        }, 100); // small delay
      });
    });

    render(<SpotifyCard />);

    expect(screen.getByTestId('shimmer')).toBeInTheDocument();
    // Wait for actual track info to appear to complete the loading cycle
    await waitFor(() => {
      expect(screen.getByText(/Mock Song/i)).toBeInTheDocument();
    });
  });

  it('renders track info after successful fetch', async () => {
    mock.onGet('/api/spotify').reply(200, mockTrack);

    render(<SpotifyCard />);

    await waitFor(() => {
      expect(screen.getByText(/Mock Song/i)).toBeInTheDocument();
    });

    expect(screen.getByText(/Mock Artist/i)).toBeInTheDocument();
    expect(screen.getByText(/Listening now/i)).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveAttribute('src', 'mock-album-art.jpg');
  });

  it('renders nothing if fetch fails', async () => {
    mock.onGet('/api/spotify').networkError();

    const { container } = render(<SpotifyCard />);

    await waitFor(() => {
      expect(container).toBeEmptyDOMElement();
    });
  });
});
