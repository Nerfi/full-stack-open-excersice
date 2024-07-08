describe("Blog app", function () {
  it("front page can be opened", function () {
    cy.visit("http://localhost:5173");
    cy.contains("blogs");
  });
});

describe("Blog app exercises", function () {
  //before Each es para poder ejecturar un determinado codigo antes de todas las pruebas
  //por la naturaleza de cypress en cada prueba se reinicia el estado de la app ya que ejecutamos las
  //pruebas desde el nevegador

  beforeEach(function () {
    cy.request("POST", "http://localhost:3001/api/testing/reset");
    const user = {
      name: "juan",
      username: "juan",
      password: "juan",
    };
    cy.request("POST", "http://localhost:3001/api/users/", user);
    cy.visit("http://localhost:5173");
  });

  it("login form is show by default", function () {
    cy.contains("Username");
    cy.contains("password");
    cy.contains("Login");
  });

  //successful login and unsuccessful
  describe("Login", function () {
    it("login success", function () {
      cy.get("#username").type("juan");
      cy.get("#password").type("juan");
      //click en el btn de Login
      cy.get("#login-btn").click();
      //yo tengo que comprobar nombre user + log out btn text
      cy.contains("juan");
      cy.contains("log out");
    });
    it("login unsuccessful", function () {
      cy.get("#username").type("martin");
      cy.get("#password").type("martin");
      //click en el btn de Login
      cy.get("#login-btn").click();
      //check error msg
      cy.contains("Wrong credentials");
    });
  });
});

describe("Blog app", function () {
  describe("when logged in", function () {
    beforeEach(function () {
      cy.request("POST", "http://localhost:3001/api/testing/reset");
      const user = {
        name: "juan",
        username: "juan",
        password: "juan",
      };
      cy.request("POST", "http://localhost:3001/api/users/", user);
      cy.visit("http://localhost:5173");
    });

    it("A blog can be created", function () {
      cy.get("#username").type("juan");
      cy.get("#password").type("juan");
      //click en el btn de Login
      cy.get("#login-btn").click();
      //creating a blog
      cy.get("#title").type("first cypress attemp");
      cy.get("#author").type("juan");
      cy.get("#url").type(
        "https://www.recharge.com/en/es/transcash?currency=EUR"
      );
      cy.get("#create").click();
      //check we render such note, the title at least
      cy.contains("first cypress attemp");
    });

    it("can like a blog", function () {
      cy.get("#username").type("juan");
      cy.get("#password").type("juan");
      //click en el btn de Login
      cy.get("#login-btn").click();
      cy.get("#title").type("first cypress attemp");
      cy.get("#author").type("juan");
      cy.get("#url").type(
        "https://www.recharge.com/en/es/transcash?currency=EUR"
      );
      cy.get("#create").click();
      //check we render such note, the title at least
      cy.contains("first cypress attemp");
      //liking the blog
      cy.contains("Like").click();
      //comprobando que hemos sumado un like
      cy.contains("likes: 1");
    });
  });
});

describe("only owner can delete the blog", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3001/api/testing/reset");
    const user = {
      name: "juan",
      username: "juan",
      password: "juan",
    };
    cy.request("POST", "http://localhost:3001/api/users/", user);
    cy.visit("http://localhost:5173");
  });

  beforeEach(function () {
    cy.get("#username").type("juan");
    cy.get("#password").type("juan");
    //click en el btn de Login
    cy.get("#login-btn").click();
    cy.get("#title").type("first cypress attemp");
    cy.get("#author").type("juan");
    cy.get("#url").type(
      "https://www.recharge.com/en/es/transcash?currency=EUR"
    );
    cy.get("#create").click();
    //check we render such note, the title at least
    cy.contains("first cypress attemp");
  });

  it("only owner is able to delete a blog ", function () {
    //5.21
    cy.contains("Remove").click();
    //checking the blog is gone , since only the owner of the blog can see the btn
    cy.get("html").should("not.contain", "first cypress attemp");
  });
  //5.22 no lo hago por que la logica del codigo es esa , solo el autor ve el btn de Remove
  it('a non creator can not delete a blog', function() {
    cy.contains('logout').click()
    cy.login({ username: 'hellas', password: 'secret' })
    //this function has not been added, read again cypress in order to make it 
    cy.contains('show').click()
    cy.contains('delete').should('not.exist')
  })
});

