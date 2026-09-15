import React from "react";

export default function LineAnimation() {
  return (
    <div className="mt-4">
      {/* 
        Injecting the keyframe animation directly into the browser.
        This handles the white block ('::after') moving back and forth across the line.
      */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes section-title-run-center {
          0% { left: calc(50% - 75px); }
          50% { left: calc(50% + 69px); } /* 75px line width minus 6px white block width */
          100% { left: calc(50% - 75px); }
        }
        .animate-mask-run::after {
          animation: section-title-run-center 5s linear infinite;
        }
      `,
        }}
      />

      {/* 
        The Magic Element:
        - 'before:': Creates the 150px static Teal line centered underneath.
        - 'after:': Creates the 6px White moving block that mimics the typing/erasing cut.
      */}
      <div
        className="relative w-[150px] h-[5px] animate-mask-run
        
        /* The Base Teal Line */
        before:content-[''] before:absolute before:bottom-0 
        before:left-1/2 before:-ml-[75px] before:w-[150px] before:h-[5px] 
        before:bg-[#00CD99] before:rounded-[2px]

        /* The Moving White Mask */
        after:content-[''] after:absolute after:bottom-0 
        after:w-[6px] after:h-[5px] after:bg-[#081729]"
      />
    </div>
  );
}
