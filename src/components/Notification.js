let style = {
  color: "green",
  background: "lightgrey",
  fontSize: 20,
  borderStyle: "solid",
  borderRadius: 5,
  padding: 10,
  marginBottom: 10,
};

const Notification = ({ msg }) => {
  if (!msg) return null;

  return <div style={style}>{msg}</div>;
};

export default Notification;
