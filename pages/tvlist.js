import React, { Component } from 'react'
import fetch from 'isomorphic-unfetch'
import Layout from '../comps/Layout'
import PostLink from '../comps/TvList/PostLink'

class TvList extends Component {
  constructor(props) {
    super(props)
  }
  static async getInitialProps() {
    const res = await fetch('https://api.tvmaze.com/search/shows?q=batman')
    const data = await res.json()

    return { show: data }
  }
  render() {
    return (
      <Layout>
        <h1>Batman TV Shows</h1>
        <ul>
          {
            this.props.show.map(({ show }) => (
              <PostLink key={show.id} show={show} />
            ))
          }
        </ul>

        <style jsx>
          {`
          h1 {
            font-family: "Arial";
          }
    
          ul {
            padding: 0;
          }
        `}
        </style>
      </Layout>
    )
  }
}

export default TvList