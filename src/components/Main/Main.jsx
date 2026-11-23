import { useContext, useEffect, useRef } from 'react'
import ReactMarkdown from 'react-markdown'
import './Main.css'
import { assets } from '../../assets/assets'
import { Context } from '../../Context/Context'

// suggestion cards shown on the home screen
const cards = [
  { text: 'Suggest beautiful places to see on an upcoming road trip', icon: assets.compass_icon },
  { text: 'Briefly summarize this concept: urban planning', icon: assets.bulb_icon },
  { text: 'Brainstorm team bonding activities', icon: assets.message_icon },
  { text: 'Tell me about React JS and React Native', icon: assets.code_icon },
]

const Main = () => {

  const {
    onSent,
    input,
    setInput,
    messages,
    showResult,
    loading,
  } = useContext(Context)

  // scroll down to the newest message
  const endRef = useRef(null)
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  return (
    <div className='main'>

      <div className="nav">
        <p>Gemini</p>
        <img src={assets.user_icon} alt="user" />
      </div>

      <div className="main-container">

        {!showResult ? (
          <>
            <div className="greet">
              <p><span>Hello, dev.</span></p>
              <p>How can I help you today?</p>
            </div>

            <div className="cards">
              {cards.map((card, index) => (
                <div className="card" key={index} onClick={() => onSent(card.text)}>
                  <p>{card.text}</p>
                  <img src={card.icon} alt="" />
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="result">
            {messages.map((message, index) =>
              message.role === 'user' ? (
                <div className="resulttitle" key={index}>
                  <img src={assets.user_icon} alt="user" />
                  <p>{message.text}</p>
                </div>
              ) : (
                <div className="result-data" key={index}>
                  <img src={assets.gemini_icon} alt="gemini" />
                  <div className={message.error ? 'markdown error' : 'markdown'}>
                    <ReactMarkdown>{message.text}</ReactMarkdown>
                  </div>
                </div>
              )
            )}

            {loading ? (
              <div className="result-data">
                <img src={assets.gemini_icon} alt="gemini" />
                <div className="loader">
                  <hr />
                  <hr />
                  <hr />
                </div>
              </div>
            ) : null}

            <div ref={endRef}></div>
          </div>
        )}

        <div className="main-bottom">

          <div className="search-box">

            <input
              type="text"
              placeholder='Enter your prompt here'
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') onSent(input)
              }}
            />

            <div>
              {input.trim() ? (
                <img
                  onClick={() => onSent(input)}
                  src={assets.send_icon}
                  alt="send"
                />
              ) : null}
            </div>

          </div>

          <p className='bottom-info'>
            Gemini may display inaccurate info, including about people, so double-check its responses.
          </p>

        </div>

      </div>
    </div>
  )
}

export default Main
