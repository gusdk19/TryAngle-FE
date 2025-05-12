// Footer.js

export default function Footer({ page }) {
  const navigate = useNavigate();

  const navigationItems = [
    {
      icon: page === 'home' ? <GoHomeFill className="icon" /> : <GoHome className="icon" />,
      label: '홈',
      route: '/',
    },
    {
      icon: page === 'ranking' ? <HiTrophy className="icon" /> : <HiOutlineTrophy className="icon" />,
      label: '랭킹',
      route: '/rank',
    },
    {
      icon: page === 'myChallenge'
        ? <PiTriangleDashedFill className="icon" />
        : <PiTriangleDashed className="icon" />,
      label: '마이챌린지',
      route: '/mychallenge',
    },
    {
      icon: page === 'myPage'
        ? <PiUserCircleDuotone className="icon" />
        : <PiUserCircleDashed className="icon" />,
      label: '마이페이지',
      route: '/mypage',
    },
  ];

  return (
    <footer className="w-full h-[70px] bg-white px-4 pt-2">
      <div className="flex justify-evenly items-start">
        {navigationItems.map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center cursor-pointer"
            onClick={() => navigate(item.route)}
          >
            {item.icon}
            <span className="text-[13px] font-bold text-black text-center">{item.label}</span>
          </div>
        ))}
      </div>
    </footer>
  );
}