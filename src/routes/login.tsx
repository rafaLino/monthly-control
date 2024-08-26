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
