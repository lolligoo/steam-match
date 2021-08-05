import React, { useState } from 'react'
import Layout from '../components/Layout'
import Router from 'next/router'

const Index = props => {
  const [name, setName] = useState('')
  return (
    <Layout>
      <div className="page">
        <main>
          {/* <form onSubmit={submitData}> */}
          <textarea
            style={{width:"80%"}}
            cols={100}
            onChange={e => setName(e.target.value)}
            placeholder="一行一个"
            rows={10}
            value={name}
          /><br></br>
          <input
            disabled={!name}
            type="submit"
            onClick={()=> 
              Router.push('/?name='+ encodeURIComponent(name.replace(/'/g,'’').split('\n').splice(0,100)))}
            value="提交"
          /><br></br>
          <br></br>
          <textarea 
           rows={10}
           cols={100}
           style={{width:"80%"}}
           readOnly
           value={
            props.feed.map(game => (
              "[url=https://store.steampowered.com/app/"+game.appid+"/]"+game.name+"[/url]"
            )).toString().replace(/,/g,'\n')}>
          </textarea>
          {props.feed.map(game => (
            <div key={game.id}>
              <a href={"https://store.steampowered.com/widget/"+game.appid+"/"}>{game.name}</a>
            </div>
          ))}
        </main>
      </div>
      <style jsx>{`
      
      `}</style>
    </Layout>
  )
}

export const getServerSideProps = async ({query}) => {
    const res = await fetch('http://localhost:3000/api/feed',{
      method:"POST",
      body:query.name
    })
    const feed = await res.json()
    return {
      props: { feed },
    }
  }
  
export default Index
