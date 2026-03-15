import React, { useState } from 'react';
import Spline from '@splinetool/react-spline';

const SplineBackground = () => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="fixed inset-0 z-0">
      {/* Fallback dark base while Spline loads */}
      <div className="absolute inset-0 bg-[#09090b]" />

      {/* Spline scene — pointer-events-auto so hover interactions work */}
      <div
        className="absolute inset-0 transition-opacity duration-1000"
        style={{ opacity: loaded ? 1 : 0 }}
      >
        <Spline
          scene="https://prod.spline.design/dJqTIQ-tE3ULUPMi/scene.splinecode"
          onLoad={() => setLoaded(true)}
          style={{ width: '100%', height: '100%', pointerEvents: 'auto' }}
        />
      </div>

      {/* Edge vignette — pointer-events-none so it doesn't block Spline */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            linear-gradient(to right, rgba(9,9,11,0.7) 0%, transparent 25%, transparent 75%, rgba(9,9,11,0.7) 100%),
            linear-gradient(to bottom, rgba(9,9,11,0.4) 0%, transparent 20%, transparent 70%, rgba(9,9,11,0.85) 100%)
          `,
        }}
      />
    </div>
  );
};

export default SplineBackground;