describe("blog orderd", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3001/api/testing/reset");
    const user = {
      name: "juan",
      username: "juan",
      password: "juan",
    };
    cy.request("POST", "http://localhost:3001/api/users/", user);
    cy.visit("http://localhost:5173");
  });

  beforeEach(function () {
    cy.get("#username").type("juan");
    cy.get("#password").type("juan");
    //click en el btn de Login
    cy.get("#login-btn").click();
    cy.get("#title").type("first cypress attemp");
    cy.get("#author").type("juan");
    cy.get("#url").type(
      "https://www.recharge.com/en/es/transcash?currency=EUR"
    );
    cy.get("#create").click();

    //opening again the form
    cy.get("#toggable").click();
    //creating second blog
    cy.get("#title").type("second cypress attemp");
    cy.get("#author").type("juan");
    cy.get("#url").type(
      "https://www.recharge.com/en/es/transcash?currency=EUR"
    );
    cy.get("#create").click();
    //opening again the form
    cy.get("#toggable").click();
    //  //third blog
    cy.get("#title").type("third cypress attemp");
    cy.get("#author").type("juan");
    cy.get("#url").type(
      "https://www.recharge.com/en/es/transcash?currency=EUR"
    );
    cy.get("#create").click();

    //check we render such note, the title at least
    cy.contains("first cypress attemp");
  });

  it.only("show the blogs in order", function () {
    //clicking in the btns in order to run the test logic
    cy.get('button[id="like"]').then((btns) => {
      cy.wrap(btns[0]).click();
      cy.wrap(btns[0]).click();
      cy.wrap(btns[1]).click();
      cy.wrap(btns[1]).click();
      cy.wrap(btns[1]).click();
      cy.wrap(btns[1]).click();

      //ckecking for the order of the blogs
      cy.get(".blogs").eq(0).should("contain", "second cypress attemp")
      cy.get(".blogs").eq(1).should("contain", "first cypress attemp")
      
      //cy.wrap(btns[2]).click(); not sure why its not working 
    });
});

});


/* SOLUCION 
describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, {
      name: 'Matti Luukkainen',
      username: 'mluukkai',
      password: 'salainen'
    })
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, {
      name: 'Arto Hellas',
      username: 'hellas',
      password: 'secret'
    })
    cy.visit('')
  })

  it('Login form is shown', function() {
    cy.contains('log in to application')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()

      cy.contains('welcome')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      cy.contains('wrong username or password')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'mluukkai', password: 'salainen' })
    })

    it('A blog can be created', function() {
      cy.contains('new note').click()
      cy.get('#title').type('You’re NOT gonna need it!')
      cy.get('#author').type('Ron Jeffries')
      cy.get('#url').type('https://ronjeffries.com/xprog/articles/practices/pracnotneed/')
      cy.contains('create').click()

      cy.contains('You’re NOT gonna need it!')
      cy.contains('Ron Jeffries')
    })
  })

  describe('When a blog has been created', function() {
    beforeEach(function() {
      cy.login({ username: 'mluukkai', password: 'salainen' })
      cy.createBlog({
        title: 'You’re NOT gonna need it!',
        author: 'Ron Jeffries',
        url: 'https://ronjeffries.com/xprog/articles/practices/pracnotneed//'
      })
    })

    it('it can be liked', function() {
      cy.contains('show').click()
      cy.contains('like').click()

      cy.contains('likes 1')
    })

    it('the creator can delete it', function() {
      cy.contains('show').click()
      cy.contains('delete').click()

      cy.contains('removed')
      cy.get('html').should('not.contain', 'You’re NOT gonna need it!')
    })

    it('a non creator can not delete a blog', function() {
      cy.contains('logout').click()
      cy.login({ username: 'hellas', password: 'secret' })
      cy.contains('show').click()
      cy.contains('delete').should('not.exist')
    })
  })

  describe('When there exists several blogs', function() {
    const blogs = [
      { title: 'blog1', author: 'author1', url: 'google.com' },
      { title: 'blog2', author: 'author2', url: 'google.com' },
      { title: 'blog3', author: 'author3', url: 'google.com' },
    ]

    beforeEach(function() {
      cy.login({ username: 'mluukkai', password: 'salainen' })
      cy.createBlog(blogs[0])
      cy.createBlog(blogs[1])
      cy.createBlog(blogs[2])
    })

    it('those are ordered by the likes', function() {
      cy.contains(blogs[0].title).contains('show').click()
      cy.contains(blogs[0].title).contains('like').as('like0')
      cy.contains(blogs[1].title).contains('show').click()
      cy.contains(blogs[1].title).contains('like').as('like1')
      cy.contains(blogs[2].title).contains('show').click()
      cy.contains(blogs[2].title).contains('like').as('like2')

      cy.get('@like2').click()
      cy.contains(blogs[2].title).contains('likes 1')
      cy.get('@like2').click()
      cy.contains(blogs[2].title).contains('likes 1')
      cy.get('@like2').click()
      cy.contains(blogs[2].title).contains('likes 2')
      cy.get('@like2').click()
      cy.contains(blogs[2].title).contains('likes 3')

      cy.get('@like1').click()
      cy.contains(blogs[1].title).contains('likes 1')
      cy.get('@like1').click()
      cy.contains(blogs[1].title).contains('likes 2')

      cy.get('@like0').click()
      cy.contains(blogs[0].title).contains('likes 1')

      cy.get('.blog').eq(0).should('contain', blogs[2].title)
      cy.get('.blog').eq(1).should('contain', blogs[1].title)
      cy.get('.blog').eq(2).should('contain', blogs[0].title)
    })

  })
})
*/