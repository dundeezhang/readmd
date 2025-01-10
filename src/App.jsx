import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

import "./App.css";

function App() {
  const currYear = new Date().getFullYear();
  const [fileContents, setFileContents] = useState([]);

  const handleMultipleFileUpload = (event) => {
    const files = event.target.files;
    let combinedContents = [];

    Array.from(files).forEach((file, index) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        combinedContents.push({ name: file.name, content: e.target.result });
        if (index === files.length - 1) {
          setFileContents(combinedContents);
        }
      };
      reader.readAsText(file);
    });
  };

  return (
    <div className="application">
      <div className="wrap-everything">
        <div className="explain">
          <h1 className="prog-title">Markdown File Viewer</h1>
          <p className="by-tag">by dhz</p>
          <p>
            This is a simple and lightweight markdown file viewer. View your
            markdown files in full glory with full syntax highlighting for code
            snippets. Upload markdown files and see the content displayed here.
            The files will be read and displayed in real-time. See the table of
            contents for quick navigation.
          </p>
          <p>You can upload multiple files to view at the same time.</p>
        </div>
        <h2>Submit Markdown Files</h2>
        <input
          type="file"
          className="submit"
          accept=".md"
          multiple
          onChange={handleMultipleFileUpload}
        />
        <nav className="file-nav">
          <ul>
            <p>Table of Contents:</p>
            {fileContents.map((file, index) => (
              <li key={index}>
                <a href={`#${file.name}`}>{file.name}</a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="app-content">
          {fileContents.map((file, index) => (
            <div key={index} id={file.name}>
              <hr />
              <h3 className="filename">{file.name}</h3>
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
                {file.content}
              </ReactMarkdown>
            </div>
          ))}
          <hr />
          <h3 className="endoffile">End of File(s)</h3>
          <p>
            Check out my other projects and programs at{" "}
            <a href="https://dundeezhang.com">dundeezhang.com</a>{" "}
          </p>
        </div>
      </div>
      <footer>
        <p>Dundee Zhang {currYear} - Some rights reserved</p>
        <a href="https://dundeezhang.com">dundeezhang.com</a>
      </footer>
    </div>
  );
}

export default App;
