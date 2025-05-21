
import React, { useState } from "react";
import { Star } from "lucide-react";

interface RatingProps {
  initialValue?: number;
  totalStars?: number;
  onChange?: (rating: number) => void;
  readOnly?: boolean;
  className?: string;
}

const Rating = ({
  initialValue = 0,
  totalStars = 5,
  onChange,
  readOnly = false,
  className = "",
}: RatingProps) => {
  const [rating, setRating] = useState(initialValue);
  const [hoverRating, setHoverRating] = useState(0);

  const handleRatingChange = (newRating: number) => {
    if (readOnly) return;
    
    setRating(newRating);
    if (onChange) {
      onChange(newRating);
    }
  };

  return (
    <div className={`flex items-center ${className}`}>
      {[...Array(totalStars)].map((_, index) => {
        const starValue = index + 1;
        const isFilled = readOnly
          ? starValue <= rating
          : starValue <= (hoverRating || rating);

        return (
          <span
            key={index}
            className={`cursor-${readOnly ? "default" : "pointer"} transition-colors`}
            onClick={() => handleRatingChange(starValue)}
            onMouseEnter={() => !readOnly && setHoverRating(starValue)}
            onMouseLeave={() => !readOnly && setHoverRating(0)}
          >
            <Star
              className={`h-5 w-5 ${
                isFilled
                  ? "fill-yellow-400 text-yellow-400"
                  : "fill-transparent text-gray-300"
              }`}
            />
          </span>
        );
      })}
    </div>
  );
};

export { Rating };
