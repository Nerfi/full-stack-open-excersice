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
const testUser = {
  username: "testuser",
  name: "Test User",
  password: "password",
};
let token;

beforeEach(async () => {
  //set up DB

  

  await BLOG.deleteMany({});
  let blogObject = new BLOG(blogs[0]);
  await blogObject.save();

  let blogObjectTwo = new BLOG(blogs[1]);
  await blogObjectTwo.save()

  //user test set up
  await api
      .post('/api/users')
      .send(testUser)

    const response = await api
      .post('/api/login')
      .send(testUser)

    token = response.body.token

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
      .set('Authorization', `Bearer ${token}`)
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
      .set('Authorization', `Bearer ${token}`)
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
      .set('Authorization', `Bearer ${token}`)
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
      .set('Authorization', `Bearer ${token}`)
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

/* BLOG TEST  SOLUTION
const supertest = require('supertest')
const mongoose = require('mongoose')
const { test, describe, after, beforeEach } = require('node:test')
const app = require('../app')
const api = supertest(app)
const helper = require('./test_helper')
const assert = require('assert')

const Blog = require('../models/blog')
const User = require('../models/user')

const testUser = {
  username: "testuser",
  name: "Test User",
  password: "password"
}

let token

describe('when there is initially some blogs saved', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    await User.deleteMany({})

    const blogObjects = helper.initialBlogs
      .map(blog => new Blog(blog))

    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)

    await api
      .post('/api/users')
      .send(testUser)

    const response = await api
      .post('/api/login')
      .send(testUser)

    token = response.body.token
  })

  test('blogs are returned as json', async () => {
    const response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    assert.strictEqual(response.body.length, helper.initialBlogs.length)
  })

  test('blogs are returned with id property', async () => {
    const response = await api.get('/api/blogs')
    response.body.forEach(blog => {
      assert(blog.id)
    })
  })

  test('a valid blog can be added ', async () => {
    const newBlog = {
      title: "New Blog",
      author: "New Author",
      url: "http://example.com/new",
      likes: 5
    }

    const postResponse = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
      .set('Authorization', `Bearer ${token}`)
  
    assert.strictEqual(postResponse.body.title, newBlog.title)
    assert.strictEqual(postResponse.body.author, newBlog.author)
    assert.strictEqual(postResponse.body.url, newBlog.url)
    assert.strictEqual(postResponse.body.likes, newBlog.likes)
  
    await api.get('/api/blogs')

    const blogsAtEnd = await helper.blogsInDb()
  
    const titles = blogsAtEnd.map(blog => blog.title)

    assert(titles.includes('New Blog'))
  })

  test('if likes property is missing, it will default to 0', async () => {
    const newBlog = {
      title: "New Blog",
      author: "New Author",
      url: "http://example.com/new",
    }
  
    const postResponse = await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', `Bearer ${token}`)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  
    assert.strictEqual(postResponse.body.likes, 0)
  })

  test('blog without title is not added', async () => {
    const newBlog = {
      author: "New Author",
      url: "http://example.com/new",
      likes: 5
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', `Bearer ${token}`)
      .expect(400)

    const blogsAtEnd = await helper.blogsInDb()

    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
  })

  test('a valid blog is not added without a token', async () => {
    const newBlog = {
      title: "New Blog",
      author: "New Author",
      url: "http://example.com/new",
      likes: 5
    }

    const postResponse = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401)

  })

  test('blog without url is not added', async () => {
    const newBlog = {
      title: "New Blog",
      author: "New Author",
      likes: 5
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', `Bearer ${token}`)
      .expect(400)

    const blogsAtEnd = await helper.blogsInDb()

    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
  })

  test('a blog can be deleted', async () => {
    const blogToDelete = {
      title: "New Blog",
      author: "New Author",
      url: "http://example.com/new",
      likes: 5
    }

    const response = await api
      .post('/api/blogs')
      .send(blogToDelete)
      .set('Authorization', `Bearer ${token}`)

    const id = response.body.id

    const blogsAtStart = await helper.blogsInDb()

    await api
      .delete(`/api/blogs/${id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(204)
  
    const blogsAtEnd = await helper.blogsInDb()
  
    assert.strictEqual(blogsAtEnd.length, blogsAtStart.length - 1)
  
    const titles = blogsAtEnd.map(r => r.title)
  
    assert(!titles.includes(blogToDelete.title))
  })

  test('a blog can be updated', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]
  
    const newBlog = {
      title: "Updated Blog",
      author: "Updated Author",
      url: "http://example.com/updated",
      likes: 10
    }
  
    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(newBlog)
      .expect(200)
  
    const blogsAtEnd = await helper.blogsInDb()
  
    const updatedBlog = blogsAtEnd.find(blog => blog.id === blogToUpdate.id)
  
    assert.strictEqual(updatedBlog.title, newBlog.title)
    assert.strictEqual(updatedBlog.author, newBlog.author)
    assert.strictEqual(updatedBlog.url, newBlog.url)
    assert.strictEqual(updatedBlog.likes, newBlog.likes)
  })

  after(() => {
    mongoose.connection.close()
  })
})
*/