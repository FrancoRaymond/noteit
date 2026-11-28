
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'

import NoteCard from './NoteCard'
import api from '../lib/axios'
import toast from 'react-hot-toast'
import { formatDate } from '../utils/FormatDate'

// Mock API
vi.mock('../lib/axios', () => ({
  default: {
    delete: vi.fn()
  }
}))

// Mock toast notifications
vi.mock('react-hot-toast', () => ({
  default: {
    success: vi.fn(),
    error: vi.fn()
  }
}))

// Mock date formatter
vi.mock('../utils/FormatDate', () => ({
  formatDate: vi.fn(() => 'November 26, 2026')
}))

// Mock note
const mockNote = {
  id: '123',
  _id: '123',
  title: 'My First Note',
  content: 'This is my first note. I am learning React testing.',
  created_at: '2026-11-26'
}

// Mock state setter
const mockSetNotes = vi.fn()

// Render helper
const renderNoteCard = (note = mockNote) => {
  return render(
    <MemoryRouter>
      <NoteCard note={note} setNotes={mockSetNotes} />
    </MemoryRouter>
  )
}

describe('NoteCard Component', () => {

  beforeEach(() => {
    vi.clearAllMocks()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  // 1. Render note title
  it('should render the note title', () => {
    renderNoteCard()

    expect(
      screen.getByRole('heading', { name: 'My First Note' })
    ).toBeInTheDocument()
  })

  // 2. Render note content
  it('should render the note content', () => {
    renderNoteCard()

    expect(
      screen.getByText(mockNote.content + '...')
    ).toBeInTheDocument()
  })

  // 3. Format creation date
  it('should format and display the creation date', () => {
    renderNoteCard()

    expect(formatDate).toHaveBeenCalledWith(
      mockNote.created_at
    )

    expect(
      screen.getByText('November 26, 2026')
    ).toBeInTheDocument()
  })

  // 4. Navigate to correct note
  it('should navigate to the correct note', () => {
    renderNoteCard()

    const noteLink = screen.getByRole('link')

    expect(noteLink).toHaveAttribute('href', '/note/123')
  })

  // 5. Successfully delete note
  it('should delete a note when the user confirms', async () => {
    vi.spyOn(window, 'confirm').mockReturnValue(true)

    api.delete.mockResolvedValue({})

    renderNoteCard()

    const deleteButton = screen.getAllByRole('button')[1]

    fireEvent.click(deleteButton)

    expect(window.confirm).toHaveBeenCalledWith(
      'Are you sure you want to delete this note?'
    )

    expect(api.delete).toHaveBeenCalledWith('/notes/123')

    await waitFor(() => {
      expect(mockSetNotes).toHaveBeenCalled()
      expect(toast.success).toHaveBeenCalledWith(
        'Note deleted successfully'
      )
    })

    // Verify that the correct note is removed
    const previousNotes = [
      { _id: '123', title: 'My First Note' },
      { _id: '456', title: 'My Second Note' }
    ]

    const updater = mockSetNotes.mock.calls[0][0]

    const updatedNotes = updater(previousNotes)

    expect(updatedNotes).toEqual([
      { _id: '456', title: 'My Second Note' }
    ])
  })

  // 6. Cancel deletion
  it('should not delete a note when the user cancels', () => {
    vi.spyOn(window, 'confirm').mockReturnValue(false)

    renderNoteCard()

    const deleteButton = screen.getAllByRole('button')[1]

    fireEvent.click(deleteButton)

    expect(api.delete).not.toHaveBeenCalled()
    expect(mockSetNotes).not.toHaveBeenCalled()
    expect(toast.success).not.toHaveBeenCalled()
  })

  // 7. Handle deletion failure
  it('should display an error notification when deletion fails', async () => {
    vi.spyOn(window, 'confirm').mockReturnValue(true)

    api.delete.mockRejectedValue(
      new Error('Server error')
    )

    const consoleSpy = vi
      .spyOn(console, 'log')
      .mockImplementation(() => {})

    renderNoteCard()

    const deleteButton = screen.getAllByRole('button')[1]

    fireEvent.click(deleteButton)

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith(
        'Failed to delete note'
      )
    })

    expect(mockSetNotes).not.toHaveBeenCalled()
    consoleSpy.mockRestore()
  })
})
