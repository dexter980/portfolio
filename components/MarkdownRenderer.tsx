"use client";

interface MarkdownRendererProps {
  content: string;
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  const lines = content.split("\n");
  const elements: React.ReactNode[] = [];
  let i = 0;

  const parseInline = (text: string): React.ReactNode => {
    if (!text.includes("`") && !text.includes("**") && !text.includes("*") && !text.includes("[")) {
      return text;
    }
    const parts: React.ReactNode[] = [];
    let lastIndex = 0;
    let codeIndex = text.indexOf("`");
    while (codeIndex !== -1 || text.includes("**") || text.includes("*") || text.includes("[") || lastIndex < text.length) {
      const remaining = text.slice(lastIndex);
      const codeMatch = remaining.indexOf("`");
      const boldMatch = remaining.indexOf("**");
      const linkMatch = remaining.indexOf("[");
      const italicMatch = remaining.indexOf("*");

      let minIndex = remaining.length;
      let minType: "code" | "link" | "bold" | "italic" | null = null;
      if (codeMatch !== -1) minIndex = codeMatch;
      if (linkMatch !== -1 && linkMatch < minIndex) minIndex = linkMatch;
      if (boldMatch !== -1 && boldMatch < minIndex) minIndex = boldMatch;
      if (italicMatch !== -1 && italicMatch < minIndex) minIndex = italicMatch;

      if (minIndex > 0) {
        parts.push(remaining.slice(0, minIndex));
      }

      if (minType === "code" && codeMatch !== -1) {
        const endIndex = remaining.indexOf("`", codeMatch + 1);
        if (endIndex !== -1) {
          parts.push(<code key={lastIndex}>{remaining.slice(codeMatch + 1, endIndex)}</code>);
          lastIndex = lastIndex + codeMatch + 1 + (endIndex - codeMatch);
          continue;
        }
      } else if (minType === "link" && linkMatch !== -1) {
        const closeBracket = remaining.indexOf("]", linkMatch);
        const openParen = remaining.indexOf("(", closeBracket);
        const closeParen = remaining.indexOf(")", openParen + 1);
        if (closeBracket !== -1 && openParen !== -1 && closeParen !== -1) {
          const linkText = remaining.slice(linkMatch + 1, closeBracket);
          const url = remaining.slice(openParen + 1, closeParen);
          parts.push(<a key={lastIndex} href={url} className="text-blue-600 hover:text-blue-800" target="_blank" rel="noopener noreferrer">{linkText}</a>);
          lastIndex = lastIndex + linkMatch + 1 + (closeParen - linkMatch);
          continue;
        }
      } else if (minType === "bold" && boldMatch !== -1) {
        const closeBold = remaining.indexOf("**", boldMatch + 2);
        if (closeBold !== -1) {
          parts.push(<strong key={lastIndex}>{remaining.slice(boldMatch + 2, closeBold)}</strong>);
          lastIndex = lastIndex + boldMatch + 2 + (closeBold - boldMatch);
          continue;
        }
      } else if (minType === "italic" && italicMatch !== -1) {
        const closeItalic = remaining.indexOf("*", italicMatch + 1);
        if (closeItalic !== -1) {
          parts.push(<em key={lastIndex}>{remaining.slice(italicMatch + 1, closeItalic)}</em>);
          lastIndex = lastIndex + italicMatch + 1 + (closeItalic - italicMatch);
          continue;
        }
      }
      lastIndex = minIndex + 1;
    }
    if (lastIndex < text.length) {
      parts.push(text.slice(lastIndex));
    }
    return parts.length ? <>{parts}</> : text;
  };

  while (i < lines.length) {
    const line = lines[i];

    if (line.trim() === "") {
      i++;
      continue;
    }

    if (line.trim().startsWith("```")) {
      const language = line.trim().slice(3).trim();
      const codeLines: string[] = [];
      i++;
      while (i < lines.length && !lines[i].trim().startsWith("```")) {
        codeLines.push(lines[i]);
        i++;
      }
      elements.push(
        <pre key={elements.length} className="bg-gray-100 rounded-lg p-4 overflow-x-auto my-4 text-sm border border-gray-200">
          <code className="font-mono text-sm">{codeLines.map((l, idx) => <div key={idx}>{l}</div>)}</code>
        </pre>
      );
      i++;
      continue;
    }

    if (line.startsWith("# ")) {
      elements.push(<h1 key={elements.length} className="text-3xl font-bold mb-4 mt-6">{parseInline(line.slice(2))}</h1>);
      i++;
      continue;
    }

    if (line.startsWith("## ")) {
      elements.push(<h2 key={elements.length} className="text-2xl font-semibold mb-3 mt-5">{parseInline(line.slice(3))}</h2>);
      i++;
      continue;
    }

    if (line.startsWith("### ")) {
      elements.push(<h3 key={elements.length} className="text-xl font-medium mb-3 mt-4">{parseInline(line.slice(4))}</h3>);
      i++;
      continue;
    }

    if (line.startsWith("- ") || line.startsWith("* ")) {
      const bullets: React.ReactNode[] = [];
      while (i < lines.length && (lines[i].trim().startsWith("- ") || lines[i].trim().startsWith("* "))) {
        bullets.push(<li key={bullets.length} className="ml-6 list-disc">{parseInline(lines[i].trim().slice(2))}</li>);
        i++;
      }
      elements.push(<ul key={elements.length} className="list-disc ml-6 mb-4">{bullets}</ul>);
      continue;
    }

    if (line.trim().startsWith("1.")) {
      const items: React.ReactNode[] = [];
      while (i < lines.length && lines[i].trim().match(/^\d+\./)) {
        items.push(<li key={items.length} className="ml-6 list-decimal">{parseInline(lines[i].trim().split(".", 2)[1].trim())}</li>);
        i++;
      }
      elements.push(<ol key={elements.length} className="list-decimal ml-6 mb-4">{items}</ol>);
      continue;
    }

    if (line.startsWith("> ")) {
      elements.push(<blockquote key={elements.length} className="border-l-4 border-blue-500 pl-4 italic my-4">{parseInline(line.slice(2))}</blockquote>);
      i++;
      continue;
    }

    if (line.match(/^(\|.*\|)+$/)) {
      const tableRows: React.ReactNode[] = [];
      while (i < lines.length && lines[i].match(/^(\|.*\|)+$/)) {
        const cells = lines[i].slice(1, -1).split("|");
        tableRows.push(<tr key={tableRows.length}>{cells.map((c, ci) => <td key={ci} className="border border-gray-300 px-3 py-2 text-sm whitespace-nowrap">{parseInline(c.trim())}</td>)}</tr>);
        i++;
      }
      elements.push(<table key={elements.length} className="min-w-full border-collapse my-4 border border-gray-300">{tableRows}</table>);
      continue;
    }

    elements.push(<p key={elements.length} className="leading-relaxed mb-4">{parseInline(line)}</p>);
    i++;
  }

  return <div className="space-y-2">{elements}</div>;
}