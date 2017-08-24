import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { initStore, startClock, addCount, serverRenderClock } from '../store'
import withRedux from 'next-redux-wrapper'
import Page from '../comps/Clock/Page'

import Layout from '../comps/Layout'
import Link from 'next/link'
import fetch from 'isomorphic-unfetch'
import stylesheet from 'styles/index.scss'

const PostLink = ({ show }) => (
  <li>
    <Link as={`/p/${show.id}`}
      href={`/post?id=${show.id}`}>
      <a>{show.name}</a>
    </Link>

    <style jsx>
      {`
      li {
        list-style: none;
        margin: 5px 0;
      }

      a {
        text-decoration: none;
        color: blue;
        font-family: "Arial";
      }

      a:hover {
        opacity: 0.6;
      }
    `}
    </style>
  </li>
)

class Index extends Component {
  constructor(props) {
    super(props)
  }
  static async getInitialProps({ store, isServer }, params) {
    const res = await fetch('https://api.tvmaze.com/search/shows?q=batman')
    const data = await res.json()
    store.dispatch(serverRenderClock(isServer))
    store.dispatch(addCount())

    return { isServer, show: data }
  }

  componentDidMount() {
    this.timer = this.props.startClock()
  }

  componentWillUnmount() {
    clearInterval(this.timer)
  }

  render() {
    return (
      <Layout>
        <Page title='Index Page' linkTo='/other' />
        <h1>Batman TV Shows</h1>
        <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
        <p>this area is style by sass</p>
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

const mapDispatchToProps = (dispatch) => {
  return {
    addCount: bindActionCreators(addCount, dispatch),
    startClock: bindActionCreators(startClock, dispatch)
  }
}

export default withRedux(initStore, null, mapDispatchToProps)(Index)