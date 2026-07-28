export default function EmptyState({ label }: { label: string }) {
  return (
    <div className="bg-white border border-border rounded-md p-10 text-center">
      <p className="text-sm text-steel">Hakuna {label} bado.</p>
    </div>
  );
}
