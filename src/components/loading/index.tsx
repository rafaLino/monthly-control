import { FC, PropsWithChildren, ReactNode, Suspense } from 'react';

type LoadingProps = PropsWithChildren<{
  loading: boolean;
  fallback: ReactNode;
}>;

export const Loading: FC<LoadingProps> = ({ loading, fallback, children }) => {
  return <Suspense fallback={fallback}>{loading ? fallback : children}</Suspense>;
};
