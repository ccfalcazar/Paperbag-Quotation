import { useState} from "react";
import InputField from "../InputFields/InputField";

function Requirements()
{
    const [UnitPrice, ComputeUnitPrice] = useState(FormatCurrency(0));
    const [TotalPrice, ComputeTotalPrice] = useState(FormatCurrency(0));
    const [Quantity, SetQuantity] = useState(0);
    const [Depth, SetDepth] = useState(0);
    const [Width, SetWidth] = useState(0);
    const [Height, SetHeight] = useState(0);
    const [MaterialSelected, SetMaterial] = useState(0);
    const [ColorNumber, SetColors] = useState(0);
    const [LaminationSelected, SetLamination] = useState(0);
    const [CustomerName, SetCustomerName] = useState('');
    const [CompanyName, SetCompanyName] = useState('');
    const [ContactNumber, SetContactNumber] = useState('');
    const [CustomerEmail, SetCustomerEmail] = useState('');
    const Size = function(PaperLength : number, PaperWidth : number) 
    {
        const Length = PaperLength;
        const Width = PaperWidth;
        return {Length, Width};
    }
    
    function handlesQuantity(e : any)
    {
        SetQuantity(e.target.value);
    }
    function handlesLength(e:any)
    {
        SetDepth(e.target.value);
    }
    function handlesWidth(e:any)
    {
        SetWidth(e.target.value);
    }
    function handlesHeight(e:any)
    {
        SetHeight(e.target.value);
    }
    function handlesMaterial(e:any)
    {
        SetMaterial(e.target.value);
    }
    function handlesColor(e:any)
    {
        SetColors(e.target.value);
    }

    function handlesLamination(e:any)
    {
        SetLamination(e.target.value);
    }
    function handlesCustomerName(e:any)
    {
        SetCustomerName(e.target.value);
    }
    function handlesCompanyName(e:any)
    {
        SetCompanyName(e.target.value);
    }
    function handlesContactNumber(e:any)
    {
        SetContactNumber(e.target.value);
    }
    function handlesCustomerEmail(e:any)
    {
        SetCustomerEmail(e.target.value);
    }

    function FormatCurrency(number: number | bigint)
    {
        return new Intl.NumberFormat('en-US',{style:"currency", currency:'PHP'}).format(number);
    }

    function ComputePaperBagSize()
    {
        let TotalRunningLength = (parseFloat(Depth.toString())/2 + 0.5) + parseFloat(Height.toString());
        let TotalRunningWidth = parseFloat(Width.toString()) + parseFloat(Depth.toString()) + 0.5;

        const PaperSize = Size(TotalRunningLength,TotalRunningWidth);
        alert(PaperSize.Length);
    }

    function Compute()
    {
        ComputePaperBagSize();
        ComputeUnitPrice(FormatCurrency(Quantity));
        ComputeTotalPrice(FormatCurrency(1000));
    }

    return (
        <>
        <div className="row">
            <div className="col-md-6">
                <form>
                <h5 className="mb-3">Paperbag Details:</h5>
                    <InputField item={"Quantity (pcs)"} inputValue={Quantity} inputEvent={handlesQuantity} textType={'number'}></InputField>
                    <InputField item={"Width (inches)"} inputValue={Width} inputEvent={handlesWidth} textType={'number'}></InputField>
                    <InputField item={"Depth (inches)"} inputValue={Depth} inputEvent={handlesLength} textType={'number'}></InputField>
                    <InputField item={"Height (inches)"} inputValue={Height} inputEvent={handlesHeight} textType={'number'}></InputField>
                    <InputField item={"Print Colors"} inputValue={ColorNumber} inputEvent={handlesColor} textType={'number'}></InputField>
                    <InputField item={"Material"} inputValue={MaterialSelected} inputEvent={handlesMaterial} textType={'number'}></InputField>
                    <InputField item={"Lamination"} inputValue={LaminationSelected} inputEvent={handlesLamination} textType={'number'}></InputField>
                <div className="btn btn-outline-primary w-100 mb-2" id="btnSubmit" onClick={Compute}>Submit Details</div>
                <div className="input-group mb-2">
                    <span className="input-group-text w-50">Unit Price</span>
                    <input type="text" className="form-control text-center" disabled key="UnitPrice" id="txtUnitPrice" value={UnitPrice}></input>
                </div>
                <div className="input-group mb-2">
                    <span className="input-group-text w-50">Total Price</span>
                    <input type="text" className="form-control text-center" disabled key="TotalPrice" id="txtTotalPrice" value={TotalPrice}></input>
                </div>
                </form>
            </div>
            <div className="col-md-6 justify-content-center">
                <form>
                <h5 className="mb-3">Customer Details:</h5>
                    <InputField item="Name" inputValue={CustomerName} textType="text" inputEvent={handlesCustomerName}/>
                    <InputField item="Company Name" inputValue={CompanyName} textType="text" inputEvent={handlesCompanyName}/>
                    <InputField item="Contact Number" inputValue={ContactNumber} textType="text" inputEvent={handlesContactNumber}/>
                    <InputField item="Email" inputValue={CustomerEmail} textType="text" inputEvent={handlesCustomerEmail}/>
                <span className="d-flex justify-content-center"><button className="btn btn-outline-primary">Send Quotation</button></span>
                </form>
            </div>
        </div>
        </>
    );
}

export default Requirements;