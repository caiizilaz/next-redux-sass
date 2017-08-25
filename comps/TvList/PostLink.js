import Link from 'next/link'
import stylesheet from 'styles/post-link.scss'

const PostLink = ({ show }) => (
  <li>
    <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
    <Link as={`/p/${show.id}`}
      href={`/post?id=${show.id}`}>
      <a>{show.name}</a>
    </Link>
  </li>
)

export default PostLink
