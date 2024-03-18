const listHelpers = require("../utils/list_helper");

const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");

const api = supertest(app);
const BLOG = require("../models/blogModel");



test("dummy returns one", () => {
  const blogs = [];
  const result = listHelpers.dummy(blogs);
  expect(result).toBe(1);
});

describe("total likes", () => {
  //tests
  const listWithOneBlog = [
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
      likes: 5,
      __v: 0,
    },
  ];
  test("when list has only one blog, equals the likes of that", () => {
    const totalLikes = listHelpers.totalLikes(listWithOneBlog);
    expect(totalLikes).toBe(5);
  });

  const blogs = [
    {
      _id: "5a422a851b54a676234d17f7",
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 7,
      __v: 0,
    },
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
      __v: 0,
    },
    {
      _id: "5a422b3a1b54a676234d17f9",
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12,
      __v: 0,
    },
    {
      _id: "5a422b891b54a676234d17fa",
      title: "First class tests",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
      likes: 10,
      __v: 0,
    },
    {
      _id: "5a422ba71b54a676234d17fb",
      title: "TDD harms architecture",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
      likes: 0,
      __v: 0,
    },
    {
      _id: "5a422bc61b54a676234d17fc",
      title: "Type wars",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
      likes: 2,
      __v: 0,
    },
  ];

  test("when given an array of blogs", () => {
    const totalLikes = listHelpers.totalLikes(blogs);
    expect(totalLikes).toBe(36);
  });

  test("when given an empty aray should return 0", () => {
    const emptyBlogs = [];
    const totalLikesInEmptyArr = listHelpers.totalLikes(emptyBlogs);
    expect(totalLikesInEmptyArr).toBe(0);
  });

  describe("given array of blogs return the most liked", () => {
    test("given array of blogs return the most liked one", () => {
      const blogs = [
        {
          _id: "5a422a851b54a676234d17f7",
          title: "React patterns",
          author: "Michael Chan",
          url: "https://reactpatterns.com/",
          likes: 7,
          __v: 0,
        },
        {
          _id: "5a422aa71b54a676234d17f8",
          title: "Go To Statement Considered Harmful",
          author: "Edsger W. Dijkstra",
          url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
          likes: 5,
          __v: 0,
        },
        {
          _id: "5a422b3a1b54a676234d17f9",
          title: "Canonical string reduction",
          author: "Edsger W. Dijkstra",
          url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
          likes: 12,
          __v: 0,
        },
        {
          _id: "5a422b891b54a676234d17fa",
          title: "First class tests",
          author: "Robert C. Martin",
          url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
          likes: 10,
          __v: 0,
        },
        {
          _id: "5a422ba71b54a676234d17fb",
          title: "TDD harms architecture",
          author: "Robert C. Martin",
          url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
          likes: 0,
          __v: 0,
        },
        {
          _id: "5a422bc61b54a676234d17fc",
          title: "Type wars",
          author: "Robert C. Martin",
          url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
          likes: 2,
          __v: 0,
        },
      ];

      const mostLikedBlogReturned = {
        _id: "5a422b3a1b54a676234d17f9",
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12,
        __v: 0,
      };

      const mostLikedBlog = listHelpers.favoriteBlog(blogs);
      expect(mostLikedBlog).toEqual(mostLikedBlogReturned);
    });
  });

  describe("given an array will give us back the Blogger with most blogs", () => {
    test("given array of blogs return the blogger with most blogs", () => {
      const blogs = [
        {
          _id: "5a422a851b54a676234d17f7",
          title: "React patterns",
          author: "Michael Chan",
          url: "https://reactpatterns.com/",
          likes: 7,
          __v: 0,
        },
        {
          _id: "5a422aa71b54a676234d17f8",
          title: "Go To Statement Considered Harmful",
          author: "Edsger W. Dijkstra",
          url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
          likes: 5,
          __v: 0,
        },
        {
          _id: "5a422b3a1b54a676234d17f9",
          title: "Canonical string reduction",
          author: "Edsger W. Dijkstra",
          url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
          likes: 12,
          __v: 0,
        },
        {
          _id: "5a422b891b54a676234d17fa",
          title: "First class tests",
          author: "Robert C. Martin",
          url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
          likes: 10,
          __v: 0,
        },
        {
          _id: "5a422ba71b54a676234d17fb",
          title: "TDD harms architecture",
          author: "Robert C. Martin",
          url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
          likes: 0,
          __v: 0,
        },
        {
          _id: "5a422bc61b54a676234d17fc",
          title: "Type wars",
          author: "Robert C. Martin",
          url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
          likes: 2,
          __v: 0,
        },
      ];

      const authorWithMostBlogs = listHelpers.mostBlogs(blogs);
      const returnMostBlogger = {
        author: "Robert C. Martin",
        blogs: 3,
      };
      expect(authorWithMostBlogs).toEqual(returnMostBlogger);
    });
  });

  describe("given an array return author with most likes", () => {
    test("return author with most likes", () => {
      const blogs = [
        {
          _id: "5a422a851b54a676234d17f7",
          title: "React patterns",
          author: "Michael Chan",
          url: "https://reactpatterns.com/",
          likes: 7,
          __v: 0,
        },
        {
          _id: "5a422aa71b54a676234d17f8",
          title: "Go To Statement Considered Harmful",
          author: "Edsger W. Dijkstra",
          url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
          likes: 5,
          __v: 0,
        },
        {
          _id: "5a422b3a1b54a676234d17f9",
          title: "Canonical string reduction",
          author: "Edsger W. Dijkstra",
          url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
          likes: 12,
          __v: 0,
        },
        {
          _id: "5a422b891b54a676234d17fa",
          title: "First class tests",
          author: "Robert C. Martin",
          url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
          likes: 10,
          __v: 0,
        },
        {
          _id: "5a422ba71b54a676234d17fb",
          title: "TDD harms architecture",
          author: "Robert C. Martin",
          url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
          likes: 0,
          __v: 0,
        },
        {
          _id: "5a422bc61b54a676234d17fc",
          title: "Type wars",
          author: "Robert C. Martin",
          url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
          likes: 2,
          __v: 0,
        },
      ];

      const returnedAuthor = {
        author: "Edsger W. Dijkstra",
        likes: 17,
      };

      const mostLikedAuthor = listHelpers.mostLikes(blogs);
      expect(mostLikedAuthor).toEqual(returnedAuthor);
    });
  });
});

const blogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0,
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0,
  },
];
beforeEach(async () => {
  //set up DB

  

  await BLOG.deleteMany({});
  let blogObject = new BLOG(blogs[0]);
  await blogObject.save();

  let blogObjectTwo = new BLOG(blogs[1]);
  await blogObjectTwo.save()
});

describe("testing HTTP methods of API", () => {
  test("Testing get method", async () => {
    const response = await api.get("/api/blogs");
    expect(response.body).toHaveLength(blogs.length);
  });

  test("verify id is presented in object returned ", async () => {
    const response = await api.get("/api/blogs");

    expect(response.body[0].id).toBeDefined();
  });

  test("test we can crete a new blog in DB and its present", async () => {
    const newBlogToTest = {
      title: "juan testing",
      author: "Juan paredes",
      url: "https://reactpatterns.com/",
      likes: 7,
    };

    await api
      .post("/api/blogs")
      .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkFudG9uaW8iLCJpZCI6IjY1ZjVhY2EzNDM2NzhjM2U4NDc4NTYxMCIsImlhdCI6MTcxMDc1MzM4NH0.9P9mR9WvTNdx6CuAvfnkQTopDfSY-jeK1p6fS7Y3NSY')
      .send(newBlogToTest)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const blogsFind = await BLOG.find({});

    expect(blogsFind).toHaveLength(blogs.length + 1);

    const contents = blogsFind.map((blog) => blog.title);
    expect(contents).toContain("juan testing");

   
  });

  test("when updating with correct values it should update", async () => {
    //llamamos a todas las notas
    const response = await api.get("/api/blogs");
    //seleccionamos una , la primera
    const singleBlog = response.body[0];

    const updatedBlogLikes = {
      ...singleBlog,
      likes: 10,
    };


    //update
    await api
      .put(`/api/blogs/${singleBlog.id}`)
      .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkFudG9uaW8iLCJpZCI6IjY1ZjVhY2EzNDM2NzhjM2U4NDc4NTYxMCIsImlhdCI6MTcxMDc1MzM4NH0.9P9mR9WvTNdx6CuAvfnkQTopDfSY-jeK1p6fS7Y3NSY')
      .send(updatedBlogLikes)
      .expect(200);

    //another call to get in order to check if it was updated
    const resultUpdatedblog = await api
      .get(`/api/blogs/${singleBlog.id}`)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    expect(resultUpdatedblog.body).toEqual(updatedBlogLikes);
  });



});


describe("testing bad request HTTP", () => {

  test("check if  URL are missing not able to add new blog", async () => {
    const blogWithoutUrl = {
      title: "juan testing",
      author: "Juan paredes"
    };
    await api
      .post("/api/blogs")
      .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkFudG9uaW8iLCJpZCI6IjY1ZjVhY2EzNDM2NzhjM2U4NDc4NTYxMCIsImlhdCI6MTcxMDc1MzM4NH0.9P9mR9WvTNdx6CuAvfnkQTopDfSY-jeK1p6fS7Y3NSY')
      .send(blogWithoutUrl)
      .expect(400)
     
  });

  test("check if title is missing not able to add new blog", async () => {
    const failingBlog = {
      author: "Juan paredes",
      url: "https://reactpatterns.com/",
    };

    await api
      .post("/api/blogs")
      .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkFudG9uaW8iLCJpZCI6IjY1ZjVhY2EzNDM2NzhjM2U4NDc4NTYxMCIsImlhdCI6MTcxMDc1MzM4NH0.9P9mR9WvTNdx6CuAvfnkQTopDfSY-jeK1p6fS7Y3NSY')
      .send(failingBlog)
      .expect(400)
      
  });

} )


describe("viewving a specific blog", () => {
  test("success with a valid id", async () => {
    //llamamos a todas las notas
    const response = await api.get("/api/blogs");
    //seleccionamos una , la primera
    const singleBlog = response.body[0];

    //hacemos get request para la nota que hemos seleccionado pasandole su id para comprobar que todo salen bien

    const resultSingleNote = await api
      .get(`/api/blogs/${singleBlog.id}`)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    //comprobamos que el blog devuelto sea el mismo que el que hemos seleccionado  en:  const singleBlog = response.body[0];
    expect(resultSingleNote.body).toEqual(singleBlog);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
