import { Link, useLocation } from '@tanstack/react-router';
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator } from '../ui/breadcrumb';
import { capitalize } from '@/lib/utils';

function getPathToGo(pathnames: string[], index: number) {
  const pathname = pathnames.slice(0, index + 1).join('/');
  return `/${pathname}`;
}

export const DynamicBreadcrumb = () => {
  const pathnames = useLocation({
    select: (location) => location.pathname.split('/').filter(Boolean),
  });

  return (
    <Breadcrumb className='hidden md:flex'>
      <BreadcrumbList>
        {pathnames.length === 0 ? (
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to='/'>Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
        ) : (
          pathnames.map((name, index, { length }) => (
            <BreadcrumbItem key={name}>
              <BreadcrumbLink asChild>
                <Link
                  to={getPathToGo(pathnames, index)}
                  activeOptions={{ exact: true }}
                  className='[&.active]:font-bold'
                >
                  {capitalize(name)}
                </Link>
              </BreadcrumbLink>
              {length - 1 !== index && <BreadcrumbSeparator />}
            </BreadcrumbItem>
          ))
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
};
