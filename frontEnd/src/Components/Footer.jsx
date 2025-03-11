import FooterLogo from "../Images/brandLogo.png";
export const Footer = () => {
  return (
    <div className="flex justify-around items-center bg-[#F6E0D2] shadow-xl rounded-b-lg gap-10">
      <ul className="flex gap-5">
        <li>Services</li>
        <li>Company</li>
        <li>Shipping</li>
      </ul>
      <img src={FooterLogo} alt="Splendid Logo" className="w-[10rem] " />
      <ul className="flex gap-5">
        <li>Policy</li>
        <li>Social</li>
        <li>Contact</li>
      </ul>
    </div>
  );
};
