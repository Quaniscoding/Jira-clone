import React, { useState } from 'react';
import { Avatar, Modal, Button, Form, Input } from 'antd';
import { callEditComments } from './../../../redux/reducers/comments/editComments';
import { callDeleteComments } from './../../../redux/reducers/comments/deleteComments';
import { useDispatch } from 'react-redux';

export default function CommentItem({ comment, taskId }) {
    const [isEditing, setIsEditing] = useState(false);
    const [content, setContent] = useState(comment.contentComment);
    const dispatch = useDispatch();

    const handleEditComment = async () => {
        try {
            await dispatch(callEditComments({ id: comment.id, contentComment: content }));
            setIsEditing(false);
        } catch (error) {
            console.log(error);
        }
    };

    const handleDeleteComment = async () => {
        try {
            await dispatch(callDeleteComments(comment.id));
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="comment-item">
            <Avatar src={comment.user.avatar} />
            <div className="comment-content">
                <div className="comment-author">{comment.user.name}</div>
                {isEditing ? (
                    <Form.Item>
                        <Input value={content} onChange={(e) => setContent(e.target.value)} />
                    </Form.Item>
                ) : (
                    <div>{comment.contentComment}</div>
                )}
                <div className="comment-actions">
                    <Button onClick={() => setIsEditing(!isEditing)}>Edit</Button>
                    <Button onClick={handleDeleteComment}>Delete</Button>
                </div>
            </div>
        </div>
    );
}
