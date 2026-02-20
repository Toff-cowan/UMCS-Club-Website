import * as React from 'react';
import { motion } from 'framer-motion';

export function TestimonialCard({ handleShuffle, testimonial, position, id, author, sig, image }) {
  const dragRef = React.useRef(0);
  const isFront = position === "front";
  const hasImage = image && String(image).trim();

  return (
    <motion.div
      style={{
        zIndex: position === "front" ? "2" : position === "middle" ? "1" : "0"
      }}
      animate={{
        rotate: position === "front" ? "-6deg" : position === "middle" ? "0deg" : "6deg",
        x: position === "front" ? "0%" : position === "middle" ? "33%" : "66%"
      }}
      drag={true}
      dragElastic={0.35}
      dragListener={isFront}
      dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
      onDragStart={(e) => { dragRef.current = e.clientX; }}
      onDragEnd={(e) => {
        if (dragRef.current - e.clientX > 150) {
          handleShuffle();
        }
        dragRef.current = 0;
      }}
      transition={{ duration: 0.35 }}
      className={`sigs-testimonial-card ${isFront ? "draggable" : ""}`}
    >
      {hasImage ? (
        <img src={image} alt={`Avatar of ${author}`} />
      ) : (
        <div className="sigs-testimonial-card-avatar-placeholder" aria-hidden="true" />
      )}
      <span className="quote">"{testimonial}"</span>
      <div className="meta">
        <span className="author">{author}</span>
        {sig && <span className="sig">{sig}</span>}
      </div>
    </motion.div>
  );
}

