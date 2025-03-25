import React from "react";

function Logo() {
  return (
    <div>
      <a href="/" className="inline-flex items-center gap-2 mb-4">
        <div className="relative w-8 h-8 overflow-hidden rounded-full bg-primary">
          <div className="absolute inset-0 flex items-center justify-center text-lg font-bold text-primary-foreground">
            P
          </div>
        </div>
        <span className="text-xl font-bold">PixelPen</span>
      </a>
    </div>
  );
}

export default Logo;
