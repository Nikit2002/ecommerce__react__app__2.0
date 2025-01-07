import './ModalWind.css';

export default function ModalWind({ call, setIsModal, removeItem}) {
  if (!call) return null;

  return (
    <div className="cusmom-modal">
      <div className="modal-content">
        <i className="close" onClick={() => setIsModal(false)}>
          X
        </i>
        <h2>Do you want to remove this product ?</h2>
        <div className="btns">
          <button className="accept" onClick={removeItem}>Accept</button>
          <button className="reject" onClick={() => setIsModal(false)}>
            Dismiss
          </button>
        </div>
      </div>
    </div>
  );
}
