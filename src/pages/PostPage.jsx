import React from 'react'
import Posts from '../Components/Posts'

const PostPage = ({ posts, err, isLoading }) => {
    return (
        <div>
            <div className="post-section">
                {err && <p style={{ color: 'red', fontSize: '1rem' }}>{err}</p>}
                {isLoading && <p style={{ color: '#fff', fontSize: '1.5rem', margin: '1rem auto' }}>Loading...</p>}
                {!err && !isLoading &&
                    <Posts posts={posts} />
                }
            </div>
        </div>
    )
}

export default PostPage
