import React from "react";
import CommentCardItem from "./CommentCardItem";

const CommentCard = ({ items }) => {
  return (
    <div>
      {items.map((item) => (
        <CommentCardItem
          key={item.id}
          id={item.id}
          comment={item.comment}
          commentStarRate={item.commentStarRate}
          totalComments={item.totalComments}
          totalLikes={item.totalLikes}
          userAvatar={item.userAvatar}
        />
      ))}
    </div>
  );
};

export default CommentCard;
