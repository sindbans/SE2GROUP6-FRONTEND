const Button = ({ children, onClick }) => (
    <button className="btn-primary" onClick={onClick}>
        {children}
    </button>
);
export default Button;
