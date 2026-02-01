import { Home, Search, User, UserCircle, Menu } from 'lucide-react'
import Link from 'next/link'

const navItems = [
  {
    icon: Home,
    label: 'Home',
    link: '/dashboard',
  },
  {
    icon: Search,
    label: 'Search',
    link: '/search',
  },
  {
    icon: User,
    label: 'Following',
    link: '/following',
  },
  {
    icon: UserCircle,
    label: 'Albums',
    link: '/albums/all',
  },
]

const Nav = ({isExpanded, setIsExpanded}: {isExpanded: boolean, setIsExpanded: (isExpanded: boolean) => void}) => {


  return (
    <>
      {/* Desktop Sidebar */}
      <div 
        className={`hidden edi md:flex h-full bg-[#231f27] min-h-screen border-white/50 flex-col overflow-hidden gap-2 fixed left-0 top-0 transition-all duration-300 ease-in-out ${
          isExpanded ? 'w-[15%]' : 'w-20'
        }`}
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
      >
        <div className="p-7">
          <Menu className='w-6 h-6 text-white' />
        </div>
        {navItems.map((item, index) => (
          <Link href={item.link} key={item.label}>
          <div 
            className="flex text-xl text-white hover:bg-[#8967b2] w-full px-7 py-2 gap-5 cursor-pointer transition-colors duration-200"
          >
            <item.icon className="w-6 h-6 shrink-0" />
            <span 
              className={`whitespace-nowrap transition-all duration-300 ${
                isExpanded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
              }`}
            >
              {item.label}
            </span>
          </div>
          </Link>
        ))}
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-[#231f27] h-16 flex items-center justify-around z-50 border-t border-white/10">
        {navItems.map((item) => (
          <Link href={item.link} key={item.label} className="p-2 text-white flex flex-col items-center justify-center w-full h-full hover:bg-[#8967b2] transition-colors duration-200">
            <item.icon className="w-6 h-6" />
            <span className="text-xs mt-1">{item.label}</span>
          </Link>
        ))}
      </div>
    </>
  )
}

export default Nav