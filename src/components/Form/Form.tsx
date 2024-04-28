import Logo from './../Logo/Logo'
import Requirements from '../Requirements/Requirements';

function Form()
{
    return (
        <div className='vh-100 d-flex row'>
            <div className='col-md-8 card m-auto shadow border border-5 border-light m-0 p-0'>
                <div className='card-header py-3 m-0 px-2'>
                    <div className='row p-0 m-0 text-center'>
                    <div className='col-md-2'>  
                        <Logo/>
                    </div>
                    <div className='col-md-10'>
                        <p className='display-6 fs-3 text-primary text-md-end pt-4 mb-0'>Paper Bag Quotation Form</p>
                    </div>
                    </div>
                </div>
                <div className='card-body'>
                    <Requirements/>
                </div>
            </div>
        </div>
    );
}

export default Form;