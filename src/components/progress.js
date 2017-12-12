import React from 'react';
import 'styles/progress.scss'

class Progress extends React.Component {
  constructor(props) {
    super(props);
    this.changeProgress = this.changeProgress.bind(this)
  }

  changeProgress(e) {
    let progressBar = this.progressBar;
    let progress = (e.clientX - progressBar.getBoundingClientRect().left) / progressBar.clientWidth;
    //this.props.onProgressChange && this.props.onProgressChange(progressP)
    this.props.onProgressChange && this.props.onProgressChange(progress);
  }

  render() {
    // 使用 `ref` 的回调将 progressBar 输入框的 DOM 节点存储到 React
    // 实例上（比如 this.progressBar）
    return (
      <div className="components-progress" ref={(progressBar) => {
        this.progressBar = progressBar;
      }} onClick={this.changeProgress}>
        <div className="progress" style={{width: `${this.props.progress}%`, background: this.props.barColor}}></div>
      </div>
    );
  }
}

Progress.defaultProps = {
  barColor: '#2f9842'
};

export default Progress;
