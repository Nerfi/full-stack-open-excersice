import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import { login, setToken } from "./services/blogs";
import Login from "./components/Login";
import BlogForm from "./components/BlogForm";
import Togglable from "./components/Toggale";
import Notification from "./components/Notification";
import SignUp from "./components/SignUp";
//redux extending the app
import { useSelector, useDispatch } from "react-redux";
//importing the action creator from the file were it was added
import { toggleNotification } from "./redux/reducers/notificationSlice";
import { saveUserInfo } from "./redux/reducers/userSlice";
//redux thunk
import {
  fetchBlogs,
  createBlog,
  addLikeToBlog,
  deleteSingleBlog,
} from "./redux/reducers/blogSlice";

const App = () => {
  const [user, setUser] = useState(null);
  const [errorMsg, setErrorMessage] = useState(null);
  const notesFormRef = useRef();

  //redux hooks
  const showNotification = useSelector((state) => state.notification.show);
  const blogsThunk = useSelector((state) => state.blogs.blogs);
  const userRedux = useSelector((state) => state.user.user);

  const dispatch = useDispatch();

  const handleLogin = async (username, password) => {
    try {
      const user = await login({ username, password });
      window.localStorage.setItem("loggedNoteappUser", JSON.stringify(user));
      setToken(user.token);
      //setUser(user);
      //redux
      dispatch(saveUserInfo(user));
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
  // useEffect(() => {
  //   //esto soluciona el problema de no tener un usuario
  //   //  setUser(null);
  //   //if (!user) return;?¿

  //   const loggedUserJson = window.localStorage.getItem("loggedNoteappUser");

  //   //if (loggedUserJson === undefined) return;

  //   if (!loggedUserJson) {
  //     //setUser(null);
  //     dispatch(saveUserInfo(null));
  //     return;
  //   }

  //   if (loggedUserJson && loggedUserJson) {
  //     const user = JSON.parse(loggedUserJson);
  //     //setUser(user);
  //     //redux part 7
  //     dispatch(saveUserInfo(user));

  //     setToken(user?.token);
  //   }
  // }, []);

  useEffect(() => {
    // Intentamos obtener el usuario del localStorage
    const loggedUserJson = window.localStorage.getItem("loggedNoteappUser");

    // Si no hay nada en el localStorage, aseguramos que user sea null
    if (!loggedUserJson) {
      //setUser(null);
      dispatch(saveUserInfo(null));
      return;
    }

    try {
      // Intentamos parsear el JSON
      const user = JSON.parse(loggedUserJson);
      //setUser(user);
      dispatch(saveUserInfo(user));
      setToken(user?.token);
    } catch (error) {
      // Si hay un error parseando, mostramos un mensaje en la consola y ponemos user como null
      console.error("Error parsing loggedUserJson:", error);
      dispatch(saveUserInfo(null));
    }
  }, []);

  return (
    <div>
      <h2>Blogs extended</h2>
      <span>{errorMsg && errorMsg}</span>
      {showNotification && <Notification />}
      {userRedux != null && (
        <>
          {userRedux.name}{" "}
          <button
            onClick={() => {
              window.localStorage.clear();

              dispatch(saveUserInfo(null));
            }}
          >
            log out
          </button>
        </>
      )}
      {userRedux === null && (
        <Togglable buttonLabel="login">
          <Login handleLogin={handleLogin} />
        </Togglable>
      )}

      {userRedux && (
        <Togglable buttonLabel="new blog" ref={notesFormRef}>
          <BlogForm handleCreate={handleCreateBlog} />
        </Togglable>
      )}
      {userRedux != null &&
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
