import { motion } from 'framer-motion';

// Circuit pattern background component
export function CircuitPattern({ className = "" }) {
  return (
    <div 
      className={`absolute inset-0 opacity-10 pointer-events-none ${className}`}
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2300FFFF' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      }}
    />
  );
}

// Animated node graph component
export function NodeGraph({ className = "" }) {
  const nodes = [
    { id: 1, x: 20, y: 20, delay: 0 },
    { id: 2, x: 80, y: 20, delay: 0.2 },
    { id: 3, x: 20, y: 80, delay: 0.4 },
    { id: 4, x: 80, y: 80, delay: 0.6 },
    { id: 5, x: 50, y: 50, delay: 0.3 },
  ];

  return (
    <svg 
      className={`absolute inset-0 w-full h-full ${className}`}
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
    >
      {/* Connections */}
      {nodes.map((node, i) => 
        nodes.slice(i + 1).map((target) => (
          <motion.line
            key={`${node.id}-${target.id}`}
            x1={`${node.x}%`}
            y1={`${node.y}%`}
            x2={`${target.x}%`}
            y2={`${target.y}%`}
            stroke="#00FFFF"
            strokeWidth="0.5"
            strokeOpacity="0.3"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.3 }}
            transition={{ duration: 2, delay: node.delay }}
          />
        ))
      )}
      
      {/* Nodes */}
      {nodes.map((node) => (
        <motion.circle
          key={node.id}
          cx={`${node.x}%`}
          cy={`${node.y}%`}
          r="1.5"
          fill="#00FFFF"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ 
            duration: 0.5, 
            delay: node.delay,
            type: "spring",
            stiffness: 200
          }}
        />
      ))}
    </svg>
  );
}

// Binary/hex pattern overlay
export function BinaryPattern({ className = "" }) {
  const binaryStrings = [
    "01001000 01100101 01101100 01101100 01101111",
    "01000010 01110101 01101001 01101100 01100100",
    "01000010 01110010 01100101 01100001 01101011",
    "01001001 01101110 01101110 01101111 01110110 01100001 01110100 01100101",
  ];

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {binaryStrings.map((binary, i) => (
        <motion.div
          key={i}
          className="absolute font-mono text-xs text-eng-cyan/20 whitespace-nowrap"
          style={{
            top: `${20 + i * 25}%`,
            left: '-100%',
          }}
          animate={{
            x: ['100vw', '-100%'],
          }}
          transition={{
            duration: 20 + i * 5,
            repeat: Infinity,
            ease: 'linear',
            delay: i * 2,
          }}
        >
          {binary}
        </motion.div>
      ))}
    </div>
  );
}

// Gradient orb for depth
export function GradientOrb({ color = "cyan", size = "400", className = "" }) {
  const colorMap = {
    cyan: "rgba(0, 255, 255, 0.15)",
    yellow: "rgba(250, 204, 21, 0.15)",
    purple: "rgba(124, 58, 237, 0.15)",
  };

  return (
    <motion.div
      className={`absolute rounded-full blur-3xl ${className}`}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        background: `radial-gradient(circle, ${colorMap[color]}, transparent 70%)`,
      }}
      animate={{
        scale: [1, 1.2, 1],
        opacity: [0.3, 0.5, 0.3],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}

