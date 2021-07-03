import React from 'react';
import './code-result.css';

const CodeResult = (props) => {
    return (
        <React.Fragment>
            <div className="paneTitle">Web Preview</div>
            <iframe srcDoc={props.output} title="Web Preview" />
        </React.Fragment>
    );
}

export default CodeResult;