
function InputType(item:string, index:number)
{
    if(item == 'Material')
        {
            return <input key={index} id={item} type="text" className="form-control text-center"></input>
        }
    else
        return <input key={index} id={item} type="text" className="form-control text-center"></input>
}

function Requirements()
{
    //let ClientDetails=['Name','Company Name', 'Contact Number','Email']
    let req = ['Quantity','Length', 'Width','Height','Material','Lamination'];
    return (
        <>
        <h5 className="mb-3">Paperbag Details:</h5>
        {
            req.map((item,index)=>(
            <div className="input-group mb-3 w-50">
                    <span className="input-group-text w-25">{item}:</span>
                    {InputType(item,index)}
            </div>
        ))}
        </>
    );
}

export default Requirements;