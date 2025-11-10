"use client";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Copy, Check } from "lucide-react";
import { useState } from "react";

interface CodeBlockProps {
  code: string;
  language?: string;
  showLineNumbers?: boolean;
  className?: string;
}

export default function CodeBlock({
  code,
  language = "typescript",
  showLineNumbers = false,
  className = "",
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`relative group ${className}`}>
      <button
        onClick={handleCopy}
        className="absolute right-4 top-4 p-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors opacity-0 group-hover:opacity-100"
        aria-label="Copy code"
      >
        {copied ? (
          <Check className="h-4 w-4 text-green-400" />
        ) : (
          <Copy className="h-4 w-4 text-gray-300" />
        )}
      </button>
      <SyntaxHighlighter
        language={language}
        style={vscDarkPlus}
        showLineNumbers={showLineNumbers}
        customStyle={{
          margin: 0,
          borderRadius: "0.5rem",
          fontSize: "0.875rem",
          padding: "1.5rem",
        }}
        codeTagProps={{
          style: {
            fontFamily: "JetBrains Mono, monospace",
          },
        }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
}
