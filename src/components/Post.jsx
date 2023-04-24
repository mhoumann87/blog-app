import { Link } from 'react-router-dom';

const Post = ({ post }) => {
  return (
    <article key={post.id} className='post flex shadow'>
      <Link to={`/post/${post.id}`}>
        <h3>{post.title}</h3>
        <p className='small'>Post date: {post.datetime}</p>
      </Link>

      <p>
        {post.body.length <= 25 ? post.body : `${post.body.slice(0, 25)} ...`}
      </p>
    </article>
  );
};
export default Post;
