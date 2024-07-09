import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import {
  login,
  setToken,
  addLikeToPost,
  deleteBlogPost,
} from "./services/blogs";
import Login from "./components/Login";
import BlogForm from "./components/BlogForm";
import Togglable from "./components/Toggale";
import Notification from "./components/Notification";
//redux extending the app
import { useSelector, useDispatch } from "react-redux";
//importing the action creator from the file were it was added
import { toggleNotification } from "./redux/reducers/notificationSlice";
//redux thunk
import {
  fetchBlogs,
  createBlog,
  addLikeToBlog,
  deleteSingleBlog,
} from "./redux/reducers/blogSlice";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [errorMsg, setErrorMessage] = useState(null);
  const notesFormRef = useRef();

  //redux hooks
  const showNotification = useSelector((state) => state.notification.show);
  const blogsThunk = useSelector((state) => state.blogs.blogs);

  const dispatch = useDispatch();

  const handleLogin = async (username, password) => {
    try {
      const user = await login({ username, password });
      window.localStorage.setItem("loggedNoteappUser", JSON.stringify(user));
      setToken(user.token);
      setUser(user);
    } catch (error_msg) {
      setErrorMessage("Wrong credentials");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  //create post handler
  const handleCreateBlog = async (data) => {
    try {
      // const blogCreated = await createBlogPost(data);
      // //setting up the state
      // setBlogs((prev) => [...prev, blogCreated]);
      //closing the model once we add one note/blog

      //REDUX THUNK
      dispatch(createBlog(data));
      notesFormRef.current.toggleVisibility();

      dispatch(toggleNotification());

      setTimeout(() => {
        dispatch(toggleNotification());
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateblog = async (id, data) => {
    try {
      // const updatedBlog = await addLikeToPost(id, data);
      // setBlogs((prev) => {
      //   return prev.map((b) => (b.id != id ? b : updatedBlog));
      // });

      //REDUX THUNK
      dispatch(addLikeToBlog(data));
    } catch (error) {
      console.log(error);
    }
  };

  //delete action

  const handleDeleteBlog = async (id) => {
    try {
      // const deleteBlog = await deleteBlogPost(id);
      // setBlogs((prev) => {
      //   return prev.filter((b) => b.id != deleteBlog.id);
      // });

      dispatch(deleteSingleBlog(id));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    //old way of doing it before redux thunk implementation
    // getAll().then((blogs) => {
    //   setBlogs(blogs.sort((a, b) => b.likes - a.likes));
    // });

    //REDUX THUNK
    dispatch(fetchBlogs());
  }, []);

  /*
  cuando ingresemos a la página, la aplicación verifique si los detalles 
  de un usuario que inició sesión ya se pueden encontrar en el local storage. 
  Si se encuentran allí, los detalles se guardan en el estado de la aplicación
  */
  useEffect(() => {
    //esto soluciona el problema de no tener un usuario
    //  setUser(null);
    //if (!user) return;?¿

    const loggedUserJson = window.localStorage.getItem("loggedNoteappUser");

    //if (loggedUserJson === undefined) return;

    if (!loggedUserJson) {
      setUser(null);
      return;
    }

    if (loggedUserJson && loggedUserJson) {
      const user = JSON.parse(loggedUserJson);
      setUser(user);

      setToken(user?.token);
    }
  }, []);

  // useEffect(() => {
  //   // Intentamos obtener el usuario del localStorage
  //   const loggedUserJson = window.localStorage.getItem("loggedNoteappUser");

  //   // Si no hay nada en el localStorage, aseguramos que user sea null
  //   if (!loggedUserJson) {
  //     setUser(null);
  //     return;
  //   }

  //   try {
  //     // Intentamos parsear el JSON
  //     const user = JSON.parse(loggedUserJson);
  //     setUser(user);
  //     setToken(user?.token);
  //   } catch (error) {
  //     // Si hay un error parseando, mostramos un mensaje en la consola y ponemos user como null
  //     console.error("Error parsing loggedUserJson:", error);
  //     setUser(null);
  //   }
  // }, []);

  return (
    <div>
      <h2>blogs extended</h2>
      <span>{errorMsg && errorMsg}</span>
      {showNotification && <Notification />}
      {user != null && (
        <>
          {user.name}{" "}
          <button
            onClick={() => {
              window.localStorage.clear();
              setUser(null);
            }}
          >
            log out
          </button>
        </>
      )}
      {user === null && (
        <Togglable buttonLabel="login">
          <Login handleLogin={handleLogin} />
        </Togglable>
      )}
      {user && (
        <Togglable buttonLabel="new blog" ref={notesFormRef}>
          <BlogForm handleCreate={handleCreateBlog} />
        </Togglable>
      )}
      {user != null &&
        blogsThunk.map((blog) => (
          <div key={blog.id} className="blogs">
            <Blog
              blog={blog}
              handleUpdateblog={handleUpdateblog}
              handleDelete={handleDeleteBlog}
              user={user}
            />
          </div>
        ))}
    </div>
  );
};

export default App;
