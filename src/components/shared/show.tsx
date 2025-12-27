interface ShowProps {
  when: boolean;
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export const Show = ({ when, children, fallback }: ShowProps) => {
  if (when) return <>{children}</>;
  if (fallback) return <>{fallback}</>;
  return null;
};
