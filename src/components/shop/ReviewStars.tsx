import { Star } from "lucide-react";

export default function ReviewStars({
  rating,
  className = "",
  iconClassName = "h-3.5 w-3.5",
}: {
  rating: number;
  className?: string;
  iconClassName?: string;
}) {
  const rounded = Math.round(rating);
  return (
    <div className={`flex items-center gap-0.5 text-gold ${className}`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={iconClassName}
          fill={i <= rounded ? "currentColor" : "none"}
          strokeWidth={1.5}
        />
      ))}
    </div>
  );
}
