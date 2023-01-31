const Notification = ({ msg, style }) => {
  if (!msg) return null;

  return <div style={style}>{msg}</div>;
};

export default Notification;
