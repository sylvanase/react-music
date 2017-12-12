import React from 'react'
import MusicListItem from '../components/musicListItem'

class MusicList extends React.Component {
  render() {
    let listEle = null;
    listEle = this.props.musicList.map((item) => {
      return <MusicListItem focus={item === this.props.currentMusicItem} key={item.id} musicItem={item}>{item.title}</MusicListItem>
    })
    return (
      <ul>
        {listEle}
      </ul>
    )
  }
}

MusicList.defaultProps = {};

export default MusicList;
