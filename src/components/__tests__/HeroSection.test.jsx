import { render, screen } from '@testing-library/react'
import Hero from '../HeroSection'

describe('HeroSection', () => {
  it('renders heading text', () => {
    render(<Hero />)
    const heading = screen.getByRole('heading', {
      name: /hi,.*fikril.*mobile engineer based in bandung/i,
    })
    expect(heading).toBeInTheDocument()
  })
})
