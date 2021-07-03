import React, { Component } from 'react';
import CodeEditor from '../code-editor/CodeEditor';
import CodeResult from '../code-result/CodeResult';
import SplitPane from 'react-split-pane';
import './home.css';

class Home extends Component {

    constructor() {
        super();
        this.state = {
            output: '',
            webInput: '',
            width: window.innerWidth,
            height: window.innerHeight,
            editorTheme: 'chrome'
        }
        this.downloadCode = this.downloadCode.bind(this);
        this.setTheme = this.setTheme.bind(this);
    }

    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener("resize", this.updateWindowDimensions);
        if (localStorage.getItem('theme') === 'theme-dark') {
            this.setTheme('theme-dark');
        } else {
            this.setTheme('theme-light');
        }
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updateWindowDimensions);
    }

    updateWindowDimensions = () => {
        this.setState({
            width: window.innerWidth,
            height: window.innerHeight
        });
    }

    updateOutput = (output) => {
        this.setState({ output })
    }

    runCode = () => {
        if (this.state.output)
            this.setState({ webInput: this.state.output })
        else
            alert('There\'s nothing in the editor to run. Brew some code!');
    }

    resetCode = () => {
        this.setState({ output: '', webInput: '' });

    }

    downloadCode() {
        function dataUrl(dataToDownload) {
            return "data:application/octet-stream," + encodeURIComponent(dataToDownload);
        }
        if (this.state.output)
            window.open(dataUrl(this.state.output), "download.txt");
        else
            alert('There\'s nothing in the editor to download. Brew some code!');
    }

    setTheme = (themeName) => {
        let editorTheme = themeName === 'theme-light' ? 'chrome' : 'dracula';
        localStorage.setItem('theme', themeName);
        this.setState({ editorTheme })
        document.documentElement.className = themeName;
    }

    toggleTheme = () => {
        if (localStorage.getItem('theme') === 'theme-dark') {
            this.setTheme('theme-light');
        } else {
            this.setTheme('theme-dark');
        }
    }


    render() {

        let width = this.state.width;
        let splitOrientation = "vertical";
        splitOrientation = width < 768 ? "horizontal" : "vertical";

        return (
            <React.Fragment>
                <div className="home-container">
                    <div className="row">
                        <header>Code\</header>
                    </div>
                    <SplitPane split={splitOrientation} minSize={"50%"} >
                        <div className="code-editor" >
                            <CodeEditor theme={this.state.editorTheme} updateOutput={this.updateOutput} runCode={this.runCode} resetCode={this.resetCode} downloadCode={this.downloadCode} output={this.state.output} toggleTheme={this.toggleTheme} />
                        </div>
                        <div className="code-result">
                            <CodeResult output={this.state.webInput} />
                        </div>
                    </SplitPane>
                </div>
            </React.Fragment>
        );
    }
}

export default Home;