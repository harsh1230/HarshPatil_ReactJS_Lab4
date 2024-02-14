import React, { useEffect, useState } from "react";
import IDataList from "../models/IDataList";
import { getDataFromServer } from "../services/menu";
import ExpenseTracker from "./ExpenseTracker";

function ShowData() {

    const [items, setItems] = useState<IDataList[]>([]);
    const [sum, setSum] = useState<number | null>();
    const [rahulSpent, setRahulSpent] = useState<number>(0);
    const [rameshSpent, setRameshSpent] = useState<number>(0);
    const [showForm, setShowForm] = useState<boolean>(false);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {

        const fetchItems = async () => {

            try {

                const data = await getDataFromServer();
                setItems(data);
                console.log(data);
                setSum(data.reduce((res, each) => (res = res + each.price), 0));
            }

            catch (error: any) {

                setError(error);
            }
        };

        fetchItems();
    }, [showForm]);

    var rahulSpent1: number = 0;
    var rameshSpent1: number = 0;
    const shares = (data: IDataList[]) => {

        data.map((each) => {

            each.payeeName === "Rahul" ? (rahulSpent1 = rahulSpent1 + each.price) : (rameshSpent1 = rameshSpent1 + each.price);
        });

        setRahulSpent(rahulSpent1);
        setRameshSpent(rameshSpent1);
    }

    const success = () => {

        setShowForm(false);
    };

    const cancel = () => {

        setShowForm(false);
    };

    return (

        <>
            <header id="page-header">Expense Tracker</header>
            <button id="Add-Button" onClick={() => setShowForm(true)}>Add</button>
            {showForm &&
                (<div className="form">
                    <ExpenseTracker onTrue={success} onClose={cancel} />
                </div>)
            }

            <div className="use-inline date header-color">Date</div>
            <div className="use-inline header-color">Product Purchased</div>
            <div className="use-inline price header-color">Price</div>
            <div className="use-inline header-color" style={{ width: 100 }}>Payee</div>

            {
                items &&
                items.map((user, index) => (

                    <div key={index}>
                        <div className="use-inline date">{user.date}</div>
                        <div className="use-inline">{user.product}</div>
                        <div className="use-inline price">{user.price}</div>
                        <div className={`use-inline ${user.payeeName}`} style={{ width: 100 }}>{user.payeeName}</div>
                    </div>
                ))
            }
            <hr />
            <div className="use-inline">Total:</div>
            <span className="use-inline total">{sum}</span> <br />

            <div className="use-inline">Rahul Spent:</div>
            <span className="use-inline total Rahul">{rahulSpent}</span> <br />

            <div className="use-inline">Ramesh Spent:</div>
            <span className="use-inline total Ramesh">{rameshSpent}</span> <br />

            <span className="use-inline payable">
                {rahulSpent > rameshSpent ? "Pay to Rahul" : "Pay to Ramesh"}
            </span>
            <span className="use-inline payable price">{" "}
                {Math.abs((rahulSpent - rameshSpent) / 2)}
            </span>
        </>
    )
}

export default ShowData;