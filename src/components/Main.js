require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';
import Player from '../page/player'
import Header from 'components/header'
import {MUSIC_LIST} from '../api/musiclist'
import MusicList from '../page/musiclist'
// import {Router, IndexRoute, Route, Link, hashHistory} from 'react-router'


class App extends React.Component {
  constructor() {
    super();
    this.state = {
      musicList: MUSIC_LIST,
      currentMusicItem: MUSIC_LIST[0]
    }
  }

  componentDidMount() {
    $('#player').jPlayer({
      ready: function () {
        $(this).jPlayer('setMedia', {
          mp3: 'http://dl.stream.qqmusic.qq.com/C400004Mi9M64GwUus.m4a?vkey=14439CA3093DD4EA1BD4C411C8E73EBCD1DAC5D1396043D7431430DDA305DBF7EEA88E4D1063AA07D25A7753F7108040CFD13042FB5D1D8D&guid=1027035895&uin=0&fromtag=66'
        }).jPlayer('play')
      },
      supplied: 'mp3',
      wmode: 'window'
    })

  }

  render() {
    return (
      <div>
        <Header/>
      </div>
    );
  }
}

class Root extends React.Component {
  render() {
    return (
      <App/>
    );
  }
}

export default Root;
