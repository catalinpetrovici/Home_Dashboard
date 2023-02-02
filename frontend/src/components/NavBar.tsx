import { MdOutlineDashboard } from 'react-icons/md';
import { RiSettings4Line } from 'react-icons/ri';
import { TbReportAnalytics } from 'react-icons/tb';
import { AiOutlineUser, AiOutlineHeart, AiOutlineHome } from 'react-icons/ai';
import { FiFolder } from 'react-icons/fi';
import CustomLink from './CustomLink';

const NavBar = () => {
  const menus = [
    { name: 'home', link: '/', Icon: AiOutlineHome },
    { name: 'analytics', link: '/books', Icon: TbReportAnalytics },
    { name: 'dashboard', link: '/dashboard', Icon: MdOutlineDashboard },
    { name: 'File Manager', link: '/folder', Icon: FiFolder },
    { name: 'Saved', link: '/save', Icon: AiOutlineHeart },
    { name: 'user', link: '/user', Icon: AiOutlineUser },
    { name: 'Setting', link: '/settings', Icon: RiSettings4Line },
  ];

  console.log('DEV MODE:', import.meta.env.DEV);
  console.log('PROD MODE:', import.meta.env.PROD);

  return (
    <nav className='flex gap-6 border-r border-slate-700'>
      <div className='flex min-h-screen w-16 flex-col justify-between bg-[#11111F] text-gray-100 duration-500'>
        <div>
          <div className='flex justify-center py-3' id='logo'>
            {/* <img src={mainLogo} alt='Logo' /> */}
          </div>
          <ul className='flex flex-col items-center gap-8'>
            {menus?.map((menu) => {
              const { name, link, Icon } = menu;

              return (
                <CustomLink
                  to={link}
                  style='group flex text-sm font-medium p-2 hover:bg-gray-800 rounded-md'
                  isActiveStyle='bg-gray-800 rounded-md'
                  key={name}
                >
                  <Icon size={22} />
                </CustomLink>
              );
            })}
          </ul>
        </div>
        {import.meta.env.DEV && (
          <div className='py-3 text-center'>Dev Mode</div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
