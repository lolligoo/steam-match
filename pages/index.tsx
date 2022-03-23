import React, { useState } from 'react'
import Layout from '../components/Layout'
//import Router from 'next/router'

const Draft: React.FC = () => {
  const [content, setContent] = useState('')
  const [result, setResult] = useState('')
  // const [authorEmail, setAuthorEmail] = useState('')

  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    try {
      const body = content.split('\n')
      const res = await fetch(`https://steam-match-hulx93nxs-lolligoo.vercel.app/api/feed`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/text' },
        body: JSON.stringify(body),
      })
      const feed = await res.json()
      getdate(feed)
    } catch (error) {
      console.error(error)
    }
  }
  const getdate = (date:[{title:string,url:string}]) => {
    let out = content
    date.map((item) => {
      out = out.replace(item.title,'[url='+item.url+']'+item.title+'[/url]')
    })
    setResult(out)
  }

  return (
    <Layout>
      <div>
        <form
          onSubmit={submitData}>
          <textarea
            cols={50}
            onChange={e => setContent(e.target.value)}
            placeholder="Input"
            rows={10}
            value={content}
          />
          <input
            disabled={ !content }
            type="submit"
            value="Submit"
          />
          <textarea
          cols={50}
          placeholder="Result"
          rows={10}
          value={result}
          />
        </form>
      </div>
      <style jsx>{`
        .page {
          background: white;
          padding: 3rem;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        input[type='text'],
        textarea {
          width: 100%;
          padding: 0.5rem;
          margin: 0.5rem 0;
          border-radius: 0.25rem;
          border: 0.125rem solid rgba(0, 0, 0, 0.2);
        }

        input[type='submit'] {
          background: #ececec;
          border: 0;
          padding: 1rem 2rem;
        }

        .back {
          margin-left: 1rem;
        }
      `}</style>
    </Layout>
  )
}

export default Draft;
