import { PaymentForm, CreditCard } from 'react-square-web-payments-sdk';

function Payment({ setThank, data, setError }) {
    const baseUrl = process.env.REACT_APP_BASE_URL;
    return (
        <div>
            <PaymentForm
                applicationId="sandbox-sq0idb-aogtClVd2gCSRDRCDBkKFw"
                cardTokenizeResponseReceived={async (token, verifiedBuyer) => {
                    const response = await fetch(baseUrl + "/events/register", {
                        method: "POST",
                        headers: {
                            "Content-type": "application/json",
                        },
                        body: JSON.stringify({
                            sourceId: token.token,
                            data: data
                        }),
                    });
                    const res = await response.json();
                    console.log(res.payment.status)
                    if (res.payment.status === "COMPLETED") {
                        setThank(true);
                    }
                    else {
                        setError(true);
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