import { FC, PropsWithChildren, ReactNode } from 'react';

type LoadingProps = PropsWithChildren<{
  loading: boolean;
  fallback: ReactNode;
}>;

export const Loading: FC<LoadingProps> = ({ loading, fallback, children }) => (loading ? fallback : children);
