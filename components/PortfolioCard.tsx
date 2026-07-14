type PortfolioCardProps = {
  index: string;
  client: string;
  title: string;
  result: string;
};

export default function PortfolioCard({ index, client, title, result }: PortfolioCardProps) {
  return (
    <div className="border-t border-border py-6 grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-6 items-baseline">
      <span className="font-mono text-xs text-steel md:col-span-1">{index}</span>
      <span className="text-xs text-brand-red md:col-span-3">{client}</span>
      <h3 className="font-display text-base font-bold text-charcoal md:col-span-4">
        {title}
      </h3>
      <p className="text-sm text-steel md:col-span-4">{result}</p>
    </div>
  );
}
