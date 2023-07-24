import { PayPalScriptProvider, PayPalButtons, FUNDING } from "@paypal/react-paypal-js";
import * as api from '../../api';

function PayPalPayment({ setThank, regData, setError }) {
    const baseURL = api.baseURL;
    const FUNDING_SOURCES = [
        FUNDING.PAYPAL,
        FUNDING.CARD,
    ];

    const initialOptions = {
        "client-id": "AVekX6NdnNlcuNZcHQ7FbKPVi31aBzrN7dxIk2UgQZo6Iji5oZzE5EshIK9WxWiK7fB6Tj3mwtCE58hr",
        "enable-funding": "paylater,venmo,card",
        "currency":"AUD"
    }

    return (
        <PayPalScriptProvider options={initialOptions}>
            {
                FUNDING_SOURCES.map(fundingSource => {
                    return (
                        <PayPalButtons
                            
                            fundingSource={fundingSource}
                            key={fundingSource}

                            style={{
                                layout: 'vertical',
                                shape: 'pill',
                                color: (fundingSource === FUNDING.PAYLATER) ? 'gold' : '',
                            }}

                            createOrder={async (data, actions) => {
                                try {
                                    const response = await fetch(baseURL + "/orders", {
                                        method: "POST",
                                        headers: {
                                            'Accept': 'application/json',
                                            'Content-Type': 'application/json'
                                        },
                                        body: JSON.stringify(regData),
                                    });

                                    const details = await response.json();
                                    return details.id;
                                } catch (error) {
                                    console.error(error);
                                    // Handle the error or display an appropriate error message to the user
                                }
                            }}



                            onApprove={async (data, actions) => {
                                try {
                                    const response = await fetch(baseURL + "/orders/" + data.orderID + "/capture", {
                                        method: "POST",
                                        headers: {
                                            'Accept': 'application/json',
                                            'Content-Type': 'application/json'
                                        },
                                        body: JSON.stringify(regData),
                                    });

                                    const details = await response.json();

                                    const errorDetail = Array.isArray(details.details) && details.details[0];

                                    console.log(details);
                                    console.log("***");

                                    if (errorDetail && errorDetail.issue === 'INSTRUMENT_DECLINED') {
                                        setError("The instrument presented was either declined by the processor or bank, or it can't be used for this payment.")
                                        return actions.restart();
                                    }

                                    if (errorDetail) {
                                        let msg = 'Sorry, your transaction could not be processed.';
                                        msg += errorDetail.description ? ' ' + errorDetail.description : '';
                                        setError(msg);
                                    }

                                    // Successful capture! For demo purposes:
                                    console.log('Capture result', details, JSON.stringify(details, null, 2));
                                    const transaction = details.purchase_units[0].payments.captures[0];
                                    if (transaction.status === "COMPLETED") {
                                        setThank(true);
                                    } else {
                                        setError("The instrument presented was either declined by the processor or bank, or it can't be used for this payment.")
                                    }
                                } catch (error) {
                                    console.error(error);
                                    // Handle the error or display an appropriate error message to the user
                                }
                            }}
                        />)
                })
            }
        </PayPalScriptProvider>
    );
}

export default PayPalPayment;
