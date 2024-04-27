import Logo from './../Logo/Logo'
import Requirements from '../Requirements/Requirements';

function Form()
{
    return (
        <div className='vh-100 d-flex row'>
            <div className='col-md-6 card m-auto shadow border border-5 border-light'>
                <div className='card-header p-3 d-flex align-items-middle'>
                    <div className='card-img-top w-50'>  
                        <Logo/>
                    </div>
                    <p className='ms-auto mt-auto mb-auto display-6 fs-3 text-dark text-end'>Paper Bag Quotation Form</p>
                </div>
                <div className='card-body'>
                    <Requirements/>
                </div>
            </div>
        </div>
    );
}

export default Form;