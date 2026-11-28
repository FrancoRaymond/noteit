import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, it, expect } from 'vitest'
import Navbar from './Navbar'

describe('Navbar Component', () => {

  it('should render the application logo', () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    )

    const logo = screen.getByRole('link', { name: 'Note it' })

    expect(logo).toBeInTheDocument()
    expect(logo).toHaveAttribute('href', '/')
  })

  it('should render the Add note link', () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    )

    const addNoteLink = screen.getByRole('link', {
      name: /add note/i
    })

    expect(addNoteLink).toBeInTheDocument()
    expect(addNoteLink).toHaveAttribute('href', '/create')
  })

})
