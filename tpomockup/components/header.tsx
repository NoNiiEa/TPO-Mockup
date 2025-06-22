import { User } from 'react-feather';

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
      {/* Top bar with user info */}
      <div className="flex justify-end items-center px-6 py-2 bg-blue-800">
        <div className="flex items-center space-x-4">
          <span className="text-sm">ประชาชน</span>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-orange-400 rounded-full flex items-center justify-center">
              <User size={16} />
            </div>
            <button className="text-sm hover:underline">
              ออกจากระบบ
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;