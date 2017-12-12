require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';
import Player from '../page/player'
import Header from 'components/header'
import {MUSIC_LIST} from '../api/musiclist'
import MusicList from '../page/musiclist'
import {BrowserRouter as Router, Route, Link, IndexRouter} from 'react-router-dom';


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
    const Home = () => ( // react-router 4.0 的用法有很大变化，搞死了要……
      <Player currentMusicItem={this.state.currentMusicItem}/>
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
