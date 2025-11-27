const FooterHelper = ({title,items}) =>{
    return (<div className="">
        <p className="font-light text-xs text-gray-400">{title}</p>
        <ul className="flex flex-col gap-1 mt-2 text-white text-sm font-semibold">
            {items.map((item,index)=>(<li key={index}>{item}</li>))}
        </ul>
    
    </div>);
}

export default FooterHelper