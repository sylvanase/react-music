import React from 'react';
import Progress from 'components/progress'
import 'styles/player.scss'
import {Link} from 'react-router-dom'

let duration = null;

class Player extends React.Component {
  constructor() {
    super();
    this.state = {
      progress: '0',
      volume: '0',
      isPlay: true // 播放状态
    };
  }

  componentDidMount() {
    $('#player').bind($.jPlayer.event.timeupdate, (e) => {
      duration = e.jPlayer.status.duration;
      this.setState({
        volume: e.jPlayer.options.volume * 100,
        progress: e.jPlayer.status.currentPercentAbsolute
      })
    })
  }

  componentWillUnmount() {
    $('#player').unbind($.jPlayer.event.timeupdate);
  }

  progressChangeHandler(progress) {
    $('#player').jPlayer('play', duration * progress);
  }

  changeVolumeHandler(progress) {
    $('#player').jPlayer('volume', progress);
  }

  play() {
    if (this.state.isPlay) {
      $('#player').jPlayer('pause');
    } else {
      $('#player').jPlayer('play');
    }
    this.setState({
      isPlay: !this.state.isPlay
    })
  }

  render() {
    return (
      <div>
        <div className="player-page">
          <h1 className='caption'><Link to='/list'>我的私人音乐坊</Link></h1>
          <div className="mt20 row">
            <div className="controll-wrapper">
              <h2 className="music-title">{this.props.currentMusicItem.title}</h2>
              <h3 className="music-artist mt10">{this.props.currentMusicItem.artist}</h3>
              <div className="row mt20">
                <div className="volume-container">
                  <i className="icon-volume rt" style={{top: 5, left: -5}}></i>
                  <div className="volume-wrapper">
                    <Progress progress={this.state.volume} barColor="red" onProgressChange={this.changeVolumeHandler}/>
                  </div>
                </div>
              </div>
              <div className="row mt20" style={{height: 10, lineHeight: '10px'}}>
                <Progress progress={this.state.progress} onProgressChange={this.progressChangeHandler}></Progress>
                {/*<div
                  className="left-time -col-auto">{(this.state.time / 60).toFixed(0) > 10 ? 10 : '0' + (this.state.time / 60).toFixed(0)}
                  : {((this.state.time).toFixed(0) % 60 < 10) ? '0' + (this.state.time).toFixed(0) % 60 : (this.state.time).toFixed(0) % 60}
                  s
                </div>*/}
              </div>
              <div className="mt35 row">
                {/*<div>
                  <i className="icon prev" onClick={this.playPrev.bind(this)}></i>
                  <i
                    className={`icon ml20 ${Math.ceil(this.state.time) >= Math.ceil(duration) ? 'play' : this.state.isPlay ? 'pause' : 'play'}`}
                    onClick={this.play.bind(this)}></i>
                  <i className="icon next ml20" onClick={this.playNext.bind(this)}></i>
                </div>
                <div className="-col-auto">
                  <i className="icon repeat-cycle"></i>
                </div>*/}
                <div>
                  <i className="icon prev"></i>
                  <i className={`icon ml20 ${this.state.isPlay ? 'pause' : 'play'}`} onClick={this.play.bind(this)}></i>
                  <i className="icon ml20 next"></i>
                </div>
              </div>
            </div>
            <div className='-col-auto cover'>
              <img src={this.props.currentMusicItem.cover} alt={this.props.currentMusicItem.title}/>
              {/*<img
                className={`${Math.ceil(this.state.time) >= Math.ceil(duration) ? 'pause' : this.state.isPlay ? '' : 'pause'}`}
                src={this.props.currentMusicItem.cover} alt={this.props.currentMusicItem.title}/>*/}
            </div>
          </div>
        </div>

      </div>
    );
  }
}

Player.defaultProps = {};

export default Player;
