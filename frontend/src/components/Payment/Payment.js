import { PaymentForm, CreditCard } from 'react-square-web-payments-sdk';

function Payment({ setThank, setCheckOut }) {
    return (
        <div>
            <PaymentForm
                applicationId="sandbox-sq0idb-aogtClVd2gCSRDRCDBkKFw"
                cardTokenizeResponseReceived={async (token, verifiedBuyer) => {
                    const response = await fetch("http://localhost:5000/payment", {
                        method: "POST",
                        headers: {
                            "Content-type": "application/json",
                        },
                        body: JSON.stringify({
                            sourceId: token.token,
                        }),
                    });
                    const res = await response.json();
                    console.log(res.payment.status)
                    if (res.payment.status === "COMPLETED") {
                        setThank(true);
                        console.log('heyy')
                    }
                }}
                locationId='XXXXXXXXXX'
            >
                <CreditCard />
            </PaymentForm>
        </div>
    );
}

export default Payment