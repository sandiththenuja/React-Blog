import { Link } from "react-router-dom"

const Post = ({ post }) => {
    return (
        <div>
            <div className="post">

                <Link to={`/post/${post.id}`}>
                    <div className="post-title">
                        <h2>{post.title}</h2>
                        <p>{post.datetime}</p>
                    </div>
                </Link>
                <div className="post-body">
                    {post.message.length >= 25 ? `${post.message.slice(0, 25)}...` : <p>{post.message}</p>}

                </div>
            </div>
        </div>
    )
}

export default Post
