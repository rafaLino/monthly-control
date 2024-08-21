import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_main/analytics')({
  component: () => <div>Hello /_main/analytics!</div>
})