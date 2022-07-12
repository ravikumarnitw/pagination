import React, { useState, useEffect } from 'react'
import { useFetch } from './utils/useFetch';
import Follower from './components/Follower'
import Search from './components/Search';
import './App.css';
function App() {
  const [page, setPage] = useState(0);
  const [followers, setFollowers] = useState([]);
  const [url, setURL] = useState('fabpot'); //initally setting highest follower's user
  const { loading, data } = useFetch(url);

  const updateURL = (_url) =>{
    setURL(_url);
  }
  useEffect(() => {
    if (loading) return;
    setFollowers(data[page])
  }, [loading, page, data])

  const nextPage = () => {
    setPage((oldPage) => {
      let nextPage = oldPage + 1
      if (nextPage > data.length - 1) {
        nextPage = 0
      }
      return nextPage
    })
  }
  const prevPage = () => {
    setPage((oldPage) => {
      let prevPage = oldPage - 1
      if (prevPage < 0) {
        prevPage = data.length - 1
      }
      return prevPage
    })
  }

  const handlePage = (index) => {
    setPage(index)
  }

  return (
    <main>
      <div className='header-container'>
      <div className = 'search-container'>
      <Search updateURL = {updateURL}/>
      </div>
      <div className='section-title'>
        <h4>{loading ? 'loading...' : `follows @${url}`}</h4>
        <div className='underline'></div>
      </div>
      </div>
      <section className='followers'>
        {followers && <div className='container'>
          {followers.map((follower) => {
            return <Follower key={follower.id} {...follower} />
          })}
        </div>}
        {!loading && (
          <div className='btn-container'>
            <button className='prev-btn' onClick={prevPage}>
              prev
            </button>
            {data.map((item, index) => {
              return (
                <button
                  key={index}
                  className={`page-btn ${index === page ? 'active-btn' : null}`}
                  onClick={() => handlePage(index)}
                >
                  {index + 1}
                </button>
              )
            })}
            <button className='next-btn' onClick={nextPage}>
              next
            </button>
          </div>
        )}
      </section>
    </main>
  )
}

export default App
