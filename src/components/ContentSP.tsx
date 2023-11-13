interface IContentProps {
  icon: React.ReactNode;
  title: string;
  data: {
    key: string;
    value: string | number;
    extra?: React.ReactNode;
  }[];
}

export default function ContentSP({ icon, title, data }: IContentProps) {
  return (
    <article className="content-sp">
      <header>
        <h2>
          {icon} {title}
        </h2>
      </header>
      <div>
        {data.map((elem, index: number) => (
          <p key={index}>
            <span>{elem.key}</span>
            {elem.extra ? (
              <span className="extra">
                {elem.value} {elem.extra}
              </span>
            ) : (
              elem.value
            )}
          </p>
        ))}
      </div>
    </article>
  );
}
