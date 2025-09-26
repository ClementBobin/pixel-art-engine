import { useEffect, useRef } from "react";

function PixelImageEngine({ src, pixelSize = 10, width = 300, height = 300 }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });

    const img = new Image();
    img.src = src;
    img.onload = () => {
      // Turn off smoothing for pixel effect
      ctx.imageSmoothingEnabled = false;

      // Draw at reduced resolution
      const scaledW = Math.ceil(width / pixelSize);
      const scaledH = Math.ceil(height / pixelSize);

      // Step 1: draw tiny version
      ctx.clearRect(0, 0, width, height);
      ctx.drawImage(img, 0, 0, scaledW, scaledH);

      // Step 2: stretch back up (pixelated)
      const imageData = ctx.getImageData(0, 0, scaledW, scaledH);
      ctx.clearRect(0, 0, width, height);
      ctx.putImageData(imageData, 0, 0);

      // Stretch without smoothing
      ctx.drawImage(
        canvas,
        0,
        0,
        scaledW,
        scaledH,
        0,
        0,
        width,
        height
      );
    };
  }, [src, pixelSize, width, height]);

  return <canvas ref={canvasRef} width={width} height={height}></canvas>;
}

export default PixelImageEngine;
