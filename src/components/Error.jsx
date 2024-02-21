const Error = ({ title, message, onConfirm }) => {
    return (
        <div className="error">
            <h2>{title}</h2>
            <p>{message}</p>
            {onConfirm && (
                <div id="confirmation-actions">
                    <button onClick={onConfirm} className="error-button">
                        Okay
                    </button>
                </div>
            )}
        </div>
    );
}

export default Error