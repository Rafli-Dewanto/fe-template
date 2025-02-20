import { render, screen } from '@testing-library/react'
import { Show } from '../show'

describe('Show component', () => {
  it('renders children when condition is true', () => {
    render(
      <Show when={true}>
        <div>Test Content</div>
      </Show>
    )
    expect(screen.getByText('Test Content')).toBeInTheDocument()
  })

  it('does not render children when condition is false', () => {
    render(
      <Show when={false}>
        <div>Test Content</div>
      </Show>
    )
    expect(screen.queryByText('Test Content')).not.toBeInTheDocument()
  })

  it('renders fallback when condition is false and fallback is provided', () => {
    render(
      <Show when={false} fallback={<div>Fallback Content</div>}>
        <div>Test Content</div>
      </Show>
    )
    expect(screen.getByText('Fallback Content')).toBeInTheDocument()
    expect(screen.queryByText('Test Content')).not.toBeInTheDocument()
  })
})
