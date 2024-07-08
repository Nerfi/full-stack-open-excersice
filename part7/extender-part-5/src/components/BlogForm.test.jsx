import { render, screen } from '@testing-library/react';
import BlogForm from './BlogForm';
import userEvent from '@testing-library/user-event';


test(" check, that the form calls the event handler it received as props with the right details when a new blog is created", async () => {
  const createBlog = vi.fn();
  const user = userEvent.setup();
 

  render(<BlogForm handleCreate={createBlog} />);

  const inputTitle = screen.getByPlaceholderText("title");
  const inputAuthor = screen.getByPlaceholderText("author");
  const inputUrl = screen.getByPlaceholderText("https://example.com");
  const createBtn = screen.getByText("Create");
  await user.type(inputTitle, "testing is good");
  await user.type(inputAuthor, "juan");
  await user.type(inputUrl, "https://example.com");
  await user.click(createBtn);

  expect(createBlog.mock.calls).toHaveLength(1);
  expect(createBlog.mock.calls[0][0].title).toBe("testing is good");
  expect(createBlog.mock.calls[0][0].author).toBe("juan");
  expect(createBlog.mock.calls[0][0].url).toBe("https://example.com");



});

