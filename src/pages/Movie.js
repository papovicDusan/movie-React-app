import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import {
  getMovie,
  selectMovie,
  createComment,
  getComments,
  selectComments,
} from "../store/movies";

export default function Movie() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const movie = useSelector(selectMovie);
  const comments = useSelector(selectComments);

  const [commentData, setCommentData] = useState({
    content: "",
  });

  useEffect(() => {
    dispatch(getMovie(id));
    dispatch(getComments({ movie_id: id, page: 1 }));
  }, [id]);

  function addComment(event) {
    event.preventDefault();
    dispatch(
      createComment({
        movie_id: id,
        content: commentData.content,
        onSuccess: () => {
          dispatch(getComments({ movie_id: id, page: 1 }));
        },
      })
    );
    setCommentData({ ...commentData, content: "" });
  }

  const seeComments = (pageNew) => {
    dispatch(getComments({ movie_id: id, page: pageNew }));
  };

  if (!movie) {
    return null;
  }
  return (
    <div className="container">
      <div className="d-flex bd-highlight">
        <div className="col-7">
          <img width="100%" src={movie.image_url} alt="pic-any" />
          <h1>{movie.title}</h1>
          <h3>{movie.genre}</h3>
          <p>{movie.description}</p>

          <h3>Create Comment</h3>
          <form>
            <div className="form-group">
              <label htmlFor="createComment">Create comment</label>
              <input
                required
                className="form-control"
                id="createComment"
                placeholder="Content"
                value={commentData.content}
                onChange={({ target }) =>
                  setCommentData({ ...commentData, content: target.value })
                }
              />
            </div>
            <button
              type="button"
              className="btn btn-primary"
              onClick={addComment}
            >
              Add Comment
            </button>
          </form>

          <h3>Comments</h3>

          {comments?.results.length ? (
            <ul>
              {comments.results.map((comment) => (
                <li key={comment._id}>
                  <div> {comment.content}</div>
                </li>
              ))}
            </ul>
          ) : (
            <h3>No Comments</h3>
          )}
          {comments?.next !== null && (
            <button
              className="btn-primary"
              onClick={() => seeComments(Number(comments.next))}
            >
              More
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
