require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';
import Player from '../page/player'
import Header from 'components/header'
import {MUSIC_LIST} from '../api/musiclist'
import MusicList from '../page/musiclist'
import {BrowserRouter as Router, Route, Link, IndexRouter} from 'react-router-dom';
import Pubsub from 'pubsub-js'

let repeatTypeList = ['cycle', 'random', 'once'];

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      musicList: MUSIC_LIST,
      currentMusicItem: MUSIC_LIST[0],
      repeatType: repeatTypeList[0] // 歌曲的循环模式，默认歌单循环
    }
  }

  playMusic(musicItem) {
    $('#player').jPlayer('setMedia', {
      mp3: musicItem.file
    }).jPlayer('play');
    this.setState({
      currentMusicItem: musicItem
    })
  }

  playNext(type = 'next') {
    let index = this.findMusicItemIndex(this.state.currentMusicItem);
    let newIndex = null;
    let musicListLength = this.state.musicList.length;
    if (type == 'next') { // 使用取余的方式来获取下一曲播放的index，减少if - else 的判断
      newIndex = (index + 1) % musicListLength;
    } else {
      newIndex = (index - 1 + musicListLength) % musicListLength;
    }
    this.playMusic(this.state.musicList[newIndex]);
  }

  findMusicItemIndex(musicItem) { // 获取当前播放的音乐的索引
    return this.state.musicList.indexOf(musicItem)
  }

  changeRepeat() {
    let repeatType = this.state.repeatType;
    if (repeatType == 'cycle') {
      this.playNext();
    } else if (repeatType == 'once') { // 继续播放当前歌曲
      this.playMusic(this.state.currentMusicItem);
    } else { // 随机播放
      let randomIndex = this.randomIndex();
      this.playMusic(this.state.musicList[randomIndex]);
    }
  }

  randomIndex() {
    let index = this.findMusicItemIndex(this.state.currentMusicItem);
    let newIndex = parseInt(Math.random() * this.state.musicList.length);
    while (index == newIndex) {
      newIndex = parseInt(Math.random() * this.state.musicList.length)
    }
    return newIndex;
  }

  componentDidMount() {
    $('#player').jPlayer({ // 初始化jplayer
      supplied: 'mp3',
      wmode: 'window'
    });

    this.playMusic(this.state.currentMusicItem);

    $('#player').bind($.jPlayer.event.ended, (e) => { // 监听一曲播放完成后继续下一首
      this.changeRepeat();
    })

    Pubsub.subscribe('PLAY_MUSIC', (msg, musicItem) => {
      this.playMusic(musicItem)
    })
    Pubsub.subscribe('DELETE_MUSIC', (msg, musicItem) => {
      this.setState({
        musicList: this.state.musicList.filter(item => {
          return item !== musicItem;
        })
      })
    })

    Pubsub.subscribe('PLAY_NEXT', () => {
      this.playNext()
    })

    Pubsub.subscribe('PLAY_PREV', () => {
      this.playNext('prev')
    })

    Pubsub.subscribe('REPEAT_TYPE', () => {
      let index = repeatTypeList.indexOf(this.state.repeatType),
        newIndex = (index + 1) % repeatTypeList.length;
      this.setState({
        repeatType: repeatTypeList[newIndex]
      })
    })
  }

  componentWillUnmount() {
    Pubsub.unsubscribe('PLAY_MUSIC')
    Pubsub.unsubscribe('DELETE_MUSIC')
    Pubsub.unsubscribe('PLAY_PREV')
    Pubsub.unsubscribe('PLAY_NEXT')
    $('#player').unbind($.jPlayer.event.ended)
  }

  render() {
    const Home = () => ( // react-router 4.0 的用法有很大变化，搞死了要……
      <Player currentMusicItem={this.state.currentMusicItem} repeatType={this.state.repeatType}/>
    );
    const List = () => (
      <MusicList
        currentMusicItem={this.state.currentMusicItem}
        musicList={this.state.musicList}
      />
    );
    return (
      <Router>
        <div>
          <Header/>
          <Route exact path="/" component={Home}/>
          <Route path="/list" component={List}/>
        </div>
      </Router>

    );
  }
}

export default App;
