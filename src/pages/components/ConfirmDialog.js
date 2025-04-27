

const ConfirmDialog = ({ show, title, message, onCancel, onConfirm }) => {
    if (!show) return null;

    return (
        <div
            className="cart-overlay"
            onClick={onCancel}
            style={{ display: 'block' }}
        >
            <div
                className="confirm-dialog"
                onClick={(e) => e.stopPropagation()}
                style={{ display: 'block' }}
            >
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div id="remove" tabIndex="0">
                        <div tabIndex="0">{title}</div>
                        <div tabIndex="0" style={{ marginTop: '10px' }}>{message}</div>
                    </div>
                    <button
                        id="x"
                        tabIndex="0"
                        aria-label="Close the dialog"
                        onClick={onCancel}
                        style={{ cursor: 'pointer' ,background: 'none', border: 'none', fontSize: '20px',height: '20px', width: '20px'}}
                    >
                        X
                    </button>
                </div>

                <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center', gap: '10px' }}>
                    <button onClick={onCancel} className="no">Cancel</button>
                    <button onClick={onConfirm}>Confirm</button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmDialog;
