import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
const dracula = require("react-syntax-highlighter/dist/cjs/styles/prism/dracula").default;

const CodeBlock = ({ content }) => {
  const [copiedIndex, setCopiedIndex] = useState(null);

  const parts = content.split(/(```[\s\S]*?```)/g);

  const handleCopyCode = (code, index) => {
    navigator.clipboard.writeText(code);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return parts.map((part, index) => {
    if (part.startsWith("```")) {
      const languageMatch = part.match(/```(\w+)?/);
      const language = languageMatch ? languageMatch[1] : "plaintext";
      const code = part.replace(/```[a-z]*\n?/i, "").replace(/```$/, "");

      return (
        <div key={index} className="relative bg-black/90 text-white rounded-xl mb-5 p-2">
          <button
            onClick={() => handleCopyCode(code, index)}
            className="absolute top-5 right-2 bg-gray-800 text-white text-xs px-2 py-1 rounded hover:bg-gray-600 transition"
          >
            {copiedIndex === index ? "Copied!" : "Copy"}
          </button>

          <SyntaxHighlighter language={language} style={dracula} className="rounded-xl text-sm">
            {code}
          </SyntaxHighlighter>
        </div>
      );
    }

    return <FormattedText key={index} text={part} />;
  });
};

const FormattedText = ({ text }) => {
  return text.split("\n").map((line, index) => {
    line = line.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");

    line = line.replace(/\*(.*?)\*/g, "<em>$1</em>");

    line = line.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-blue-500 underline">$1</a>');

    if (/^\s*-\s/.test(line)) {
      return (
        <ul key={index} className="list-disc ml-5">
          <li dangerouslySetInnerHTML={{ __html: line.substring(2) }}></li>
        </ul>
      );
    }

    return <p key={index} dangerouslySetInnerHTML={{ __html: line }} className="mb-2"></p>;
  });
};

export default CodeBlock;
