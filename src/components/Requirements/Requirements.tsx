
function InputType(item:string, index:number)
{
    let Material = ['Kraft Brown', 'Ordinary', 'Premium'];
    let Lamination = ['None', 'Matte', 'Plastic']
    let Info=['Specify Order Quantity','Specify Length of Paperbag in Inches','Specify Width of Paperbag in Inches',
    'Specify Height of Paperbag in Inches', 'Specify Material to be Used', 'Specify number of Spot Colors (for CMYK set to 4)', 'Must be specified if material is premium']

    if(item == 'Material')
        {
            return <>
            <select key={index} id={item} className="form-select text-center" > 
                <option value="" disabled selected hidden>List of Materials</option>
                {Material.map((mats,index)=>(
                    <option key={index}>{mats}</option>
                ))}
                
            </select>
            </>
        }
    else if(item == 'Lamination')
        {
            return <select key={index} id={item} className="form-select text-center">
            {Lamination.map((lam,index)=>(
                <option key={index}>{lam}</option>
            ))}
            
        </select>
        }
    else
        return <input key={index} id={item} type="text" className="form-control text-center"></input>
}

function Requirements()
{
    let ClientDetails=['Name','Company Name', 'Contact Number','Email']
    let Req = ['Quantity','Length', 'Width','Height','Material','Print Colors','Lamination'];
    return (
        <>
        <div className="row">
            <div className="col-md-6">
                <h5 className="mb-3">Paperbag Details:</h5>
                {
                    Req.map((item,index)=>(
                    <div className="input-group mb-2">
                            <span className="input-group-text w-50">{item}:</span>
                            {InputType(item,index)}
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
            </div>
            <div className="col-md-6 justify-content-center">
                <h5 className="mb-3">Customer Details:</h5>
                {
                    ClientDetails.map((item,index)=>(
                    <div className="input-group mb-3">
                            <span className="input-group-text w-50">{item}:</span>
                            {InputType(item,index)}
                    </div>
                ))}
                <span className="d-flex justify-content-center"><button className="btn btn-outline-primary">Send Quotation</button></span>
                
            </div>
        </div>
        </>
    );
}

export default Requirements;