import "./Card.scss";

interface ICardProps {
  headerIcon: React.ReactElement;
  headerTitle: string;
  children: React.ReactNode;
  nativeProps?: React.HTMLAttributes<HTMLDivElement>;
}

export default function Card({
  headerIcon,
  headerTitle,
  children,
  nativeProps,
}: ICardProps) {
  return (
    <article className="card" {...nativeProps}>
      <header>
        <h2>
          <span>{headerIcon}</span>
          {headerTitle}
        </h2>
      </header>
      {children}
    </article>
  );
}
