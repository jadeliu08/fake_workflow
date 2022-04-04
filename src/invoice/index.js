import {Link, useParams} from "react-router-dom";
import {getInvoices, getInvoice, deleteInvoice} from "../data";

function Invoices() {
    const invoices = getInvoices();

    return (
        <div style={{display: "flex"}}>
            <nav style={{borderRight: "1px solid", padding: "1rem"}}>
                {
                    invoices.map((item) => (
                        <Link to={`/invoices/${item.number}`} key={item.number} style={{display: "block"}}>{item.name}</Link>
                    ))
                }
            </nav>
        </div>
    );
}

function Invoice() {
    let params = useParams();
    const invoice = getInvoice(parseInt(params.id, 10));
    return <main>
        <h2>Total Due: {invoice.amount}</h2>
        <p>{invoice.name}: {invoice.number}</p>
        <p>Due Date: {invoice.due}</p>
        <p>
            <button onClick={
                (e) => {
                    deleteInvoice(invoice.number);
                }
            }>Delete
            </button>
        </p>
    </main>;
}

export default Invoices;
export {Invoice};