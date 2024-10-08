import { Button } from '@/components/ui/button';
import { Card, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth0 } from '@auth0/auth0-react';
import { createFileRoute } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import logo from '/icon-512x512.png';
export const Route = createFileRoute('/login')({
  component: Index
});

function Index() {
  const { t } = useTranslation('translation', { keyPrefix: 'login' });
  const { loginWithRedirect } = useAuth0();
  return (
    <div className="flex items-center justify-center h-svh w-full">
      <Card className="w-full max-w-sm flex flex-col justify-evenly text-center">
        <CardHeader className="items-center">
          <CardTitle className="text-2xl">{t('welcome')}</CardTitle>
          <img src={logo} className="w-4/5" alt="logo" />
        </CardHeader>
        <CardFooter>
          <Button className="w-full" onClick={() => loginWithRedirect()}>
            {t('signin')}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
