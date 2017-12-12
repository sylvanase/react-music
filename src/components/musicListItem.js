import React from 'react'
import 'styles/musicListItem.scss'

class MusicListItem extends React.Component {
  render() {
    let musicItem = this.props.musicItem;
    return (
      <li className={`components-musicListItem row ${this.props.focus ? 'focus' : ''}`}>
        <p><strong>{musicItem.title}</strong> - {musicItem.artist}</p>
        <p className="-col-auto"></p>
      </li>
    )
  }
}

MusicListItem.defaultProps = {};

export default MusicListItem;
