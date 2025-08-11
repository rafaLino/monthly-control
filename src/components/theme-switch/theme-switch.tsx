import { useTheme } from '@/context/ThemeProvider';
import { Moon, Sun } from 'lucide-react';
import { Label } from '../ui/label';
import { Switch } from '../ui/switch';

export const ThemeSwitch = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="flex items-center space-x-2">
      <Label htmlFor="theme">{theme === 'light' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}</Label>
      <Switch id="theme" checked={theme === 'dark'} value={theme} onCheckedChange={toggleTheme} />
    </div>
  );
};
