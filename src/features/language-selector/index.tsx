import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarTrigger } from '../../components/ui/menubar';
import { useLanguage } from './hooks/useLanguage';
import { LanguageIcon } from './icons';
import { LanguageOption } from './types/languageOption';

export function LanguageSelector() {
  const [language, setLanguage] = useLanguage();

  const handleChangeLanguage = (event: React.MouseEvent<HTMLDivElement>) => {
    setLanguage(event.currentTarget.dataset.value as LanguageOption);
  };
  return (
    <Menubar className="border-0 bg-stale-200 w-14">
      <MenubarMenu>
        <MenubarTrigger className="cursor-pointer">
          <LanguageIcon name={language} className="h-6 w-6" />
        </MenubarTrigger>
        <MenubarContent className="min-w-8">
          <MenubarItem textValue="br" data-value="br" onClick={handleChangeLanguage}>
            <LanguageIcon name="br" className="h-6 w-6" />
          </MenubarItem>
          <MenubarItem textValue="en" data-value="en" onClick={handleChangeLanguage}>
            <LanguageIcon name="en" className="h-6 w-6" />
          </MenubarItem>
          <MenubarItem textValue="es" data-value="es" onClick={handleChangeLanguage}>
            <LanguageIcon name="es" className="h-6 w-6" />
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}
