import React from 'react'
import 'styles/musicListItem.scss'
import Pubsub from 'pubsub-js' // 事件订阅

class MusicListItem extends React.Component {
  playMusic(musicItem) {
    Pubsub.publish('PLAY_MUSIC', musicItem); // 把事件发送出去，在main中监听该事件
  }

  deleteMusic(musicItem, e) {
    e.stopPropagation(); // 阻止事件冒泡
    Pubsub.publish('DELETE_MUSIC', musicItem);
  }

  render() {
    let musicItem = this.props.musicItem;
    return (
      <li onClick={this.playMusic.bind(this, musicItem)}
          className={`components-musicListItem row ${this.props.focus ? 'focus' : ''}`}>
        <p><strong>{musicItem.title}</strong> - {musicItem.artist}</p>
        <p onClick={this.deleteMusic.bind(this, musicItem)} className="-col-auto delete"></p>
      </li>
    )
  }
}

MusicListItem.defaultProps = {};

export default MusicListItem;
