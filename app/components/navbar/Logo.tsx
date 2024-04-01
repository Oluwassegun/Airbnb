'use client';

import Image from "next/image";
import { useRouter } from "next/navigation";

const Logo = () => {
  const router = useRouter();
 
  return ( 
    <Image
      onClick={() => router.push('/')}
      className="hidden md:block cursor-pointer rounded-full" 
      src="/images/T.png" 
      height="100" 
      width="200" 
      alt="Logo" 
    />
   );
}
 
export default Logo;