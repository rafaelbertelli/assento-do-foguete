import { useState } from "react";

import { ThumbsUp, Trash } from "@phosphor-icons/react";
import {
  publishedDateFormatted,
  publishedDateRelativeToNow,
} from "../utils/time";
import { Avatar } from "./Avatar";
import s from "./Comment.module.css";

export function Comment({ id, author, publishedAt, content, onDeleteComment }) {
  const [likeCount, setLikeCount] = useState(0);

  function handleDeleteComment() {
    onDeleteComment(id);
  }

  function handleLike() {
    setLikeCount(likeCount + 1);
  }

  return (
    <div className={s.comment}>
      <Avatar
        hasOutline={false}
        alt="sidebar avatar"
        src="https://github.com/rafaelbertelli.png"
      />

      <div className={s.commentBox}>
        <div className={s.commentContent}>
          <header>
            <div className={s.authorAndTime}>
              <strong>{author}</strong>
              <time
                title={publishedDateFormatted(publishedAt)}
                dateTime={publishedAt.toISOString()}
              >
                {publishedDateRelativeToNow(publishedAt)}
              </time>
            </div>
            <button
              className={s.replyButton}
              title="Deletar comentário"
              onClick={() => handleDeleteComment()}
            >
              <Trash size={24} />
            </button>
          </header>
          <p>{content}</p>
        </div>
        <footer>
          <button className={s.replyButton} title="Like" onClick={handleLike}>
            <ThumbsUp size={20} />
            Aplaudir <span>{likeCount}</span>
            {/* &bull; */}
          </button>
        </footer>
      </div>
    </div>
  );
}
