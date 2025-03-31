import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import {BarLoader} from "react-spinners";

export default function Layout({ children }) {
    return (
      <div className="container mx-auto">
        <div>
            <Link href="/dashboard" className="text-sm cursor-pointer text-blue-600 hover:text-blue-700 flex items-center gap-2"><ArrowLeftIcon className="w-5 h-5" /> Back to Dashboard</Link>
        </div>
        <Suspense fallback={<BarLoader color="blue" width={"100%"} />}>
            {children}
        </Suspense>    
      </div>
    );
  }