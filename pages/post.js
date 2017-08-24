import Layout from '../comps/Layout'
import fetch from 'isomorphic-unfetch'
import Markdown from 'react-markdown'

const Post = (props) => (
  <Layout>
    <h1>{props.show.name}</h1>
    <div className="markdown">
      <p>{props.show.summary.replace(/<[/]?p>/g, '')}</p>
      <img src={props.show.image.medium} />
    </div>
    <style jsx global>
      {`
        h1 {
          color: grey;
        }

        .markdown {
          font-family: 'Arial';
        }

        .markdown p {
          color: red;
        }

        .markdown img:hover {
          opacity: 0.6;
        }
      `}
    </style>
  </Layout>
)

Post.getInitialProps = async function (context) {
  const { id } = context.query
  const res = await fetch(`https://api.tvmaze.com/shows/${id}`)
  const show = await res.json()
  console.log(res)
  return { show }
}

export default Post