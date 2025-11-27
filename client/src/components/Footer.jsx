import FooterHelper from "./FooterHelper";
import { FaInstagram } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import { CiFacebook } from "react-icons/ci";
import { AiOutlineYoutube } from "react-icons/ai";
import { FaStore } from "react-icons/fa";
import { RiAdvertisementFill } from "react-icons/ri";
import { FaGift } from "react-icons/fa";
import { MdHelpCenter } from "react-icons/md";

const Footer = () => {
  const aboutLinks = [
    "Contact Us",
    "About Us",
    "Careers",
    "Press",
    "Corporate Information",
    "EStore Stories",
  ];
  return (
    <div className="bg-black/90 p-8">
      <div className="flex  justify-between">
        <div className="hidden md:flex gap-15">
          <FooterHelper title={"ABOUT"} items={aboutLinks} />
          <FooterHelper title={"HELP"} items={aboutLinks} />
          <FooterHelper title={"CONSUMER POLICY"} items={aboutLinks} />
        </div>
        <div className="hidden md:w-[2px] md:h-auto md:bg-white/10"></div>

        <div className="md:flex md:w-1/3 flex-col">
          <div className="flex flex-col md:flex gap-5">
            <div className="w-1/2">
              <p className="font-light text-xs text-gray-400">Mail Us</p>
              <p className="mt-2 text-white text-sm font-light">
                Building Number: 118 Street Name: Anna Nagar Street Address: 2nd
                Avenue, Near Round Tana State: Tamil Nadu City: Chennai Post
                Code: 600040
              </p>
            </div>

            <div className="w-1/2">
              <p className="font-light text-xs text-gray-400">
                Registered Office Address
              </p>
              <p className="mt-2 text-white text-sm font-light">
                Building Number: 55 Street Name: Sardar Patel Marg Street
                Address: Dhaula Kuan Enclave, Chanakyapuri State: Delhi City:
                New Delhi Post Code: 110021
              </p>
            </div>
          </div>

          <div>
            <p className="font-light text-xs text-gray-400">Social</p>

            <ul className="flex gap-5 mt-3 text-white">
              <li>
                <FaInstagram className="size-6" />
              </li>
              <li>
                <BsTwitterX className="size-6" />
              </li>
              <li>
                <CiFacebook className="size-6" />
              </li>
              <li>
                <AiOutlineYoutube className="size-6" />
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="w-auto h-[2px] mt-5 bg-white/10"></div>
      <div className="mt-2 md:flex md:justify-around md:mt-5">
        <div className="flex flex-col gap-5 md:flex md:flex-row md:gap-10">
             <ul className="flex items-center gap-2">
          <li className="text-blue-900">
            <FaStore />
          </li>
          <li className="text-white text-sm font-light">Become a Seller</li>
        </ul>

        <ul className="flex items-center gap-2">
          <li className="text-blue-900">
            <RiAdvertisementFill />
          </li>
          <li className="text-white text-sm font-light">Advertisement</li>
        </ul>

        <ul className="flex items-center gap-2">
          <li className="text-blue-900">
            <FaGift />
          </li>
          <li className="text-white text-sm font-light">Gift Card</li>
        </ul>

        <ul className="flex items-center gap-2">
          <li className="text-blue-900">
            <MdHelpCenter />
          </li>
          <li className="text-white text-sm font-light">Help Center</li>
        </ul>
        </div>
       
        <div>
          <p className="text-white text-sm font-light">&copy; 2025-2026 EStore.com</p>
        </div>

      </div>
    </div>
  );
};

export default Footer;
