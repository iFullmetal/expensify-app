import React from 'react';

import { Link} from "react-router-dom";

const ExpenseListItem = ({ expense }) => (
    <div>
        <Link to={`/edit/${expense.id}`}>
            <h3>{expense.description}</h3>
        </Link>

        <p>amount: {expense.amount}</p>
        <p>{expense.createdAt}</p>
    </div>
);

export default ExpenseListItem;