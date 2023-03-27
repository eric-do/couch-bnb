import { render, screen } from '@testing-library/react'
import Navbar from '~/components/navbar'
import '@testing-library/jest-dom'

describe('Navbar', () => {
  it('renders a heading', () => {
    render(<Navbar />)

    const searchLink = screen.getByRole('link', { name: 'Search' });
    const aboutLink = screen.getByRole('link', { name: 'About' });
    const matchesLink = screen.getByRole('link', { name: 'Matches' });

    expect(searchLink).toBeInTheDocument();
    expect(aboutLink).toBeInTheDocument();
    expect(matchesLink).toBeInTheDocument();
  })
})