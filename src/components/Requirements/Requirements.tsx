import { useState} from "react";
import InputField from "../InputFields/InputField";

function Requirements()
{
    const [UnitPrice, SetUnitPrice] = useState(FormatCurrency(0));
    const [TotalPrice, SetTotalPrice] = useState(FormatCurrency(0));
    const [Quantity, SetQuantity] = useState(0);
    const [Depth, SetDepth] = useState(0);
    const [Width, SetWidth] = useState(0);
    const [Height, SetHeight] = useState(0);
    const [MaterialSelected, SetMaterial] = useState('Ordinary');
    const [ColorNumber, SetColors] = useState(0);
    const [LaminationSelected, SetLamination] = useState('None');
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

    function FormatCurrency(number: number)
    {
        return new Intl.NumberFormat('en-US',{style:"currency", currency:'PHP'}).format(number);
    }

    function GetPaperBagSpreadSize()
    {
        let TotalRunningLength = (parseFloat(Depth.toString())/2 + 0.5) + parseFloat(Height.toString()) + 2;
        let TotalRunningWidth = parseFloat(Width.toString()) + parseFloat(Depth.toString()) + 0.5;

        const RunningSize = Size(TotalRunningLength,TotalRunningWidth);
        return RunningSize;
    }

    function GetPaperSize()
    {
        const PaperSize = (MaterialSelected == 'Kraft Brown'? Size(43,31):Size(38,25));
        
        return PaperSize;
    }

    function GetRequiredPaper()
    {
        let LengthToLength = Math.trunc(GetPaperSize().Length/GetPaperBagSpreadSize().Length) * Math.trunc(GetPaperSize().Width/GetPaperBagSpreadSize().Width);
        let LengthToWidth =Math.trunc(GetPaperSize().Length/GetPaperBagSpreadSize().Width) * Math.trunc(GetPaperSize().Width/GetPaperBagSpreadSize().Length);
        let SpreadQuantity = (parseFloat(Quantity.toString()) * 2);
        let OutsPerSheet = LengthToLength>LengthToWidth? LengthToLength : LengthToWidth;
        return Math.round((SpreadQuantity/OutsPerSheet)*1.20);
    }

    function ComputePaperCost()
    {
        let PaperCost = 0;

        if(MaterialSelected == 'Ordinary')
        {
            PaperCost = (2560 / 500);
        }
        else if(MaterialSelected == 'Kraft Brown')
        {
            PaperCost = (2800/480);
        }
        else if(MaterialSelected == 'Premium')
        {
            PaperCost = 12;
        }
        
        return GetRequiredPaper() * PaperCost;
    }

    function ComputeOffsetCost()
    {
         let InitialCost = 600;
         let SucceedingCost = GetRequiredPaper() > 1000? Math.ceil((GetRequiredPaper() - 1000) / 1000) * 300 : 0;
         return (InitialCost + SucceedingCost) * parseFloat(ColorNumber.toString());
    }

    function ComputeLaminationCost()
    {
        let LaminationCost = 0;
        if(LaminationSelected == 'Matte')
        {
            LaminationCost = 0.009;
        }
        else if(LaminationSelected == 'Glossy')
        {
            LaminationCost = 0.002;
        }
        return (GetPaperBagSpreadSize().Length* GetPaperBagSpreadSize().Width * LaminationCost * GetRequiredPaper())
    }

    function ComputeCTPCost()
    {
        return parseFloat(ColorNumber.toString()) * 450;
    }

    function ComputeBindingCost()
    {
        return parseFloat(Quantity.toString()) * 5;
    }

    function ComputeHandleCost()
    {
        return parseFloat(Quantity.toString()) * 2;
    }

    function ComputeDiecuttingCost()
    {
        let InitialCost = 400;
        let SucceedingCost = GetRequiredPaper() > 1000? Math.ceil((GetRequiredPaper() - 1000) / 1000) * 200 : 0;
        return InitialCost + SucceedingCost;
    }

    function ComputeDiecuttingBladeCost()
    {
        let VerticalLines = 5 * 8 * GetPaperBagSpreadSize().Length;
        let HorizontalLines = 4 * 8 * GetPaperBagSpreadSize().Width;
        let A = parseFloat(Depth.toString()) / 2;
        let Cos45 = Math.cos(45);
        let Hypotenuse = Math.floor(((0.5+A)/Cos45)) * 8 * 2;
        return VerticalLines + HorizontalLines + Hypotenuse;
    }

    function ComputeTotalCost()
    {
        let TotalCost = ComputePaperCost() + ComputeOffsetCost() + ComputeLaminationCost()
                        + ComputeCTPCost() + ComputeBindingCost() + ComputeHandleCost() +
                        ComputeDiecuttingCost() + ComputeDiecuttingBladeCost() + 2000;
        TotalCost = TotalCost * (1.30);
        TotalCost = TotalCost * (1.12);
        return Math.round(parseFloat(TotalCost.toFixed(2))); 
    }

    function Compute()
    {
        SetUnitPrice(FormatCurrency((ComputeTotalCost() / parseFloat(Quantity.toString()))));
        SetTotalPrice(FormatCurrency(ComputeTotalCost()));
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