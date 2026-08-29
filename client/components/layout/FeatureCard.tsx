interface FeatureCardProps {
  icon: string;
  title: string;
}

export default function FeatureCard({
  icon,
  title,
}: FeatureCardProps) {
  return (
    <div className="flex items-center gap-4 rounded-2xl bg-blue-50 p-4">
      <span className="text-3xl">{icon}</span>

      <h3 className="font-medium">{title}</h3>
    </div>
  );
}
