import { useForm, ValidationError } from '@formspree/react';

interface Props
{
    Value: any,
    Handler: any;
}

function ContactForm({Value, Handler}: Props) {
  const [state, handleSubmit] = useForm("xwkgjejo");
  if (state.succeeded) {
    return (
        <div className='row'>
            <span className='text-center'>Email Sent!</span>
        </div>
    )
  }
  return (
    <form onSubmit={handleSubmit}>
        <div className="input-group mb-2">
            <span className="input-group-text w-50">Name:</span>
            <input id='Name' type='text' name="Name" className="form-control text-center" />
        </div>
        <div className="input-group mb-2">
            <span className="input-group-text w-50">Company Name:</span>
            <input id='CompanyName' type='text' name="CompanyName" className="form-control text-center" />
        </div>
        <div className="input-group mb-2">
            <span className="input-group-text w-50">Contact Number:</span>
            <input id='ContactNumber' type='number' name="ContactNumber" className="form-control text-center" />
        </div>
        <div className="input-group mb-2">    
            <span className="input-group-text w-50">Email:</span>
            <input id='Email' type='email' name="Email" className="form-control text-center" />
            <ValidationError 
                prefix="Email" 
                field="Email"
                errors={state.errors}
            />
        </div>
        <div className="mb-2">
            <div className='mb-2'>Summary:</div>
            <textarea id='Summary' name='Summary' className='form-control' onChange={Handler} rows={7} value={Value}/>
        </div>
        <span className='row m-auto'>
        <button type="submit" className='btn btn-outline-primary' disabled={state.submitting}>
            Submit
        </button>
        </span>
    </form>
  );
}

export default ContactForm;
