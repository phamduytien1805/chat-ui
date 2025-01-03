
import { SparklesCore } from "../sparkles";
import { TextGenerateEffect } from "../text-generate-effect";

export function SparklesPreview() {
  return (
    <div className="h-full w-full flex flex-col items-center justify-center overflow-hidden bg-background">
      <h1 className="md:text-5xl text-2xl lg:text-7xl font-bold text-center text-white relative z-20">
        {"Whisper"}
        {/**{"Where Your Secrets are Locked Tight"} */}
      </h1>
      <div className="w-[35rem] h-40 relative">
        <TextGenerateEffect className="absolute top-0 justify-items-center w-full md:text-5xl text-2xl lg:text-7xl" words="Where Your Secrets are Locked Tight" />
        {/* Gradients */}
        <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm" />
        <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4" />
        <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm" />
        <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4" />

        {/* Core component */}
        <SparklesCore
          background="transparent"
          minSize={0.4}
          maxSize={1}
          particleDensity={1200}
          className="w-full h-full"
          particleColor="#FFFFFF"
        />

        {/* Radial Gradient to prevent sharp edges */}
        <div className="absolute inset-0 w-full h-full bg-background [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]"></div>
      </div>
    </div>
  );
}
