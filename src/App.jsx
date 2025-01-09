import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

import "./App.css";

function App() {
  const [fileContent, setFileContent] = useState("");

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      setFileContent(e.target.result);
    };
    reader.readAsText(file);
  };

  return (
    <div className="application">
      <div className="wrap-everything">
        <div className="explain">
          <h1 className="prog-title">Markdown File Viewer</h1>
          <p className="by-tag">by dhz</p>
          <p>
            This is a simple markdown file viewer. Upload a markdown file and
            see the content displayed here. The file will be read and displayed
            in real-time.
          </p>
        </div>
        <h2>Submit Markdown File</h2>
        <input
          type="file"
          className="submit"
          accept=".md"
          onChange={handleFileUpload}
        />
        <div className="app-content">
          <h2>File Content:</h2>
          <ReactMarkdown
            components={{
              code({ className, children, ...rest }) {
                const match = /language-(\w+)/.exec(className || "");
                return match ? (
                  <SyntaxHighlighter
                    PreTag="div"
                    language={match[1]}
                    style={oneDark}
                    {...rest}
                  >
                    {children}
                  </SyntaxHighlighter>
                ) : (
                  <code {...rest} className={className}>
                    {children}
                  </code>
                );
              },
            }}
          >
            {fileContent}
          </ReactMarkdown>
          <hr></hr>
          <h3 className="endoffile">End of File</h3>
          <p>
            Check out my other projects and programs at{" "}
            <a href="https://dundeezhang.com">dundeezhang.com</a>{" "}
          </p>
        </div>
      </div>
      <footer>
        <p>Dundee Zhang 2025 - Some rights reserved</p>
        <a href="https://dundeezhang.com">dundeezhang.com</a>
      </footer>
    </div>
  );
}

export default App;
