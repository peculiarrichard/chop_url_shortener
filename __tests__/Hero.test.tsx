
import { render, screen } from '@testing-library/react'
import Hero from '@/components/Hero'

it("should contain the word 'Url Shortening'", () => {
    render(<Hero />)

    const title = screen.getByText(/Url Shortening/i)

    expect(title).toBeInTheDocument()
})