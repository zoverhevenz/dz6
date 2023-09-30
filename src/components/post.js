export default function Post(props) {
  return (
    <div className="post-card">
      <h2 className="post-title">{props.title}</h2>
      <img src={props.imagesUrl} alt="Котик" className="cat-image" />
      <p className="post-body">{props.body}</p>
      <button className="btn-delete" onClick={() => props.deletePost(props.id)}>
        delete
      </button>
    </div>
  );
}
