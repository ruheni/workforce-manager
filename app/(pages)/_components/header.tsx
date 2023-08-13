import Link from 'next/link'
import Image from 'next/image'

export default function Header() {

  return (
      <header className='text-left pb-2'>
        <Link href="/"  className= 'text-red-700'>
            <Image src='/veleron3.png' width={250} height={100} alt='logo'></Image>
        </Link>
       
      </header> 
  )
} 