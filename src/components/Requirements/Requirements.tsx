import { useEffect, useState} from "react";
import InputField from "../InputFields/InputField";
import ContactForm from "../ContactForm/ContactForm";

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
    const [Summary, SetSummary] = useState('Paperbag Details');
    useEffect(Compute);
    useEffect(handlesTotal);

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
    function handlesSummary(e:any)
    {
        SetSummary(e.target.value);
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
        let LaminationRate = 0;
        let LaminationCost = 0;
        if (LaminationSelected != 'None')
        {
            if(LaminationSelected == 'Matte')
            {
                LaminationRate = 0.009;
            }
            else if(LaminationSelected == 'Glossy')
            {
                LaminationRate = 0.002;
            }
            LaminationCost = ((GetPaperBagSpreadSize().Length* GetPaperBagSpreadSize().Width) * LaminationRate) * GetRequiredPaper();
            return (LaminationCost < 600?600:LaminationCost);
        }
        return 0;
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
        let BladeCostPerInch = 12;
        let VerticalLines = 5 * BladeCostPerInch * GetPaperBagSpreadSize().Length;
        let HorizontalLines = 5 * BladeCostPerInch * GetPaperBagSpreadSize().Width;
        let A = parseFloat(Depth.toString()) / 2;
        let Cos45 = Math.cos(45);
        let Hypotenuse = Math.floor(((0.5+A)/Cos45)) * BladeCostPerInch * 2;
        return VerticalLines + HorizontalLines + Hypotenuse;
    }

    function ComputeTotalCost()
    {
        let TotalCost = ComputePaperCost() + ComputeOffsetCost() + ComputeLaminationCost()
                        + ComputeCTPCost() + ComputeBindingCost() + ComputeHandleCost() +
                        ComputeDiecuttingCost() + ComputeDiecuttingBladeCost() + 2500;
        TotalCost = TotalCost * (1.30);
        TotalCost = TotalCost * (1.12);
        return Math.ceil(parseFloat(TotalCost.toFixed(2))); 
    }
    
    function Compute()
    {
        let UPrice = (ComputeTotalCost() / parseFloat(Quantity.toString()));
        SetUnitPrice(FormatCurrency(UPrice));
        SetTotalPrice(FormatCurrency(UPrice * parseFloat(Quantity.toString())));
    }

    function handlesTotal()
    {
        let PaperbagSummary = "Paperbag Details\nQty: " + Quantity + " pcs\nSize: " + Width + " x " + Depth + " x " + Height
        + " inches\nPrint: " + ColorNumber + " colors\nMaterial: " + MaterialSelected + "\nLamination: "
        + LaminationSelected + "\nUnit Price: " + UnitPrice +"\nTotal Price: " + TotalPrice;

        SetSummary(PaperbagSummary);
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
                <h5 className="mb-3">Customer Details:</h5>
                <ContactForm Value={Summary} Handler={handlesSummary}/>
            </div>
        </div>
        </>
    );
}

export default Requirements;