import { PayPalScriptProvider, PayPalButtons, FUNDING } from "@paypal/react-paypal-js";
import * as api from '../../api';

function PayPalPayment({ setThank, regData, setError }) {
    const baseURL = api.baseURL;
    const FUNDING_SOURCES = [
        FUNDING.PAYPAL
    ];

    const initialOptions = {
        "client-id": "AcVEtIaoJB1HNEVgiD8kaz7AjnluD_pQqmFJHbPEeZfm809hHdlQznVw5bmfTDIi3rV3h8ujFVzokOaK",
        "enable-funding": "paylater,venmo",
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
                                color: 'gold',
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
                                    // const response = await api.PayPalOrder(regData);

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

                                    // const response = await api.PayPalCapture(regData, data.orderID);

                                    const details = await response.json();
                                    // Three cases to handle:
                                    //   (1) Recoverable INSTRUMENT_DECLINED -> call actions.restart()
                                    //   (2) Other non-recoverable errors -> Show a failure message
                                    //   (3) Successful transaction -> Show confirmation or thank you message

                                    // This example reads a v2/checkout/orders capture response, propagated from the server
                                    // You could use a different API or structure for your 'orderData'
                                    const errorDetail = Array.isArray(details.details) && details.details[0];

                                    if (errorDetail && errorDetail.issue === 'INSTRUMENT_DECLINED') {
                                        return actions.restart();
                                        // https://developer.paypal.com/docs/checkout/integration-features/funding-failure/
                                    }

                                    if (errorDetail) {
                                        let msg = 'Sorry, your transaction could not be processed.';
                                        msg += errorDetail.description ? ' ' + errorDetail.description : '';
                                        msg += details.debug_id ? ' (' + details.debug_id + ')' : '';
                                        setError(msg);
                                    }

                                    // Successful capture! For demo purposes:
                                    console.log('Capture result', details, JSON.stringify(details, null, 2));
                                    const transaction = details.purchase_units[0].payments.captures[0];
                                    if (transaction.status === "COMPLETED") {
                                        setThank(true);
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
