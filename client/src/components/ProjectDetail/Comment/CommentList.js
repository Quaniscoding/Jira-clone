import React from 'react';
import { useSelector } from 'react-redux';
import CommentItem from './CommentItem';

export default function CommentList({ taskId }) {
    const listComments = useSelector((state) => state.getComments.listComments);

    return (
        <div className="comment-list">
            {listComments.map((comment) => (
                <CommentItem key={comment.id} comment={comment} taskId={taskId} />
            ))}
        </div>
    );
}
