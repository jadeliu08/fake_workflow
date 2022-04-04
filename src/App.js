import {Link} from "react-router-dom";

function App() {
    return (
        <div>
            <h1>Welcome to learn React Router lessons!</h1>
            <Link to="/invoices">Invoices</Link>|
            <Link to="/expenses">Expenses</Link>
        </div>
    );
}

export default App;
