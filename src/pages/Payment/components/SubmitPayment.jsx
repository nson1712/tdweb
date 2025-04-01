import { usePayPalCardFields } from "@paypal/react-paypal-js";

const SubmitPayment = () => {
  const { cardFields, fields } = usePayPalCardFields();

  function submitHandler() {
    if (typeof cardFields.submit !== "function") return; // validate that `submit()` exists before using it

    cardFields
      .submit()
      .then(() => {
        // submit successful
      })
      .catch(() => {
        // submission error
      });
  }
  return <button onClick={submitHandler}>Pay</button>;
};

export default SubmitPayment;
