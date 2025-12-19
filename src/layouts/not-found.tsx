import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from '@tanstack/react-router';
import { AlertCircle, Home } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export function NotFound() {
  const { t } = useTranslation('translation', { keyPrefix: 'notFound' });
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
            <AlertCircle className="h-8 w-8 text-destructive" />
          </div>
          <CardTitle className="text-3xl font-bold">404</CardTitle>
          <CardDescription className="text-lg">{t('title')}</CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-muted-foreground">{t('description')}</p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Link to="/">
            <Button className="cursor-pointer">
              <Home className="mr-2 h-4 w-4" />
              {t('goHome')}
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
