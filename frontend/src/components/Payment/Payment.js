import { PaymentForm, CreditCard } from 'react-square-web-payments-sdk';

function Payment() {
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
                    console.log(await response.json());
                }}
                locationId='XXXXXXXXXX'
            >
                <CreditCard />
            </PaymentForm>
        </div>
    );
}

export default Payment