import { render, screen } from '@testing-library/react'
import Navbar from '~/components/navbar'
import '@testing-library/jest-dom'

describe('Navbar', () => {
  it('renders site page links', () => {
    render(<Navbar />)

    const searchLink = screen.getByRole('link', { name: 'Search' });
    const matchesLink = screen.getByRole('link', { name: 'Matches' });

    expect(searchLink).toBeInTheDocument();
    expect(matchesLink).toBeInTheDocument();
  })
})