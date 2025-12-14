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
      <div 
        className={`h-full bg-[#231f27] min-h-screen border-white/50 flex flex-col overflow-hidden gap-2 fixed left-0 top-0 transition-all duration-300 ease-in-out ${
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

      
    </>
  )
}

export default Nav