import Layout from '../components/Layout'
import Link from 'next/link'
import fetch from 'isomorphic-unfetch'
const PostLink = props => (
  <li>
    <Link href='/p/[id]' as={`/p/${props.id}`}>
      <a>{props.name}</a>
    </Link>
    <style jsx>{`
      ul {
        padding: 0;
      }

      li {
        list-style: none;
        margin: 5px 0;
      }
      a {
        font-family: 'Arial';
        text-decoration: none;
        color: blue;
      }
      a:hover {
        opacity: 0.6;
      }
    `}</style>
  </li>
)
const Index = props => (
  <Layout>
    <h1>Batman TV Shows</h1>
    <ul>
      {props.shows.map(show => (
        <PostLink key={show.id} id={show.id} name={show.name} />
      ))}
      <style jsx>{`
        h1 {
          font-family: 'Arial';
        }
      `}</style>
    </ul>
  </Layout>
)

Index.getInitialProps = async () => {
  const res = await fetch('https://api.tvmaze.com/search/shows?q=batman')
  const data = await res.json()

  console.log(`Show data fetched. Count: ${data.length}`)
  return {
    shows: data.map(entry => entry.show)
  }
}
export default Index
