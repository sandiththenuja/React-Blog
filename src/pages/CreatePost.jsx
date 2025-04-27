import React from 'react'

const CreatePost = ({ setTitle, setMessage, addPost }) => {
    return (
        <form onSubmit={addPost}>
            <div className="input-box">
                <label htmlFor="title">Title:</label>
                <input type="text" id='title' placeholder='Enter Title' onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div className="input-box">
                <label htmlFor="message">Post Message:</label>
                <textarea id="message" rows={10} placeholder='Enter Post Message' onChange={(e) => setMessage(e.target.value)}></textarea>
            </div>
            <div className="form-btn">
                <button type='submit'>Send Post</button>
            </div>

        </form>
    )
}

export default CreatePost
