import { Routes, Route, useNavigate } from 'react-router-dom'
import Navbar from './Components/Navbar'
import PostPage from './pages/PostPage.jsx'
import AboutPage from './pages/AboutPage.jsx'
import CreatePost from './pages/CreatePost.jsx'
import { axiosInstance } from './axios/axiosInstance.jsx'
import { useEffect, useState } from 'react'
import OpenPost from './Components/OpenPost.jsx'
import EditPost from './Components/EditPost.jsx'
import Footer from './Components/Footer.jsx'

function App() {
  const [posts, setPosts] = useState([]);

  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  const [editTitle, setEditTitle] = useState("");
  const [editMessage, setEditMessage] = useState("");

  const [err, setErr] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  const month = new Date().getMonth();
  const date = new Date().getDate();

  const setDateTime = months[month] + " " + date;

  const getPosts = async () => {
    setIsLoading(true);
    try {
      const fetchPosts = await axiosInstance.get('/posts');
      setPosts(fetchPosts.data);
    } catch (error) {
      if (error.response) {
        setErr(error.response.data);
        console.log(error.response.data);
        console.log(error.response.headers);
        console.log(error.status);
      } else {
        setErr(error.message);
      }
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getPosts();
  }, [])

  // useEffect(() => {
  //   setPosts(posts);
  // }, [posts])

  const addPost = async (e) => {
    e.preventDefault();
    const id = posts.length ? Number(posts[posts.length - 1].id) + 1 : 1;
    const newPost = {
      id: id.toString(),
      title: title,
      datetime: setDateTime,
      message: message
    }
    try {
      const response = await axiosInstance.post('/posts', newPost);
      const allPosts = [...posts, response.data];
      setPosts(allPosts);
      setTitle('');
      setMessage('');
      navigate('/');
    } catch (error) {
      console.log(error.message);
    }
  }

  const handleEditPost = async (id) => {
    const updatedPost = { id: id, title: editTitle, datetime: "updated at: " + setDateTime, message: editMessage };
    try {
      const response = await axiosInstance.put(`/posts/${id}`, updatedPost);
      setPosts(posts.map(post => post.id === id ? { ...response.data } : post));
      setEditTitle('');
      setEditMessage('');
      navigate('/');
    } catch (error) {
      console.log(error.message);
    }
  }

  const deletePost = async (id) => {
    try {
      const findPost = await axiosInstance.delete(`/posts/${id}`);
      const filteredPosts = posts.filter(post => post.id !== findPost.data.id);
      setPosts(filteredPosts);
      navigate('/');
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <div>
      <Navbar />

      <Routes>
        <Route path='/' exact element={<PostPage posts={posts} err={err} isLoading={isLoading} />} />
        <Route path='/post/:id' element={<OpenPost posts={posts} deletePost={deletePost} />} />
        <Route path='/edit/:id' element={<EditPost posts={posts} editTitle={editTitle} setEditTitle={setEditTitle} editMessage={editMessage} setEditMessage={setEditMessage} handleEditPost={handleEditPost} />} />
        <Route path='/about' exact element={<AboutPage />} />
        <Route path='/create-post' exact element={<CreatePost setTitle={setTitle} setMessage={setMessage} addPost={addPost} />} />
      </Routes>

      <Footer />
    </div>
  )
}

export default App
