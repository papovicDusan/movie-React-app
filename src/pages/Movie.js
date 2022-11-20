import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import {
  getMovie,
  selectMovie,
  createComment,
  getComments,
  selectComments,
  createLike,
  deleteLike,
  getGenreMovies,
  selectGenreMovies,
} from "../store/movies";
import { Link } from "react-router-dom";

export default function Movie() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const movie = useSelector(selectMovie);
  const comments = useSelector(selectComments);
  const genreMovies = useSelector(selectGenreMovies);

  const [commentData, setCommentData] = useState({
    content: "",
  });

  useEffect(() => {
    dispatch(getMovie(id));
    dispatch(getComments({ movie_id: id, page: 1 }));
    dispatch(getGenreMovies(id));
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

  function addLike(number) {
    dispatch(
      createLike({
        movie_id: id,
        like: number,
      })
    );
  }

  function removeLike(number) {
    dispatch(
      deleteLike({
        movie_id: id,
        like: number,
      })
    );
  }

  const seeComments = (pageNew) => {
    dispatch(getComments({ movie_id: id, page: pageNew }));
  };

  if (!movie) {
    return null;
  }
  return (
    <div className="container p-1">
      <div className="d-flex bd-highlight">
        <div className="col-9">
          <img width="100%" src={movie.image_url} alt="pic-any" />
          <h1>{movie.title}</h1>
          <h3>{movie.genre}</h3>
          <p>{movie.description}</p>
          <h3>
            Number of like {movie.numberOfLikes ? movie.numberOfLikes : 0}
          </h3>
          <h3>
            Number of dislike
            {movie.numberOfDislikes ? movie.numberOfDislikes : 0}
          </h3>
          {movie.likedOrDislikedUser === 1 ? (
            <button
              className="btn btn-warning"
              disabled={movie.likedOrDislikedUser === 0}
              onClick={() => removeLike(1)}
            >
              Remove Like
            </button>
          ) : (
            <button
              className="btn btn-primary"
              disabled={
                movie.likedOrDislikedUser === 1 ||
                movie.likedOrDislikedUser === -1
              }
              onClick={() => addLike(1)}
            >
              Like
            </button>
          )}

          {movie.likedOrDislikedUser === -1 ? (
            <button
              className="btn btn-warning"
              disabled={movie.likedOrDislikedUser === 0}
              onClick={() => removeLike(-1)}
            >
              Remove Dislike
            </button>
          ) : (
            <button
              className="btn btn-danger"
              disabled={
                movie.likedOrDislikedUser === -1 ||
                movie.likedOrDislikedUser === 1
              }
              onClick={() => addLike(-1)}
            >
              Dislike
            </button>
          )}

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

        <nav id="sidebar">
          <div className="p-4 pt-5">
            <h3>Related movies</h3>
            <ul className="list-unstyled components mb-5">
              {genreMovies.map((movie) => (
                <li key={movie._id}>
                  <Link to={`/movies/${movie._id}`}>{movie.title}</Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </div>
    </div>
  );
}
