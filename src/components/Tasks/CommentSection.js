import React, { useState, useRef, useEffect } from "react";
import { Comment, Avatar, Form, Input, Button, Row, Col } from "antd";
import { GoReply } from "react-icons/go";
import { AiOutlineClose } from "react-icons/ai";
import "./style.css";
import {
	addCommentService,
	getCommentService,
	getRole,
	getUserService
} from "../../utils/services";
import { _notification } from "../../utils/_helpers";
const { TextArea } = Input;

const CommentSection = ({ details }) => {
	const [replyingTo, setReplyingTo] = useState(null);
	const myRef = useRef();
	const formRef = useRef();
	const [refresh, setRefresh] = useState(false);
	const [comments, setComments] = useState([]);
	const [user, setUser] = useState({});
	const userData = getRole();

	const [form] = Form.useForm();

	const handleReply = id => {
		myRef.current.scrollIntoView({ behavior: "smooth" });
		formRef.current.focus();
		setReplyingTo(id);
	};

	useEffect(() => {
		details &&
			(async () => {
				try {
					const res = await getCommentService(details._id);
					console.log(res.data);
					setUser((await getUserService(userData.id)).data);
					if (!res.error && res.message === "success") {
						setComments(res.data);
					}
				} catch (err) {
					console.log(err);
				}
			})();
		//eslint-disable-next-line
	}, [refresh, details]);

	const onSubmit = async val => {
		let data = { text: val.comment };
		try {
			const res = await addCommentService(details._id, data);
			if (!res.error && res.message === "success") {
				form.setFieldsValue({ comment: "" });
				setRefresh(!refresh);
			}
		} catch (err) {
			_notification("error", "Error", err.message);
		}
	};

	return (
		<div className="comment-section-container">
			{comments?.map((comment, id) => (
				<div key={id}>
					<Comment
						className={`comment-container ${
							comment.userData[0].role === "lead"
								? "comment-lead"
								: comment.userData[0].role === "head"
								? "comment-head"
								: "comment-member"
						}`}
						actions={[
							<span
								className="reply-button"
								key="comment-nested-reply-to"
								onClick={() => handleReply(comment._id)}
							>
								<GoReply style={{ marginRight: ".25rem" }} />
								Reply{" "}
							</span>
						]}
						author={<h3>{comment.userData[0].name}</h3>}
						avatar={
							<Avatar
								src={comment.userData[0].image}
								alt={comment.userData[0].name}
							/>
						}
						content={<p>{comment.text}</p>}
					/>
					{/* {comment.replies.length > 0
						? comment.replies.map((reply, id) => (
								<Comment
									key={id}
									className={`reply-container ${
										reply.role === "lead"
											? "comment-lead"
											: reply.role === "head"
											? "comment-head"
											: "comment-member"
									}`}
									author={<h3>{reply.author}</h3>}
									avatar={
										<Avatar
											src={reply.image}
											alt={reply.image}
										/>
									}
									content={<p>{reply.comment}</p>}
								/>
						  ))
						: null} */}
				</div>
			))}

			<Comment
				style={{ padding: "0 .5rem" }}
				avatar={<Avatar src={user && user.image} alt={userData.name} />}
				content={
					<Form form={form} onFinish={onSubmit}>
						{replyingTo ? (
							<>
								<Row
									style={{
										border: "1px solid #D9D9D9",
										borderRadius: "3px",
										marginBottom: ".5rem",
										padding: ".25rem .75rem ",
										color: "#BFBFBF",
										justifyContent: "space-between"
									}}
								>
									<Col>
										<Row>
											<p>
												replying to :{" "}
												<span
													style={{ color: "#262626" }}
												>
													{
														comments.filter(
															comment =>
																comment._id ===
																replyingTo
														)[0].text
													}
												</span>
											</p>
										</Row>
										<Row>
											<p>
												author :{" "}
												<span
													style={{ color: "#262626" }}
												>
													{
														comments.filter(
															comment =>
																comment.id ===
																replyingTo
														)[0].userData[0].name
													}
												</span>
											</p>
										</Row>
									</Col>
									<Col
										style={{
											display: "flex",
											alignItems: "center",
											color: "#262626",
											padding: ".5rem"
										}}
										onClick={() => setReplyingTo(null)}
									>
										<AiOutlineClose
											style={{ cursor: "pointer" }}
										/>
									</Col>
								</Row>
							</>
						) : null}
						<Form.Item name="comment">
							<TextArea
								ref={formRef}
								type="text"
								placeholder="Enter your comment ..."
								rows={3}
							/>
						</Form.Item>
						<Form.Item>
							<Button
								ref={myRef}
								htmlType="submit"
								// loading={submitting}
								type="primary"
							>
								Add Comment
							</Button>
						</Form.Item>
					</Form>
				}
			/>
		</div>
	);
};

export default CommentSection;
