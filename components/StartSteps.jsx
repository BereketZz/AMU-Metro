import styles from "../styles";

const StartSteps = ({number, text, dark}) => (
  <div className={`${styles.flexCenter} flex-row`}>
    <div className={`${styles.flexCenter} w-[70px] h-[70px] rounded-[24px] ${dark?"bg-[#323f5d]":"shadow-lg"}  `}>
      <p className="font-bold text-[20px] text-white">
      <img src="/tick.png" />
      </p>
    </div>
    <p className={`flex-1 ml-[30px] font-normal text-[18px] ${dark?"text-white":"text-gray-700"}  leading-[32px]`}>
  {text}
    </p>
  </div>
);

export default StartSteps;
