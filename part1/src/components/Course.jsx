import React from "react";

const Course = ({ course }) => {
  return (
    <div>
      <h2>{course.name}</h2>
      <div>
        {course.parts.map((part) => (
          <p key={part.id}>
            {part.name} - {part.exercises} exercises
          </p>
        ))}
      </div>
    </div>
  );
};

export default Course;
