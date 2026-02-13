import { useState } from 'react';
import './Tile.css';

/**
 * Tile component
 * Renders a single project card with front (image + title + status) and back (description).
 * Click the image to flip. Hover expands if description is long.
 * Accepts `project` prop with `title`, `description`, `image`, `status`, and `createdAt`.
 */
export default function Tile({ project }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const title = project.title || project.name || 'Untitled';
  const description = project.description || '';
  const image = project.image || project.img || '';
  const status = project.status || '';
  const createdAt = project.createdAt ? new Date(project.createdAt).toLocaleDateString() : '';


  const handleImageClick = (e) => {
    // prevent outer click handlers from toggling unexpectedly
    e.stopPropagation();
    setIsFlipped((v) => !v);
  };

  return (
    <div className="tile-root">
      <div
        className={`tile-box ${isFlipped ? 'flipped' : ''} ${isHovered ? 'expanded' : ''}`}
        role="group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Front: Image + title + status badge */}
        <div className="tile-front" aria-hidden={isFlipped} onClick={handleImageClick} role="button" tabIndex={0}>
          {status && <div className={`status-badge status-${status.toLowerCase()}`}>{status}</div>}

          {image ? (
            <img
              src={image}
              alt={title}
              className="tile-image"
            />
          ) : (
            <div className="tile-image-placeholder">
              No Image
            </div>
          )}

          <div className="tile-title">{title}</div>
        </div>

        {/* Back: Description */}
        <div className="tile-back" aria-hidden={!isFlipped}
            onClick={handleImageClick}
            role="button"
            tabIndex={0}>
          <div className="tile-desc">{description}</div>
        </div>
      </div>

      {/* CreatedAt shown below the tile */}
      {createdAt && <div className="tile-date">{createdAt}</div>}
    </div>
  );
}
