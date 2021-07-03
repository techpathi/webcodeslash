import React, { useEffect, useState } from 'react';
import AceEditor from "react-ace";
import { FaFileDownload, FaPlay, FaTrash, FaLightbulb } from 'react-icons/fa';
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-html";
import "ace-builds/src-noconflict/mode-css";
import "ace-builds/src-noconflict/theme-dracula";
import "ace-builds/src-noconflict/theme-chrome";
import '../code-editor/code-editor.css';

const CodeEditor = (props) => {

    const [theme, setTheme] = useState(props.theme);

    useEffect(() => {
        setTheme(props.theme);
    }, [props.theme]);


    return (
        <React.Fragment>
            <div className="paneTitle">Code Editor</div>
            <div className="controls-row">
                <button onClick={props.runCode} className="btn btn-primary">
                    <FaPlay />
                </button>
                <button onClick={props.resetCode} className="btn btn-secondary">
                    <FaTrash />
                </button>
                <button onClick={props.downloadCode} className="btn btn-secondary">
                    <FaFileDownload />
                </button>
                <button id="theme-btn" style={{ margin: '0.5em', float: 'right' }} className="btn btn-primary" onClick={props.toggleTheme} >
                    <FaLightbulb />
                </button>
            </div>
            <AceEditor
                placeholder="Grab a coffee and brew some code here"
                mode="html"
                theme={theme}
                name="blah2"
                fontSize={14}
                value={props.output}
                onChange={props.updateOutput}
                width="100%"
                height="100%"
                showPrintMargin={true}
                showGutter={true}
                highlightActiveLine={true}
                setOptions={{
                    enableBasicAutocompletion: true,
                    enableLiveAutocompletion: true,
                    enableSnippets: true,
                    showLineNumbers: true,
                    tabSize: 2,
                }}
            />
        </React.Fragment>
    );

}

export default CodeEditor;