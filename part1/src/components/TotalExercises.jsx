import React from "react";

const TotalExercises = ({ parts }) => {
  const totalExercises = parts.reduce(
    (total, part) => total + part.exercises,
    0
  );

  return (
    <div>
      <p>
        <strong>Total exercises: {totalExercises}</strong>
      </p>
    </div>
  );
};

export default TotalExercises;
