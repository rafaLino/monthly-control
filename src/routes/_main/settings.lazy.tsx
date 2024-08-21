import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_main/settings')({
  component: () => <div>Hello /_main/settings!</div>
})