import Link from 'next/link'

const linkStyle = {
  marginRight: 15
}

const Header = () => (
  <div>
    <Link href="/">
      <a style={linkStyle}>Home</a>
    </Link>
    <Link href="/tvlist">
      <a style={linkStyle}>TvList</a>
    </Link>
    <Link href="/todo">
      <a style={linkStyle}>Todo</a>
    </Link>
  </div>
)

export default Header