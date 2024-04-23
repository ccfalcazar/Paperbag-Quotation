import Logo from './../Logo/Logo'
import Requirements from '../Requirements/Requirements';
import {isMobile} from 'react-device-detect';

function Form()
{
    return (
        <div className='vh-100 d-flex'>
            <div className={`card ${isMobile===true ? `w-100`:`w-50`} m-auto shadow border border-5 border-light h-75`}>
                <div className='card-header p-3 d-flex align-items-middle'>
                    <Logo/>
                    <p className='ms-auto mt-auto mb-auto display-6 fs-3 text-dark'>Paper Bag Quotation</p>
                </div>
                <div className='card-body'>
                    <Requirements/>
                </div>
            </div>
        </div>
    );
}

export default Form;