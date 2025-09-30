export default function AbstracBackground({ color = "#00ffff" }) {
  return (
    <div className="fixed inset-0 w-screen h-screen z-0 pointer-events-none">
      <svg
        width="100%"
        height="100%"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute inset-0"
      >
        <defs>
          <pattern
            id="wavePattern"
            patternUnits="userSpaceOnUse"
            width="200"
            height="80"
          >
            <path
              d="M 0 40 Q 50 0, 100 40 T 200 40"
              stroke={color}
              strokeWidth="1"
              fill="none"
              strokeDasharray="20 180"
              strokeDashoffset="0"
              opacity="0.7"
            >
              <animate
                attributeName="stroke-dashoffset"
                from="0"
                to="-200"
                dur="6s"
                repeatCount="indefinite"
              />
            </path>
          </pattern>

          <pattern
            id="wavePattern2"
            patternUnits="userSpaceOnUse"
            width="250"
            height="100"
          >
            <path
              d="M 0 50 Q 60 10, 125 50 T 250 50"
              stroke={color}
              strokeWidth="0.8"
              fill="none"
              strokeDasharray="15 200"
              strokeDashoffset="0"
              opacity="0.4"
            >
              <animate
                attributeName="stroke-dashoffset"
                from="0"
                to="-250"
                dur="8s"
                repeatCount="indefinite"
              />
            </path>
          </pattern>
        </defs>

        <rect width="100%" height="100%" fill="url(#wavePattern)" />

        <rect width="100%" height="100%" fill="url(#wavePattern2)" />
      </svg>
    </div>
  );
}
