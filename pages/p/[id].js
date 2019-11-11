import fetch from 'isomorphic-unfetch'
import Layout from '../../components/Layout'
import { useRouter } from 'next/router'
import Markdown from 'react-markdown'

const Post = ({ show }) => {
  const router = useRouter()
  return (
    <Layout>
      <h1>{show.name}</h1>
      <p>{show.summary.replace(/<[/]?[pb]>/g, '')}</p>
      <img src={show.image.medium} alt={show.name} />
      <hr />

      <div className='markdown'>
        <h3>{router.query.id}</h3>
        <Markdown
          source={`
## This is our Blog post.
Yes. we can have a [link](/).
and we can have a tittle as well.

### This is a title
        `}
        />
      </div>
      <style jsx global>{`
        .markdown {
          font-family: 'Arial';
        }
        .markdown a {
          text-decoration: none;
          color: blue;
        }
        .markdown a:hover {
          opacity: 0.6;
        }
        .markdown h3 {
          margin: 0;
          padding: 0;
          text-transform: uppercase;
        }
      `}</style>
    </Layout>
  )
}

Post.getInitialProps = async function(context) {
  const { id } = context.query
  const res = await fetch(`https://api.tvmaze.com/shows/${id}`)
  const show = await res.json()
  console.log(`Fetched show: ${show.name}`)

  return { show }
}

export default Post
