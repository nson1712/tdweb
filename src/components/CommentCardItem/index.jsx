import React from "react";
import CommentCardItem from "./CommentCardItem";

const CommentCard = ({ items }) => {
  return (
    <div>
      {items.map((item, index) => (
        <CommentCardItem
          key={index}
          id={item.id}
          message={item.message}
          customerRate={item.customerRate}
          totalLike={item.totalLike}
          totalComment={item.totalComment}
          userAvatar={item.userAvatar}
        />
      ))}
    </div>
  );
};

export default CommentCard;
