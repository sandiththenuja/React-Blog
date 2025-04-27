import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

const EditPost = ({ posts, editTitle, setEditTitle, editMessage, setEditMessage, handleEditPost }) => {

    const { id } = useParams();
    const findPost = posts.find(post => (post.id).toString() === id);

    useEffect(() => {
        if (findPost) {
            setEditTitle(findPost.title);
            setEditMessage(findPost.message);
        }
    }, [posts, setEditTitle, setEditMessage])

    return (
        <div>
            {editTitle &&
                <form onSubmit={(e) => e.preventDefault()}>
                    <div className="input-box">
                        <label htmlFor="title">Title:</label>
                        <input type="text" value={editTitle} id='title' placeholder='Enter Title' onChange={(e) => setEditTitle(e.target.value)} />
                    </div>
                    <div className="input-box">
                        <label htmlFor="message">Post Message:</label>
                        <textarea id="message" value={editMessage} rows={10} placeholder='Enter Post Message' onChange={(e) => setEditMessage(e.target.value)}></textarea>
                    </div>
                    <div className="form-btn">
                        <button type='submit' onClick={() => handleEditPost(findPost.id)}>Edit Post</button>
                    </div>

                </form>
            }
            {!editTitle &&
                <>
                    <h2>Post not found</h2>
                </>
            }
        </div>
    )
}

export default EditPost
