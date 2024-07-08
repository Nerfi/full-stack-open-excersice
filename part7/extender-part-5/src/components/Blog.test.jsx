import { render, screen } from "@testing-library/react";
import Blog from "./Blog";
import Togglable from "./Toggale";
import userEvent from "@testing-library/user-event";

test("renders content", () => {
  const blog = {
    title: "Component testing is done with react-testing-library",
    author: "juan",
  };

  render(<Blog blog={blog} />);

  const element = screen.getByText(
    "Component testing is done with react-testing-library"
  );

  expect(element).toBeDefined();
});

describe("Toggable", () => {
  let container;
  const blog = {
    title: "Component testing is done with react-testing-library",
    author: "Test Author",
    url: "http://testurl.com",
    likes: 5,
  };

  beforeEach(() => {
    container = render(
      <Togglable buttonLabel="show...">
        <div className="testDiv">
          <Blog blog={blog} />
        </div>
      </Togglable>
    ).container;
  });

  test("at start the children are  displayed", () => {
    const div = container.querySelector(".togglableContent");
    expect(div).not.toHaveStyle("display: none");
  });

  test("when button click show details url and likes", async () => {
    const user = userEvent.setup();
    const button = screen.getByText("show...");
    await user.click(button);

    const div = container.querySelector(".togglableContent");
    expect(div).toHaveStyle("display: none");

    const url = container.querySelector("url");
    const likes = container.querySelector("likes");
    expect(url).toBeDefined();
    expect(likes).toBeDefined();
  });


  // test(" like btn click twice", async () => {
  //   const mockHandler = vi.fn();

  //   const user = userEvent.setup();
  //   const button =  screen.getByText('Like')
  //   await user.click(button);
  //   await user.click(button);
  //   screen.debug(button);

  //   expect(mockHandler.mock.calls).toHaveLength(2);
  // });
});
