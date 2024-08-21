import { Button } from '@/components/ui/button';
import { Card, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth0 } from '@auth0/auth0-react';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/login')({
  component: Index,
});

function Index() {
  const { loginWithRedirect } = useAuth0();
  return (
    <div className='flex items-center justify-center h-svh w-full'>
      <Card className='w-full max-w-sm flex flex-col justify-evenly text-center'>
        <CardHeader>
          <CardTitle className='text-2xl'>Welcome</CardTitle>
        </CardHeader>
        <CardFooter>
          <Button className='w-full' onClick={() => loginWithRedirect()}>
            Sign in
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

/**
 * import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function LoginForm() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your email below to login to your account.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="m@example.com" required />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" required />
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Sign in</Button>
      </CardFooter>
    </Card>
  )
}

 */
