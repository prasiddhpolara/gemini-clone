import { useState, useContext } from 'react'
import './Sidebar.css'
import { assets } from '../../assets/assets'
import { Context } from '../../Context/Context'

const Sidebar = () => {
  const [extended, setExtended] = useState(false)
  const { chats, activeChatId, newChat, openChat, clearChats } = useContext(Context)

  return (
    <div className='sidebar'>

      <div className="top">
        <img onClick={() => setExtended(prev => !prev)} className='menu' src={assets.menu_icon} alt="menu" />

        <div className="newchat" onClick={newChat}>
          <img src={assets.plus_icon} alt="new chat" />
          {extended ? <p>New chat</p> : null}
        </div>

        {extended && chats.length > 0 ? (
          <div className="recent">
            <p className='recent-title'>Recent</p>
            {chats.map((chat) => (
              <div
                key={chat.id}
                className={chat.id === activeChatId ? 'recent-entry active' : 'recent-entry'}
                onClick={() => openChat(chat.id)}
              >
                <img src={assets.message_icon} alt="" />
                <p>{chat.title}</p>
              </div>
            ))}
          </div>
        ) : null}
      </div>

      <div className="bottom">
        <div className="bottom-item recent-entry" onClick={clearChats}>
          <img src={assets.history_icon} alt="clear history" />
          {extended ? <p>Clear history</p> : null}
        </div>
      </div>

    </div>
  )
}

export default Sidebar
