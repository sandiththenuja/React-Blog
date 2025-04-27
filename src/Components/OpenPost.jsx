import React from 'react'
import { useParams, Link } from 'react-router-dom'

const OpenPost = ({ posts, deletePost }) => {

    const { id } = useParams();
    const findPost = posts.find(post => post.id.toString() === id);

    return (
        <div>
            <div className="openPost">
                <div className="openPostTitle">
                    <h2>{findPost?.title}</h2>
                    <p>{findPost?.datetime}</p>
                </div>
                <div className="openPostBody">
                    <p>{findPost?.message}</p>
                </div>
                <div className="openPostBtn">
                    <Link to={`/edit/${id}`}><button>Edit</button></Link>
                    <button onClick={() => deletePost(findPost.id)}>Delete</button>
                </div>
            </div>
        </div>
    )
}

export default OpenPost
