import { ChangeEvent, FormEvent, InvalidEvent, useState } from "react";

import {
  publishedDateFormatted,
  publishedDateRelativeToNow,
} from "../utils/time";
import { Avatar } from "./Avatar";
import { Comment } from "./Comment";

import s from "./Post.module.css";

interface Author {
  name: string;
  role: string;
  avatarUrl: string;
}

interface Content {
  type: "paragraph" | "link";
  content: string;
}

interface PostProps {
  author: Author;
  content: Content[];
  publishedAt: Date;
}

interface Comment {
  id: string;
  author: string;
  publishedAt: Date;
  content: string;
}

const myComments: Comment[] = [
  {
    id: "1",
    author: "Rachel",
    publishedAt: new Date("2024-05-25 11:42:00"),
    content: "Muito bom Devon, parabéns!! 👏👏👏",
  },
];

export function Post({ author, content, publishedAt }: PostProps) {
  const [comments, setComments] = useState<Comment[]>(myComments);
  const [newComment, setNewComment] = useState("");

  function handleNewCommentInvalid(event: InvalidEvent<HTMLTextAreaElement>) {
    event.target.setCustomValidity("Seu comentário não pode estar vazio.");
  }

  function handleCommentChange(event: ChangeEvent<HTMLTextAreaElement>) {
    event.target.setCustomValidity("");
    setNewComment(event.target.value);
  }

  function handleCreateNewComment(event: FormEvent) {
    event.preventDefault();

    setComments([
      ...comments,
      {
        id: Math.random().toString(36).slice(2, 11),
        author: "Sofia",
        publishedAt: new Date(),
        content: newComment,
      },
    ]);
    setNewComment("");
  }

  function deleteComment(commentId: string) {
    setComments(comments.filter((c) => c.id !== commentId));
  }

  const isNewCommentEmpty = newComment.trim().length === 0;

  return (
    <article className={s.post}>
      <header>
        <div className={s.author}>
          <Avatar alt="sidebar avatar" src={author.avatarUrl} />

          <div className={s.authorInfo}>
            <strong>{author.name}</strong>

            <span>{author.role}</span>
          </div>
        </div>

        <time
          title={publishedDateFormatted(publishedAt)}
          dateTime={publishedAt.toISOString()}
        >
          {publishedDateRelativeToNow(publishedAt)}
        </time>
      </header>
      <div className={s.content}>
        {content.map((line, index) => {
          if (line.type === "paragraph") {
            return <p key={index}>{line.content}</p>;
          }

          if (line.type === "link") {
            return (
              <p key={index}>
                <a href="#">{line.content}</a>
              </p>
            );
          }
        })}

        <p>
          <a href="#">#novoprojeto</a> <a href="#">#nlw</a>{" "}
          <a href="#">#rocketseat</a>
        </p>
      </div>

      <form className={s.commentForm} onSubmit={handleCreateNewComment}>
        <strong>Deixe seu feedback</strong>

        <textarea
          name="comment"
          placeholder="Deixe um comentário"
          onChange={handleCommentChange}
          value={newComment}
          required
          onInvalid={handleNewCommentInvalid}
        />

        <footer>
          <button type="submit" disabled={isNewCommentEmpty}>
            Publicar
          </button>
        </footer>
      </form>

      <div className={s.commentList}>
        {comments.map((c) => (
          <Comment
            key={c.id}
            id={c.id}
            author={c.author}
            publishedAt={c.publishedAt}
            content={c.content}
            onDeleteComment={deleteComment}
          />
        ))}
      </div>
    </article>
  );
}
