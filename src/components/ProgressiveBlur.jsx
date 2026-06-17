import React from "react";

const ProgressiveBlur = ({ side = "top", height = "150px", className = "", zIndex = 90, position = "fixed", top, bottom }) => {
  const isTop = side === "top";

  // The original snippet used default direction ("to bottom").
  // We flip it for the bottom blur to start from the bottom and fade upwards.
  const dir = isTop ? "to bottom" : "to top";

  const blurLayers = [
    { blur: 30, mask: `${dir}, rgb(0, 0, 0) 0%, rgba(0, 0, 0, 0) 12.5%` },
    { blur: 17.71155, mask: `${dir}, rgb(0, 0, 0) 0%, rgb(0, 0, 0) 12.5%, rgba(0, 0, 0, 0) 25%` },
    {
      blur: 10.45659,
      mask: `${dir}, rgba(0, 0, 0, 0) 0%, rgb(0, 0, 0) 12.5%, rgb(0, 0, 0) 25%, rgba(0, 0, 0, 0) 37.5%`,
    },
    {
      blur: 6.1734,
      mask: `${dir}, rgba(0, 0, 0, 0) 12.5%, rgb(0, 0, 0) 25%, rgb(0, 0, 0) 37.5%, rgba(0, 0, 0, 0) 50%`,
    },
    {
      blur: 3.64467,
      mask: `${dir}, rgba(0, 0, 0, 0) 25%, rgb(0, 0, 0) 37.5%, rgb(0, 0, 0) 50%, rgba(0, 0, 0, 0) 62.5%`,
    },
    {
      blur: 2.15175,
      mask: `${dir}, rgba(0, 0, 0, 0) 37.5%, rgb(0, 0, 0) 50%, rgb(0, 0, 0) 62.5%, rgba(0, 0, 0, 0) 75%`,
    },
    {
      blur: 1.27036,
      mask: `${dir}, rgba(0, 0, 0, 0) 50%, rgb(0, 0, 0) 62.5%, rgb(0, 0, 0) 75%, rgba(0, 0, 0, 0) 87.5%`,
    },
    { blur: 0.75, mask: `${dir}, rgba(0, 0, 0, 0) 62.5%, rgb(0, 0, 0) 75%, rgb(0, 0, 0) 87.5%, rgba(0, 0, 0, 0) 100%` },
  ];

  return (
    <div
      className={`progressive-blur ${className}`}
      style={{
        position: position,
        top: top !== undefined ? top : (isTop ? 0 : undefined),
        bottom: bottom !== undefined ? bottom : (!isTop ? 0 : undefined),
        left: 0,
        right: 0,
        height: `var(--blur-height, ${height})`,
        zIndex: zIndex,
        pointerEvents: "none",
        // The container needs to let events pass through,
        // but backdrop-filter applies to the content underneath
      }}
    >
      {blurLayers.map((layer, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            inset: 0,
            zIndex: i + 1,
            maskImage: `linear-gradient(${layer.mask})`,
            WebkitMaskImage: `linear-gradient(${layer.mask})`,
            backdropFilter: `blur(${layer.blur}px)`,
            WebkitBackdropFilter: `blur(${layer.blur}px)`,
            transition: "backdrop-filter 400ms, -webkit-backdrop-filter 400ms",
            willChange: "backdrop-filter",
          }}
        />
      ))}
    </div>
  );
};

export default ProgressiveBlur;
