const Notification = ({ message }) => {
  if (!message) {
    return null;
  }

  return (
    <>
      <div className="overlay">
        <div className="notification">
          <p>{message}</p>
        </div>
      </div>
    </>
  );
};

export default Notification;
