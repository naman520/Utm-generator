import { useState } from "react";

const PLATFORMS = [
  { name: "Reddit", icon: "🤖", utm: "reddit" },
  { name: "Instagram", icon: "📸", utm: "instagram" },
  { name: "X", icon: "𝕏", utm: "x" },
  { name: "Facebook", icon: "📘", utm: "facebook" },
  { name: "Blogger", icon: "✍️", utm: "blogger" },
  { name: "Quora", icon: "❓", utm: "quora" },
  { name: "Pinterest", icon: "📌", utm: "pinterest" },
  { name: "Medium", icon: "Ⓜ️", utm: "medium" },
  { name: "Tumblr", icon: "🎀", utm: "tumblr" },
];

function slugify(text) {
  return text.toLowerCase().trim().replace(/\s+/g, "_").replace(/[^a-z0-9_]/g, "");
}

export default function App() {
  const [mode, setMode] = useState("bio");
  const [platform, setPlatform] = useState(null);
  const [siteUrl, setSiteUrl] = useState("");
  const [postTitle, setPostTitle] = useState("");
  const [copied, setCopied] = useState(false);

  const selectedPlatform = PLATFORMS.find((p) => p.name === platform);

  function generateLink() {
    if (!selectedPlatform || !siteUrl) return "";
    const medium = mode === "bio" ? "bio" : "social";
    const campaign = mode === "bio" ? "bio_link" : slugify(postTitle) || "post";
    const cleanBase = siteUrl.replace(/\/$/, "");
    return `${cleanBase}?utm_source=${selectedPlatform.utm}&utm_medium=organic&utm_campaign=${campaign}`;
  }

  const generatedLink = generateLink();
  const canGenerate = selectedPlatform && siteUrl && (mode === "bio" || postTitle);

  function copyLink() {
    if (!canGenerate) return;
    navigator.clipboard.writeText(generatedLink).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 px-4 py-12 font-mono">
      <div className="max-w-xl mx-auto">

        {/* Header */}
        <div className="mb-10">
          <h1 className="text-5xl font-bold tracking-tight text-white mb-1">UTM Forge</h1>
          <p className="text-xs tracking-widest text-white uppercase">Link Tracker Generator</p>
        </div>

        {/* Mode Toggle */}
        <div className="flex mb-8 border border-zinc-800 w-fit rounded overflow-hidden">
          <button
            onClick={() => setMode("bio")}
            className={`px-6 py-2.5 text-xs tracking-widest uppercase font-bold transition-all ${
              mode === "bio"
                ? "bg-yellow-300 text-zinc-900"
                : "bg-transparent text-zinc-500 hover:text-yellow-300"
            }`}
          >
            Bio Link
          </button>
          <button
            onClick={() => setMode("post")}
            className={`px-6 py-2.5 text-xs tracking-widest uppercase font-bold transition-all ${
              mode === "post"
                ? "bg-yellow-300 text-zinc-900"
                : "bg-transparent text-zinc-500 hover:text-yellow-300"
            }`}
          >
            Post Link
          </button>
        </div>

        {/* Platform Picker */}
        <p className="text-xs tracking-widest text-white uppercase mb-3">Select Platform</p>
        <div className="flex flex-wrap gap-2 mb-8">
          {PLATFORMS.map((p) => (
            <button
              key={p.name}
              onClick={() => setPlatform(p.name)}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs border transition-all ${
                platform === p.name
                  ? "bg-yellow-300 border-yellow-300 text-zinc-900 font-bold"
                  : "bg-transparent border-zinc-800 text-zinc-500 hover:border-yellow-300 hover:text-yellow-300"
              }`}
            >
              {p.name}
            </button>
          ))}
        </div>

        <div className="border-t border-zinc-900 my-6" />

        {/* URL Input */}
        <div className="mb-5">
          <p className="text-xs tracking-widest text-white uppercase mb-2">
            {mode === "bio" ? "Your Site URL" : "Destination URL"}
          </p>
          <input
            type="text"
            placeholder="https://yoursite.com"
            value={siteUrl}
            onChange={(e) => setSiteUrl(e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-800 text-zinc-100 placeholder-zinc-700 px-4 py-3 text-sm outline-none focus:border-yellow-300 transition-colors"
          />
        </div>

        {/* Post Title Input */}
        {mode === "post" && (
          <div className="mb-5">
            <p className="text-xs tracking-widest text-white uppercase mb-2">Post Title</p>
            <input
              type="text"
              placeholder="My Awesome Post Title"
              value={postTitle}
              onChange={(e) => setPostTitle(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-800 text-zinc-100 placeholder-zinc-700 px-4 py-3 text-sm outline-none focus:border-yellow-300 transition-colors"
            />
          </div>
        )}

        {/* Output Box */}
        <div className="bg-zinc-900 border border-zinc-800 p-5 mt-8">
          <p className="text-xs tracking-widest text-white uppercase mb-3">Generated UTM Link</p>
          <p className={`text-sm leading-relaxed break-all ${canGenerate ? "text-yellow-300" : "text-zinc-700"}`}>
            {canGenerate
              ? generatedLink
              : `Fill in the fields above to generate your ${mode === "bio" ? "bio" : "post"} link`}
          </p>
          <button
            onClick={copyLink}
            disabled={!canGenerate}
            className={`mt-4 px-6 py-2 text-xs font-bold tracking-widest uppercase transition-all ${
              copied
                ? "bg-emerald-400 text-zinc-900"
                : canGenerate
                ? "bg-yellow-300 text-zinc-900 hover:bg-white cursor-pointer"
                : "bg-zinc-800 text-white cursor-not-allowed"
            }`}
          >
            {copied ? "✓ Copied!" : "Copy Link"}
          </button>
        </div>

        {/* UTM Breakdown */}
        {canGenerate && (
          <div className="mt-2 px-4 py-3 bg-zinc-900 border border-zinc-800 text-xs text-zinc-500 flex flex-wrap gap-x-6 gap-y-1">
            <span><span className="text-zinc-700">source: </span>{selectedPlatform?.utm}</span>
            <span><span className="text-zinc-700">medium: </span>{mode === "bio" ? "bio" : "social"}</span>
            <span><span className="text-zinc-700">campaign: </span>{mode === "bio" ? "bio_link" : slugify(postTitle) || "post"}</span>
          </div>
        )}
      </div>
    </div>
  );
}