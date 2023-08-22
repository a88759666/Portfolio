
type props = {
    btnName?: string,
    onClickEvent?: React.MouseEventHandler<HTMLButtonElement>
    textColor?: string
    bgColor?: string
}
const SubButton:React.FC<props> = ({
    btnName,
    onClickEvent,
    textColor = 'gold',
    bgColor = 'inherit',
}) => {
    return <>
        <button 
            className={`text-${textColor} px-[70px] bg-[${bgColor}] py-[9px] rounded-[50px] cursor-pointer border-2 border-black text-[16px] font-bold leading-[22px]`}
            onClick={onClickEvent}
        >
            {btnName}
        </button>
    </>
  };
    
  export default SubButton;