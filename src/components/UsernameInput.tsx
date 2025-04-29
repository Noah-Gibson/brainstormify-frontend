function UsernameInput() {

    return (
        <input
            type="text"
            className="form-control"
            placeholder="Enter name"
            style={{
                position: 'fixed',
                top: '20px',
                right: '20px',
                width: '150px',
                fontSize: '14px',
                zIndex: 10
            }}
        >
        </input>
    )
}

export default UsernameInput;