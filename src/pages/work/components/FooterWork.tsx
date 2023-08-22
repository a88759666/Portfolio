import SubButton from "../../../components/SubButton";
import { DiscordFollowIcon, TwitterFollowIcon, IgFollowIcon} from "@/assets"
 type props = {
    handleClickScroll: (id:string) => void
 }

const FooterWork:React.FC<props> = ({
    handleClickScroll
}) => {
    return <>
        <div className="flex flex-col">
            <div className="flex flex-row justify-between items-start mb-[50px]">
            </div>
            
            <div className="flex flex-row justify-between items-start mb-[50px]">
                <div className="flex flex-col">
                    <h1 className="text-[24px] font-bold leading-[24px]">George Foundation</h1>
                    <h1 className="text-[24px] font-bold mb-[30px] leading-[24px]">Graphic Design</h1>
                    <p className="text-[16px] font-[400] leading-[26px] max-w-[380px]">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquet vel mi faucibus mauris, mauris ornare. Sagittis ultrices nisl cras ut sit adipiscing
                    </p>
                </div>
                <div className="flex flex-row gap-[85px] items-start">
                    <div className="flex flex-col items-start gap-[20px]">
                        <h1 className="text-[24px] font-[700]">MENU</h1>
                        <h1 className="text-[16px] font-[700] cursor-pointer" onClick={()=>{handleClickScroll('workSection')}}>WORK</h1>
                        <h1 className="text-[16px] font-[700] cursor-pointer" onClick={()=>{handleClickScroll('connectSection')}}>CONNECT US</h1>
                        <h1 className="text-[16px] font-[700] cursor-pointer" onClick={()=>{handleClickScroll('aboutSection')}}>ABOUT</h1>
                    </div>
                    <div className="flex flex-col gap-[20px] items-start">
                        <h1 className="text-[24px] font-bold mb-[10px]">Follow us</h1>
                        <div className="flex flex-row gap-[15px]">
                            <DiscordFollowIcon />
                            <TwitterFollowIcon />
                            <IgFollowIcon />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  };
    
  export default FooterWork;