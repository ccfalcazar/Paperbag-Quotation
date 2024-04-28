
function InputType(item:string, TextType:string)
{
    let Material = ['Kraft Brown', 'Ordinary', 'Premium'];
    let Lamination = ['None', 'Matte', 'Plastic']

    if(item == 'Material')
        {
            return <>
            <select key={"sel" + item} id={item} className="form-select text-center" >
                {Material.map((mats)=>(
                    <option key={mats}>{mats}</option>
                ))}
                
            </select>
            </>
        }
    else if(item == 'Lamination')
        {
            return <select key={"lam" + item} className="form-select text-center">
            {Lamination.map((lam)=>(
                <option key={lam}>{lam}</option>
            ))}
            
        </select>
        }
    else
        return <input key={"txt"+item} id={item} type={TextType} className="form-control text-center"></input>
}

function Requirements()
{
    let ClientDetails=['Name','Company Name', 'Contact Number','Email']
    let Req = ['Quantity','Length', 'Width','Height','Material','Print Colors','Lamination'];
    return (
        <>
        <div className="row">
            <div className="col-md-6">
                <form>
                <h5 className="mb-3">Paperbag Details:</h5>
                {
                    Req.map((item)=>(
                    <div key={"div" + item} className="input-group mb-2">
                            <span key={"span" + item} className="input-group-text w-50">{item}:</span>
                            {InputType(item,"number")}
                    </div>
                ))}
                <div className="btn btn-outline-primary w-100 mb-2">Submit Details</div>
                <div className="input-group mb-2">
                    <span className="input-group-text w-50">Unit Price</span>
                    <input type="number" className="form-control text-center" disabled key="UnitPrice"></input>
                </div>
                <div className="input-group mb-2">
                    <span className="input-group-text w-50">Total Price</span>
                    <input type="number" className="form-control text-center" disabled key="TotalPrice"></input>
                </div>
                </form>
            </div>
            <div className="col-md-6 justify-content-center">
                <form>
                <h5 className="mb-3">Customer Details:</h5>
                {
                    ClientDetails.map((item)=>(
                    <div key={"div" + item} className="input-group mb-3">
                            <span key={"span"+item} className="input-group-text w-50">{item}:</span>
                            {InputType(item,"text")}
                    </div>
                ))}
                <span className="d-flex justify-content-center"><button className="btn btn-outline-primary">Send Quotation</button></span>
                </form>
            </div>
        </div>
        </>
    );
}

export default Requirements;