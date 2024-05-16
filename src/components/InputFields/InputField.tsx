
interface Props {
    item: string,
    textType: string
    inputValue: any,
    inputEvent: (event: any)=>void;
}

function InputField({item,textType,inputValue,inputEvent}: Props)
{
    function InputType()
    {
    let Material = ['Ordinary','Kraft Brown', 'Premium'];
    let Lamination = ['None', 'Matte', 'Glossy']

    if(item == 'Material')
        {
            return <>
            <select id={item} onChange={inputEvent} className="form-select text-center" >
                {Material.map((mats)=>(
                    <option key={mats}>{mats}</option>
                ))}
                
            </select>
            </>
        }
    else if(item == 'Lamination')
        {
            return <select onChange={inputEvent} className="form-select text-center">
            {Lamination.map((lam)=>(
                <option key={lam}>{lam}</option>
            ))}
            
        </select>
        }
    else
        return <input id={item} type={textType} value={inputValue} onChange={inputEvent} className="form-control text-center"></input>
    }
    
return (
<>
<div key={"div" + item} className="input-group mb-2">
    <span className="input-group-text w-50">{item}:</span>
    {InputType()}
</div>
</>
);
}
export default InputField;