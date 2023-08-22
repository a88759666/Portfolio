type StepState = 'work' | 'info' | 'explore'

type Props = {
  workName: string
  openModal: (currentSetp:StepState) => void
}
const Footer:React.FC<Props> = ({
  workName,
  openModal
}) => {
    return <>
      <div className="flex flex-col w-screen p-[10px] border-t border-black gap-[10px] items-center">
        <div className="m-auto">
          <h1 className="text-[24px] font-medium">Architecture</h1>
        </div>
        <div className=" w-[600px] flex flex-row  justify-between">
          <div className="text-[16px] font-medium cursor-pointer" onClick={() => {openModal('work')}}>ArtWorks</div>
          <div className="text-[16px] font-medium cursor-pointer" onClick={() => {openModal('info')}}>Information</div>
          <div className="text-[16px] font-medium cursor-pointer" onClick={() => {openModal('explore')}}>Exploring</div>
        </div>
      </div>
    </>
  };
    
  export default Footer;